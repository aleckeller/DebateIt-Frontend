import { FlatList, RefreshControl, View } from "react-native";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { getDebates } from "@/app/api/debates";
import FeedItem from "@/components/screens/Home/FeedItem";
import { FeedItemInterface } from "@/interfaces/debates";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function HomeScreen() {
  const { theme } = useTheme();
  const [debates, setDebates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getDebates()
      .then((debates) => {
        setDebates(debates);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  }, [isRefreshing]);

  const handleRefresh = () => {
    setIsRefreshing(true);
  };

  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={debates}
        keyExtractor={(item: FeedItemInterface) => item.id.toString()}
        renderItem={({ item }) => <FeedItem details={item} />}
        showsVerticalScrollIndicator={false}
        windowSize={5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}
