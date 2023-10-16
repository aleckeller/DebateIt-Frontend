import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Dark background color
  },
  debateItem: {
    flexDirection: "column",
    borderColor: "#808080", // Darker border color
    padding: 10,
    borderBottomWidth: 0.4,
    position: "relative",
    backgroundColor: "#000000", // Dark item background color
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
    color: "#FFF",
  },
  debateCategory: {
    color: "#FFF",
    marginBottom: 4,
    fontStyle: "italic",
  },
  debateSummary: {
    color: "#FFF",
    // marginBottom: 25,
  },
  endAt: {
    color: "#BBB",
  },
  replies: {
    color: "#BBB",
    marginBottom: 3,
    marginRight: 16,
  },
  leader: {
    color: "#BBB",
    marginBottom: 3,
  },
  createdBy: {
    color: "#BBB",
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
});

export default styles;
