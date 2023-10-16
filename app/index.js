import { SafeAreaView, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { DebateFeed } from "../components";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          // headerLeft: () => <Text style={{ color: "#FFF" }}>Menu</Text>,
          // headerRight: () => <Text style={{ color: "#FFF" }}>Profile</Text>,
          headerTitle: "",
          headerStyle: { backgroundColor: "#000000" },
        }}
      />
      <DebateFeed></DebateFeed>
    </SafeAreaView>
  );
}
