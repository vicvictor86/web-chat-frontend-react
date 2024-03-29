import React, { useCallback } from "react";
import { FiLock, FiLogIn, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";

import { Container, Content } from "./styles";
import { useAuth } from "../../hooks/Auth";
import { useHistory } from "react-router-dom";

interface Inputs {
  username: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn } = useAuth();

  const navigate = useHistory();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async ({ username, password }) => {
      const signInSuccessful = await signIn({ username, password });

      if(signInSuccessful) {
        return navigate.push('/chat');
      }
    },
    [signIn, navigate]
  );

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu login</h1>

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

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </form>

        <Button onClick={() => navigate.push('/sign-up')}>
          <FiLogIn />
          Criar Conta
        </Button>
      </Content>
    </Container>
  );
};
