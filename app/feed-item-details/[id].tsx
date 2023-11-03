import { View, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "@rneui/themed";

import Details from "@/components/screens/DebateDetail/Details";
import Response from "@/components/screens/DebateDetail/Response";
import AddResponse from "@/components/common/AddResponse";
import { createResponse, getDebate } from "@/app/api/debates";
import {
  DetailsStateInterface,
  RawDataStateInterface,
  ResponseInterface,
  ResponseStateInterface,
} from "@/interfaces/debates";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function FeedItemDetailsScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [rawData, setRawData] = useState<RawDataStateInterface | null>(null);
  const [responses, setResponses] = useState<ResponseStateInterface[]>([]);
  const [details, setDetails] = useState<DetailsStateInterface | null>(null);
  const [flatListData, setFlatListData] = useState<
    (DetailsStateInterface | ResponseStateInterface | null)[]
  >([]);

  useEffect(() => {
    getDebate(+id)
      .then((rawData) => {
        setRawData(rawData);
        const detailsData = {
          id: rawData.id,
          title: rawData.title,
          category_names: rawData.category_names.join(", "),
          summary: rawData.summary,
          end_at: rawData.end_at,
          picture_url: rawData.picture_url,
          created_by: rawData.created_by,
          leader: rawData.leader,
          response_count: rawData.response_count,
          is_response: false,
        };
        const responseData = rawData.responses.map(
          (response: ResponseInterface) => ({
            is_response: true,
            id: response.id,
            body: response.body,
            created_by: response.created_by,
            agree: response.agree,
            disagree: response.disagree,
            agree_enabled: response.agree_enabled,
            disagree_enabled: response.disagree_enabled,
          })
        );
        const flatListDataArray = [detailsData, ...responseData];
        setDetails(detailsData);
        setResponses(responseData);
        setFlatListData(flatListDataArray);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, responses]);

  const handleTextInputChange = (text: string) => {
    setResponseText(text);
  };

  const handleResponseSubmit = async () => {
    await createResponse(responseText, +id);
    setResponseText("");
  };

  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={
          flatListData as (DetailsStateInterface | ResponseStateInterface)[]
        }
        keyExtractor={(item) =>
          // Add is_response since a DetailsStateInterface or ResponseStateInterface can
          // have same id
          item ? `${item.id.toString()}-${item.is_response.toString()}` : "null"
        }
        showsVerticalScrollIndicator={false}
        windowSize={5}
        renderItem={({
          item,
        }: {
          item: DetailsStateInterface | ResponseStateInterface;
        }) => {
          if (item != null) {
            if (!item.is_response) {
              return <Details data={item as DetailsStateInterface} />;
            }
            return <Response data={item as ResponseStateInterface} />;
          }
          return <LoadingIndicator></LoadingIndicator>;
        }}
      />
      <AddResponse
        onPress={handleTextInputChange}
        onSubmit={handleResponseSubmit}
        value={responseText}
      ></AddResponse>
    </View>
  );
}
