import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";

import styles from "./debatedetails.style";
import globalStyles from "../../styles/global.style";
import Response from "../Response/Response";

export default function DebateDetails({ data }) {
  const [responseText, setResponseText] = useState("");
  const [debateData, setDebateData] = useState([
    {
      title: data.title,
      category_names: data.category_names.join(", "),
      summary: data.summary,
      end_at: data.end_at,
      picture_url: data.picture_url,
      is_response: false,
    },
    ...data.responses.map((response) => ({
      is_response: true,
      id: response.id,
      body: response.body,
      created_by: response.created_by,
      agree: response.agree,
      disagree: response.disagree,
      userVoteChoice: null,
      agreeDisabled: false,
      disagreeDisabled: false,
    })),
  ]);

  const handleTextInputChange = (text) => {
    setResponseText(text);
  };

  const modifyVote = async (responseId, method, userVoteChoice) => {
    return await axios[method](
      `https://3rphehipf2.execute-api.us-east-1.amazonaws.com/Prod/response/${responseId}/${userVoteChoice}`
    )
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleUserVoteChoice = async (responseId, userVoteChoice) => {
    const updatedData = await Promise.all(
      debateData.map(async (item) => {
        if (item.is_response && item.id === responseId) {
          let count = 0;
          if (item.userVoteChoice === userVoteChoice) {
            // If the same option is selected again, unselect it
            item.userVoteChoice = null;
            item.agreeDisabled = false;
            item.disagreeDisabled = false;
            count = await modifyVote(responseId, "delete", userVoteChoice);
          } else {
            item.userVoteChoice = userVoteChoice;
            if (userVoteChoice === "agree") {
              item.disagreeDisabled = true;
            } else {
              item.agreeDisabled = true;
            }
            count = await modifyVote(responseId, "post", userVoteChoice);
          }
          item[userVoteChoice] = count;
        }
        return item;
      })
    );
    setDebateData(updatedData);
  };

  async function handleResponseSubmit() {
    await axios
      .post(
        `https://3rphehipf2.execute-api.us-east-1.amazonaws.com/Prod/response`,
        {
          body: responseText,
          debate_id: data.id,
          created_by_id: 1,
        }
      )
      .then((response) => {
        // Add new response so it immediately appears
        const tmp = debateData;
        tmp.push({
          ...response.data,
          is_response: true,
          userVoteChoice: null,
        });
        setDebateData(tmp);
        setResponseText("");
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
        data={debateData}
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
                    <TouchableOpacity
                      onPress={() => toggleUserVoteChoice(item.id, "agree")}
                      disabled={item.agreeDisabled}
                      style={{ flexDirection: "row" }}
                    >
                      <AntDesign
                        name={
                          item.userVoteChoice === "agree" ? "like1" : "like2"
                        }
                        size={20}
                        color={item.agreeDisabled === true ? "gray" : "white"}
                        style={{ marginRight: 8 }}
                      />
                      <Text
                        style={{
                          ...styles.responseVotes,
                          color: item.agreeDisabled === true ? "gray" : "white",
                        }}
                      >
                        {item.agree}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => toggleUserVoteChoice(item.id, "disagree")}
                      disabled={item.disagreeDisabled}
                      style={{ flexDirection: "row" }}
                    >
                      <AntDesign
                        name={
                          item.userVoteChoice === "disagree"
                            ? "dislike1"
                            : "dislike2"
                        }
                        size={20}
                        color={
                          item.disagreeDisabled === true ? "gray" : "white"
                        }
                        style={{ marginRight: 8, marginLeft: 16 }}
                      />
                      <Text
                        style={{
                          ...styles.responseVotes,
                          color:
                            item.disagreeDisabled === true ? "gray" : "white",
                        }}
                      >
                        {item.disagree}
                      </Text>
                    </TouchableOpacity>
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
