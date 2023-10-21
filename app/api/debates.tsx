import axios from "axios";

const BASE_URL = "https://3rphehipf2.execute-api.us-east-1.amazonaws.com/Prod";

export const getDebates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/debate/list`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch debates:", error);
  }
};

export const getDebate = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/debate/${id}/single`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch debate:", error);
  }
};

export const modifyVote = async (id: number, vote: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/response/${id}/vote/?vote_type=${vote}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to modify vote:", error);
  }
};

export const createResponse = async (body: string, debateId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/response`, {
      body: body,
      debate_id: debateId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create response:", error);
  }
};
