import axios from "axios";

export const login = async (email: string, password: string) => {
  const { data } = await axios.post("http://localhost:8080/users/login", {
    email: email,
    password: password,
  });
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data } = await axios.post("http://localhost:8080/users/create", {
    email: email,
    password: password,
  });
  return data;
};
