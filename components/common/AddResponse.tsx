import { makeStyles, Button, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { View, KeyboardAvoidingView, TextInput } from "react-native";

export default function AddResponse({
  onPress,
  onSubmit,
  value,
}: {
  onPress: (text: string) => void;
  onSubmit: () => void;
  value: string;
}) {
  const styles = useStyles();
  const initialHeight = 35;
  const initialContainerHeight = 50;
  const [height, setHeight] = useState(initialHeight);
  const [containerHeight, setContainerHeight] = useState(
    initialContainerHeight
  );
  const [showPostButton, setShowPostButton] = useState(false);
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
      <View
        style={{
          marginBottom: 20,
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
          placeholderTextColor={theme.colors.grey2}
          autoFocus={false}
          onFocus={() => {
            setShowPostButton(true);
            setContainerHeight(containerHeight + 20);
          }}
          onBlur={() => {
            setShowPostButton(false);
            setContainerHeight(containerHeight - 20);
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
            <Button
              title={"Post"}
              titleStyle={{ color: "#ffffff" }}
              containerStyle={{
                marginTop: 10,
                marginRight: 15,
                borderRadius: 15,
              }}
              buttonStyle={{ backgroundColor: theme.colors.primary }}
              onPress={onSubmit}
            ></Button>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: theme.colors.grey5,
    width: "95%",
    borderRadius: 15,
    marginTop: 15,
    color: theme.colors.black,
    alignSelf: "center",
    paddingLeft: 10,
    paddingTop: 10,
    padding: 10,
  },
}));
