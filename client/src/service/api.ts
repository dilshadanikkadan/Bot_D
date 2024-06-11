import { postRequest } from "./axios";

export const commandServe = async (payload: any) => {
  try {
    const res = await postRequest("/ask", payload);

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
