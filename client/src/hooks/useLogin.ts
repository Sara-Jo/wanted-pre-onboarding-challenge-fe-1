import { login } from "@/api/auth";
import { useQuery } from "react-query";

const useLogin = (email: string, password: string) => {
  return useQuery("login", () => login(email, password));
};

export default useLogin;
