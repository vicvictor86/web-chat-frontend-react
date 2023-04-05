import React from "react";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Content } from "./styles";

export const LogIn: React.FC = () => (
  <Container>
    <Content>
      <form>
        <h1>Faça seu login</h1>

        <Input name="email" leftIcon={FiMail} placeholder="Email" />
        <Input
          name="password"
          leftIcon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="signup">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
  </Container>
);
