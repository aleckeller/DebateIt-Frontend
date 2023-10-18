import { useLocalSearchParams } from "expo-router";
import { DebateDetails } from "../../components";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import globalStyles from "../../styles/global.style";

async function getDebateDetails(id) {
  try {
    const response = await axios.get(
      `https://3rphehipf2.execute-api.us-east-1.amazonaws.com/Prod/debate/${id}/single`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch debate details");
    }
  } catch (error) {
    throw error;
  }
}

export default function DebateItemDetails() {
  const { id } = useLocalSearchParams();

  const [debateData, setDebateData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDebateDetails(id)
      .then((data) => {
        setDebateData(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            headerTitle: "",
            headerStyle: globalStyles.header,
            headerBackTitleVisible: true,
          }}
        />
        <LoadingIndicator></LoadingIndicator>
      </SafeAreaView>
    );
  }

  if (debateData) {
    return <DebateDetails data={debateData}></DebateDetails>;
  }

  //TODO: Implement error screen
}
