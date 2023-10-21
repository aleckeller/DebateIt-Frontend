import { makeStyles, useTheme } from "@rneui/themed";
import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function LoadingIndicator() {
  const styles = useStyles();
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.black}
      ></ActivityIndicator>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: theme.colors.background,
  },
}));
