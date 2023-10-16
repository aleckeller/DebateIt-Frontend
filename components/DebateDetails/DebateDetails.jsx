import { View, Text, Image, FlatList, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import styles from "./debatedetails.style";
import globalStyles from "../../styles/global.style";
import Response from "../Response/Response";

export default function DebateDetails({ debateData }) {
  const [responseText, setResponseText] = useState("");
  const data = [
    {
      title: debateData.title,
      category_names: debateData.category_names.join(", "),
      summary: debateData.summary,
      end_at: debateData.end_at,
      picture_url: debateData.picture_url,
      is_response: false,
    },
    ...debateData.responses.map((response) => ({
      is_response: true,
      id: response.id,
      body: response.body,
      created_by: response.created_by,
      agree: response.agree,
      disagree: response.disagree,
    })),
  ];

  const handleTextInputChange = (text) => {
    setResponseText(text);
  };

  const handleResponseSubmit = () => {
    console.log(responseText);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: globalStyles.header,
          headerBackTitleVisible: true,
        }}
      />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            {!item.is_response && (
              <View>
                <View style={globalStyles.topRight}>
                  <Text style={styles.endAt}>{item.end_at} left</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.categories}>{item.category_names}</Text>
                  <Text style={styles.summary}>{item.summary}</Text>
                </View>
                {item.picture_url && (
                  <Image
                    source={{
                      uri: item.picture_url,
                    }}
                    style={styles.debatePicture}
                  />
                )}
                {!item.picture_url && (
                  <View
                    style={{
                      borderBottomWidth: 0.2,
                      borderBottomColor: "#ccc",
                    }}
                  ></View>
                )}
              </View>
            )}
            {item.is_response && (
              <View style={styles.responseContainer}>
                <View style={styles.responseHeader}>
                  <Image
                    source={{ uri: "https://picsum.photos/200" }} // Assuming profile_picture is the URL to the profile picture
                    style={styles.profilePicture}
                  />
                  <Text style={styles.responseCreatedBy}>
                    {item.created_by}
                  </Text>
                </View>
                <Text style={styles.responseBody}>{item.body}</Text>
                <View style={globalStyles.bottomRight}>
                  <View style={{ flexDirection: "row" }}>
                    <AntDesign
                      name="like2"
                      size={20}
                      color="white"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={styles.responseVotes}>{item.agree}</Text>
                    <AntDesign
                      name="dislike2"
                      size={20}
                      color="white"
                      style={{ marginRight: 8, marginLeft: 16 }}
                    />
                    <Text style={styles.responseVotes}>{item.disagree}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
      />
      <Response
        onPress={handleTextInputChange}
        onSubmit={handleResponseSubmit}
        value={responseText}
      />
    </SafeAreaView>
  );
}
