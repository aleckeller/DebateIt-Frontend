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
  const minHeight = 35; // Minimum height
  const maxHeight = 100; // Maximum height
  const initialHeight = 35;
  const initialContainerHeight = 50;
  const [height, setHeight] = useState(initialHeight);
  const [containerHeight, setContainerHeight] = useState(
    initialContainerHeight
  );
  const [showPostButton, setShowPostButton] = useState(false);

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
      <View style={{ ...styles.container, height: containerHeight }}>
        <TextInput
          style={{
            ...styles.input,
            height: height,
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
          }}
          onContentSizeChange={(event) => {
            const newHeight = event.nativeEvent.contentSize.height;
            // Ensure the height change is within the specified range
            setHeight(Math.min(Math.max(newHeight, minHeight), maxHeight));
            setContainerHeight(newHeight + 30);
          }}
        />
        {showPostButton && (
          <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
            <Text>Post</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Response;
