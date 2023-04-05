import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 70rem;
  height: 80%;
  background-color: #D9DCE0;
  border-radius: 2.4rem;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    div + div {
      margin-top: 0.8rem;
    }

    h1 {
      margin-bottom: 24px;
    }

    button {
      background-color: #F4EDE8;
      padding: 1.2rem 2.4rem;
      margin-top: 1.4rem;
      width: 60%;
      border-radius: 0.8rem;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#707991')}
      }
    }

    a {
      background-color: #F4EDE8;
      color: #707991;
      display: block;
      margin-top: 1.4rem;
      text-decoration: none;
      border-radius: 0.8rem;
      padding: 1.4rem;
      width: 60%;

      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#707991')}
      }
    }
  }

  > a {
    display: block;
    background-color: #F4EDE8;
    color: #707991;
    padding: 1.4rem;
    border-radius: 0.8rem;
    
    display: flex;
    align-items: center;
    
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 15px;
    }

    &:hover {
      color: ${shade(0.2, '#707991')};
    }
  }
`;