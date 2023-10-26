import { useTheme, Input, Button } from "@rneui/themed";
import { View, Text, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";

import { createDebate, getCategories } from "@/app/api/debates";
import { CreateDebateInterface } from "@/interfaces/debates";
import { useEffect, useState } from "react";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import { router } from "expo-router";

export default function CreateDebateModal() {
  const { theme } = useTheme();
  const minimumDate = new Date();
  minimumDate.setDate(new Date().getDate() + 1);
  const maximumDate = new Date();
  maximumDate.setDate(new Date().getDate() + 7);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      summary: "",
      endAt: minimumDate,
      selectedCategories: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (debate: CreateDebateInterface) => {
    await createDebate(
      debate.title,
      debate.summary,
      debate.endAt,
      debate.selectedCategories
    );
    reset();
    router.push("/(tabs)");
  };

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }
  const maxCategoriesSelected = 3;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
      }}
    >
      <ScrollView style={{ flex: 2, marginBottom: 20 }} scrollEnabled={false}>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              inputContainerStyle={{
                padding: 8,
                borderColor: errors.title ? "red" : theme.colors.grey3,
                borderBottomWidth: 1,
              }}
              placeholder="Title"
              placeholderTextColor={errors.title ? "red" : theme.colors.grey3}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              multiline={true}
              inputContainerStyle={{
                borderWidth: 1,
                padding: 8,
                borderColor: errors.summary ? "red" : theme.colors.grey3,
                borderRadius: 5,
              }}
              inputStyle={{
                height: 150,
              }}
              placeholder="Summary"
              placeholderTextColor={errors.summary ? "red" : theme.colors.grey3}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="summary"
        />
        <Text
          style={{ color: theme.colors.black, padding: 8, marginBottom: 10 }}
        >
          Debate End Date & Time:
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                themeVariant={theme.mode}
                value={value}
                mode="datetime"
                display="default"
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                onChange={(event, selectedDate) => {
                  if (event.type === "set" && selectedDate) {
                    onChange(selectedDate);
                  }
                }}
              />
            )}
            name="endAt"
          />
        </View>
      </ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              items={categories}
              uniqueKey="id"
              onSelectedItemsChange={(selectedCategories) => {
                if (selectedCategories.length <= maxCategoriesSelected) {
                  onChange(selectedCategories);
                }
              }}
              selectedItems={value}
              selectText="Select Categories (Max 3)"
              searchInputPlaceholderText="Select Categories"
              styleInputGroup={{
                backgroundColor: theme.colors.grey5,
                borderWidth: errors.selectedCategories ? 2 : 0,
                borderBottomWidth: 0,
                borderColor: "red",
              }}
              fixedHeight={true}
              searchIcon={false}
              displayKey="name"
              hideSubmitButton={true}
              fontSize={16}
              hideDropdown={true}
              textInputProps={{ editable: false }}
              styleTextDropdown={{
                marginLeft: 5,
                color: theme.colors.black,
              }}
              styleTextDropdownSelected={{
                marginLeft: 5,
                color: theme.colors.black,
              }}
              styleDropdownMenuSubsection={{
                height: 50,
                backgroundColor: theme.colors.grey5,
                borderBottomWidth: errors.selectedCategories ? 2 : 0,
                borderWidth: errors.selectedCategories ? 2 : 0,
                borderColor: "red",
              }}
              styleListContainer={{
                backgroundColor: theme.colors.grey5,
                borderWidth: errors.selectedCategories ? 2 : 0,
                borderColor: "red",
              }}
              itemTextColor={theme.colors.black}
            />
          )}
          name="selectedCategories"
        />
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
          <Button
            buttonStyle={{
              backgroundColor: theme.colors.grey5,
              borderRadius: 10,
            }}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
}
