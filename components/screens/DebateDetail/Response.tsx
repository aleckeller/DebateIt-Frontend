import { ResponseStateInterface } from "@/interfaces/debates";
import { AntDesign } from "@expo/vector-icons";
import { makeStyles, useTheme } from "@rneui/themed";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { modifyVote } from "@/app/api/debates";

export default function Response({ data }: { data: ResponseStateInterface }) {
  const styles = useStyles();
  const { theme } = useTheme();
  const [agree, setAgree] = useState(data.agree);
  const [agreeEnabled, setAgreeEnabled] = useState(data.agree_enabled);
  const [disagree, setDisagree] = useState(data.disagree);
  const [disagreeEnabled, setDisagreeEnabled] = useState(data.disagree_enabled);

  const vote = async (voteType: string) => {
    const response = await modifyVote(data.id, voteType);
    setAgree(response.agree.count);
    setAgreeEnabled(response.agree.enabled);
    setDisagree(response.disagree.count);
    setDisagreeEnabled(response.disagree.enabled);
  };

  return (
    <View style={styles.responseContainer}>
      <View style={styles.responseHeader}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.profilePicture}
        />
        <Text style={styles.responseCreatedBy}>{data.created_by}</Text>
      </View>
      <Text style={styles.responseBody}>{data.body}</Text>
      <View style={styles.bottomRight}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => vote("agree")}
            style={{ flexDirection: "row" }}
          >
            <AntDesign
              name={agreeEnabled ? "like2" : "like1"}
              size={20}
              color={theme.colors.black}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                ...styles.responseVotes,
                color: theme.colors.black,
              }}
            >
              {agree}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => vote("disagree")}
            style={{ flexDirection: "row" }}
          >
            <AntDesign
              name={disagreeEnabled ? "dislike2" : "dislike1"}
              size={20}
              color={theme.colors.black}
              style={{ marginRight: 8, marginLeft: 16 }}
            />
            <Text
              style={{
                ...styles.responseVotes,
                color: theme.colors.black,
              }}
            >
              {disagree}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  responseContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#ccc",
    padding: 16,
  },
  responseCreatedBy: {
    color: theme.colors.black,
    fontWeight: "bold",
  },
  responseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  profilePicture: {
    width: 40, // Adjust the size as needed
    height: 40,
    borderRadius: 20, // To make it circular, half the width/height
    marginRight: 10,
  },
  responseBody: {
    color: theme.colors.black,
    fontSize: 17,
    marginBottom: 16,
  },
  responseVotes: {
    color: theme.colors.black,
    fontSize: 16,
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginTop: 16,
    marginBottom: 8,
    marginRight: 8,
  },
}));
