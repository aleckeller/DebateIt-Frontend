import React, { useState } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import styles from "./response.style";

const Response = ({ onPress, onSubmit, value }) => {
  const initialHeight = 35;
  const initialContainerHeight = 67;
  const [height, setHeight] = useState(initialHeight);
  const [containerHeight, setContainerHeight] = useState(
    initialContainerHeight
  );
  const [showPostButton, setShowPostButton] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
      <View
        style={{
          ...styles.container,
          height: Math.max(initialContainerHeight, containerHeight),
        }}
      >
        <TextInput
          style={{
            ...styles.input,
            height: Math.max(initialHeight, height),
          }}
          multiline={true}
          onChangeText={(text) => onPress(text)}
          value={value}
          placeholder="Add a response"
          placeholderTextColor="#888888"
          autoFocus={false}
          onFocus={() => {
            setShowPostButton(true);
            setContainerHeight(containerHeight + 50);
          }}
          onBlur={() => {
            setShowPostButton(false);
            setContainerHeight(containerHeight - 50);
          }}
          onContentSizeChange={(event) => {
            if (event.nativeEvent.contentSize.height < 68) {
              setHeight(event.nativeEvent.contentSize.height);
              setContainerHeight(
                Math.max(
                  event.nativeEvent.contentSize.height + 45,
                  containerHeight
                )
              );
            }
          }}
        />
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}></View>
          {showPostButton && (
            <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
              <Text style={{ textAlign: "center" }}>Post</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Response;
