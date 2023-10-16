import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // flexDirection: "column",
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#303030",
    width: "100%",
    borderRadius: 15,
    marginTop: 15,
    color: "white",
    alignContent: "center",
    paddingLeft: 10,
    paddingTop: 10,
  },
  submitButton: {
    backgroundColor: "blue", // Change the background color as needed
    borderRadius: 20, // Make it circular
    padding: 10,
    marginTop: 10,
    width: "15%",
  },
});
export default styles;
