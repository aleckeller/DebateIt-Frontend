import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const theme = createTheme({
    mode: "dark",
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor:
                theme.mode == "light"
                  ? theme.lightColors?.background
                  : theme.darkColors?.background,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => router.push(`/create-debate`)}>
                <Ionicons
                  name={
                    theme.mode == "light" ? "add-circle" : "add-circle-outline"
                  }
                  size={30}
                  color={
                    theme.mode == "light"
                      ? theme.lightColors?.black
                      : theme.darkColors?.black
                  }
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="feed-item-details/[id]"
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor:
                theme.mode == "light"
                  ? theme.lightColors?.background
                  : theme.darkColors?.background,
            },
          }}
        />
        <Stack.Screen
          name="create-debate"
          options={{
            headerTitle: "Create a Debate",
            headerStyle: {
              backgroundColor:
                theme.mode == "light"
                  ? theme.lightColors?.background
                  : theme.darkColors?.background,
            },
            headerTitleStyle: {
              color:
                theme.mode == "light"
                  ? theme.lightColors?.black
                  : theme.darkColors?.black,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
