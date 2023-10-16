import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  text: {
    color: "#FFFFFF",
  },
  header: {
    backgroundColor: "#000000",
  },
  picture: {
    width: "100%",
    height: "100%",
  },
  topRight: {
    position: "absolute",
    top: 0,
    right: 0,
    marginBottom: 16,
    marginRight: 8,
  },
  bottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginTop: 16,
    marginBottom: 8,
    marginRight: 8,
  },
});

export default globalStyles;
