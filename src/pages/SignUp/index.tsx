import React, { useCallback } from "react";
import { FiLock, FiLogIn, FiMail, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";

import { Container, Content } from "./styles";
import { useAuth } from "../../hooks/Auth";
import { useHistory } from "react-router-dom";

interface Inputs {
  username: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signUp } = useAuth();

  const navigate = useHistory();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ username, email, password }) => {
      const signUpSuccessful = await signUp({ username, email, password });

      if(signUpSuccessful) {
        return navigate.push('/chat');
      }
    },
    [signUp, navigate]
  );

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Crie sua conta</h1>

          <Input
            rightIcon={FiMail}
            colorIcon={"#FFFFFF"}
            placeholder="Email"
            {...register("email")}
          />
          <Input
            rightIcon={FiUser}
            colorIcon={"#FFFFFF"}
            placeholder="Username"
            {...register("username")}
          />
          <Input
            rightIcon={FiLock}
            colorIcon={"#FFFFFF"}
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.username && <span>This field is required</span>}

          <Button type="submit">Criar</Button>
        </form>

        <Button color={"#ffffff"} onClick={() => navigate.push('/')}>
          <FiLogIn />
          Já tenho conta
        </Button>
      </Content>
    </Container>
  );
};
