import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 48.4rem;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-right: #FFFFFF80 solid 0.1rem ;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      color: #FFFFFF;
    }

    div {
      background-color: rgba(255, 255, 255, 0.1);
    }

    div + div {
      margin-top: 0.8rem;
    }
    
    div input {
      color: #FFFFFF;
      margin-right: 0.8rem;
    }

    div ::placeholder {
      color: #FFFFFF;
    }

    h1 {
      margin-bottom: 24px;
    }

    button {
      background-color: #CFD8DC;
      color: #2A2A2A;
      padding: 1.2rem 2.4rem;
      margin-top: 1.4rem;
      width: 60%;
      border-radius: 0.4rem;
      transition: color 0.2s;

      &:hover {
        color: #4DB6AC;
      }
    }

    a {
      background-color: #CFD8DC;
      color: #2A2A2A;
      display: block;
      margin-top: 1.4rem;
      text-decoration: none;
      border-radius: 0.8rem;
      padding: 1.4rem;
      width: 60%;

      transition: color 0.2s;

      &:hover {
        color: #4DB6AC;
      }
    }
  }

  > button {
    display: block;
    background-color: transparent;
    color: #FFFFFF;
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
      color: #4DB6AC;
    }
  }
`;