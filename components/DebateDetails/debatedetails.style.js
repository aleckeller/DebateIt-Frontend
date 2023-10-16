import { StyleSheet } from "react-native";
import globalStyles from "../../styles/global.style";

const styles = StyleSheet.create({
  detailsContainer: {
    marginBottom: 10,
    padding: 16,
    marginTop: 16,
  },
  title: {
    ...globalStyles.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categories: {
    color: "#fff",
    marginBottom: 4,
    fontStyle: "italic",
  },
  summary: {
    ...globalStyles.text,
    fontSize: 17,
  },
  endAt: {
    ...globalStyles.text,
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
  responseContainer: {
    borderBottomWidth: 0.4,
    borderBottomColor: "#ccc",
    padding: 16,
  },
  responseCreatedBy: {
    ...globalStyles.text,
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
    ...globalStyles.text,
    fontSize: 17,
    marginBottom: 16,
  },
  responseVotes: {
    ...globalStyles.text,
    fontSize: 16,
  },
});

export default styles;
