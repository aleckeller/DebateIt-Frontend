import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { makeStyles } from "@rneui/themed";
import { FeedItemInterface } from "@/interfaces/debates";

export default function FeedItem({ details }: { details: FeedItemInterface }) {
  const styles = useStyles();
  const truncateSummary = (summary: string) => {
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
        if (details) {
          router.push(`/feed-item-details/${details.id}`);
        }
      }}
    >
      <View style={styles.debateItem}>
        <View style={{ marginBottom: 32, marginTop: 8 }}>
          <Text style={styles.debateTitle}>{details.title}</Text>
          <Text style={styles.debateCategory}>
            {details.category_names?.join(", ")}
          </Text>
          <Text style={styles.debateSummary}>
            {truncateSummary(details.summary)}
          </Text>
        </View>
        {details.picture_url && (
          <View style={{ marginBottom: 32 }}>
            <Image
              source={{ uri: details.picture_url }}
              style={styles.debateImage}
            />
          </View>
        )}
        <View style={styles.topRight}>
          <Text style={styles.endAt}>
            {details.end_at != "Finished"
              ? `${details.end_at} left`
              : details.end_at}{" "}
          </Text>
        </View>
        <View style={styles.bottomRight}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="comment-o" style={styles.icons}></FontAwesome>
            <Text style={styles.replies}>{details.response_count}</Text>
            <FontAwesome5 name="crown" style={styles.icons}></FontAwesome5>
            <Text style={styles.leader}>
              {details.leader ? details.leader : "N/A"}
            </Text>
          </View>
        </View>
        <View style={styles.bottomLeft}>
          <Text style={styles.createdBy}>Created By: {details.created_by}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme) => ({
  debateItem: {
    flexDirection: "column",
    borderColor: "#808080",
    padding: 10,
    borderBottomWidth: 0.4,
    position: "relative",
    backgroundColor: theme.colors.background,
  },
  debateImage: {
    width: "100%",
    height: 200,
  },
  debateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 16,
    color: theme.colors.black,
  },
  debateCategory: {
    color: theme.colors.black,
    marginBottom: 4,
    fontStyle: "italic",
  },
  debateSummary: {
    color: theme.colors.black,
  },
  endAt: {
    color: theme.colors.grey2,
  },
  replies: {
    color: theme.colors.grey1,
    marginBottom: 3,
    marginRight: 16,
  },
  leader: {
    color: theme.colors.grey1,
    marginBottom: 3,
    marginRight: 6,
  },
  createdBy: {
    color: theme.colors.grey1,
    marginBottom: 3,
    marginLeft: 6,
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 5,
    marginTop: 8,
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 5,
    marginBottom: 3,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginLeft: 5,
    marginBottom: 3,
  },
  icons: {
    color: theme.colors.black,
    marginRight: 8,
    marginTop: 2,
  },
}));
