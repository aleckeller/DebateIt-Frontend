import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./loadingindicator.style";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF"></ActivityIndicator>
    </View>
  );
};

export default LoadingIndicator;
