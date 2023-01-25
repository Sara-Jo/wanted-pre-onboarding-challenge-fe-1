import { useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { ImEye, ImEyeBlocked } from "react-icons/im";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
              <FaCheckCircle color={isEmailValid ? "#22AEAE" : "#D4D4D4"} />
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
                <ImEye size="16" color="#22AEAE" />
              )}
            </i>
            <span>{passwordErrorMessage}</span>
          </InputWrapper>
        </InputContainer>
        <LoginButtonContainer>
          <LoginButton>LOGIN</LoginButton>
        </LoginButtonContainer>
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

const LoginButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginButton = styled.div`
  border: 1px solid black;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
`;
