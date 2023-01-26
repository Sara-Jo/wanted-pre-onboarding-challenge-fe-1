import { useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { login, signUp } from "../api/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const checkEmail = () => {
    const [username, provider] = email.split("@");
    if (
      email.includes("@") &&
      username.length &&
      provider.length &&
      provider.includes(".") &&
      provider.split(".")[0].length > 0 &&
      provider.split(".")[1].length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (checkEmail()) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleOnblur = () => {
    if (checkEmail()) return setEmailErrorMessage("");
    else return setEmailErrorMessage("Invalid e-mail address.");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters.");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    const res = await login(email, password);
    localStorage.setItem("user_token", res.token);
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    const res = signUp(email, password);
    console.log(res);
  };

  return (
    <Container>
      <LoginContainer>
        <InputContainer>
          <InputWrapper>
            <InputLabel>EMAIL</InputLabel>
            <Input
              value={email}
              onChange={handleEmailChange}
              onBlur={handleOnblur}
            />
            <i>
              <FaCheckCircle color={isEmailValid ? "#7286D3" : "#D4D4D4"} />
            </i>
            <span>{emailErrorMessage}</span>
          </InputWrapper>
          <InputWrapper>
            <InputLabel>PASSWORD</InputLabel>
            <Input
              type={isPasswordHidden ? "password" : "text"}
              value={password}
              onChange={handlePasswordChange}
            />
            <i onClick={() => setIsPasswordHidden(!isPasswordHidden)}>
              {isPasswordHidden ? (
                <ImEyeBlocked size="16" color="#5B5B5B" />
              ) : (
                <ImEye size="16" color="#7286D3" />
              )}
            </i>
            <span>{passwordErrorMessage}</span>
          </InputWrapper>
        </InputContainer>
        <ButtonContainer>
          <LoginButton
            type="submit"
            disabled={!isEmailValid || password.length < 8}
            onClick={isLoginForm ? handleLoginSubmit : handleCreateSubmit}
          >
            {isLoginForm ? "LOGIN" : "SIGN UP"}
          </LoginButton>
          <div>
            <span id="msg">
              {isLoginForm ? "Need ad Account?" : "Already registered?"}
            </span>
            <span id="link" onClick={() => setIsLoginForm(!isLoginForm)}>
              {isLoginForm ? "Sign up" : "Login"}
            </span>
          </div>
        </ButtonContainer>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  border: 1px solid black;
  padding: 3rem;
`;

const InputContainer = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  svg {
    position: relative;
    left: 13.7rem;
    top: -1.6rem;
  }
  span {
    color: red;
    font-size: 0.8rem;
    position: relative;
    top: -0.9rem;
    left: 0.2rem;
  }
`;

const InputLabel = styled.div`
  width: 6rem;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  color: #919191;
`;

const Input = styled.input`
  width: 15rem;
  height: 2rem;
  border-radius: 0.3rem;
  border: 1px solid black;
  padding-left: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  span#msg {
    margin-top: 0.3rem;
    display: inline-block;
  }
  span#link {
    margin-top: 0.3rem;
    margin-left: 0.4rem;
    color: #7286d3;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  border: 1px solid black;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #7286d3;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }
`;
