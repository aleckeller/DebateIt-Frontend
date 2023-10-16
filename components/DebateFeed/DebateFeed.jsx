import React, { PureComponent } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from "./debatefeed.style";

class DebateItem extends PureComponent {
  render() {
    const { item, router } = this.props;

    const truncateSummary = (summary) => {
      const maxCount = 100;
      if (summary.length <= maxCount) {
        return summary;
      }
      return summary.substring(0, maxCount) + "...";
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (item) {
            router.push(`/debateitem-details/${item.id}`);
          }
        }}
      >
        <View style={styles.debateItem}>
          <View style={{ marginBottom: 32, marginTop: 8 }}>
            <Text style={styles.debateTitle}>{item.title}</Text>
            <Text style={styles.debateCategory}>
              {item.category_names?.join(", ")}
            </Text>
            <Text style={styles.debateSummary}>
              {truncateSummary(item.summary)}
            </Text>
          </View>
          {item.picture_url && (
            <View style={{ marginBottom: 32 }}>
              <Image
                source={{ uri: item.picture_url }}
                style={styles.debateImage}
              />
            </View>
          )}
          <View style={styles.topRight}>
            <Text style={styles.endAt}>{item.end_at} left</Text>
          </View>
          <View style={styles.bottomRight}>
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="comment-o"
                style={{
                  color: "white",
                  marginRight: 8,
                  marginTop: 2,
                }}
              ></FontAwesome>
              <Text style={styles.replies}>{item.responses}</Text>
              <FontAwesome5
                name="crown"
                style={{
                  color: "white",
                  marginRight: 8,
                  marginTop: 2,
                }}
              ></FontAwesome5>
              <Text style={styles.leader}>
                {item.winner ? item.winner : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.bottomLeft}>
            <Text style={styles.createdBy}>Author: {item.created_by}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const DebateFeed = () => {
  const router = useRouter();
  const [debates, setDebates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://3rphehipf2.execute-api.us-east-1.amazonaws.com/Prod/debate/list"
        );
        if (response.status === 200) {
          setDebates(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch debates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={debates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DebateItem item={item} router={router} />}
        showsVerticalScrollIndicator={false}
        windowSize={5}
      />
    </View>
  );
};

export default DebateFeed;
