import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  max-height: 5.6rem;
  padding: 1.6rem;
  background-color: #FFFFFF;
  border-radius: 1.2rem;

  input {
    background: none;
    border: 0;
    flex: 1;
    padding: 1.8rem 0;
  }

  svg {
    margin-right: 1.6rem;
    color: #707991;
  }
  
  input + svg, input + button svg {
    margin: 0;
  }
`;