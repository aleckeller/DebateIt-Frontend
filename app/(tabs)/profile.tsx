import { StyleSheet, Text, View } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button } from "@rneui/themed";

export default function ProfileScreen() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <View style={styles.container}>
      <Text>{`Welcome, ${user.username}!`}</Text>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
