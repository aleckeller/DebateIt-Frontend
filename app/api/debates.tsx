import axios from "axios";

import { Category } from "@/interfaces/debates";
import { Auth } from "aws-amplify";

const axiosInstance = axios.create({
  baseURL: "https://oxipj96q6k.execute-api.us-east-1.amazonaws.com/Prod",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const jwtToken = `Bearer ${(await Auth.currentSession())
      .getIdToken()
      .getJwtToken()}`;
    console.log(jwtToken);
    config.headers = {
      Authorization: jwtToken,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const getDebates = async () => {
  try {
    const response = await axiosInstance.get(`/debate/list`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch debates:", error);
  }
};

export const getDebate = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/debate/${id}/single`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch debate:", error);
  }
};

export const modifyVote = async (id: number, vote: string) => {
  try {
    const response = await axiosInstance.post(
      `/response/${id}/vote/?vote_type=${vote}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to modify vote:", error);
  }
};

export const createResponse = async (body: string, debateId: number) => {
  try {
    const response = await axiosInstance.post(`/response`, {
      body: body,
      debate_id: debateId,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create response:", error);
  }
};

export const createDebate = async (
  title: string,
  summary: string,
  end_at: Date,
  categories: Category[]
) => {
  try {
    const response = await axiosInstance.post(`/debate`, {
      title: title,
      summary: summary,
      category_ids: categories,
      end_at: end_at,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create debate:", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get(`/debate/category/list`);
    return response.data;
  } catch (error) {
    console.error("Failed to create response:", error);
  }
};
