import { DetailsStateInterface } from "@/interfaces/debates";
import { makeStyles, useTheme } from "@rneui/themed";
import { View, Image, Text } from "react-native";

export default function Details({ data }: { data: DetailsStateInterface }) {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View>
      <View style={styles.topRight}>
        <Text style={styles.endAt}>{data.end_at} left</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.categories}>{data.category_names}</Text>
        <Text style={styles.summary}>{data.summary}</Text>
        <Text style={{ color: theme.colors.black }}>
          Created By: {data.created_by}
        </Text>
      </View>
      {data.picture_url && (
        <Image
          source={{
            uri: data.picture_url,
          }}
          style={styles.debatePicture}
        />
      )}
      {!data.picture_url && (
        <View
          style={{
            borderBottomWidth: 0.2,
            borderBottomColor: "#ccc",
          }}
        ></View>
      )}
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    marginBottom: 10,
    padding: 16,
    marginTop: 16,
  },
  title: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categories: {
    color: theme.colors.black,
    marginBottom: 4,
    fontStyle: "italic",
  },
  summary: {
    color: theme.colors.black,
    fontSize: 17,
    marginBottom: 4,
  },
  endAt: {
    color: theme.colors.grey2,
  },
  debatePictureContainer: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  debatePicture: {
    width: "100%",
    height: 200,
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    marginBottom: 16,
    marginRight: 8,
    marginTop: 8,
  },
}));
