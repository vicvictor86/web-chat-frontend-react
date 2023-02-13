import styled, { css } from 'styled-components';

interface SendProps {
  userId: string;
  messageOwnerId: string;
}

export const Messages = styled.div<SendProps>`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #8BABD8;

  div.input-message{
    display: flex;
    justify-content: center;
  }
`;

export const Container = styled.div<SendProps>`
  display: flex;
  ${(props) => props.userId && css`
      justify-content: end;
    `
  };
`;

export const BackgroundMessage = styled.div<SendProps>`
  background-color: #FFFFFF;
  min-width: 14rem;
  max-width: 42rem;
  padding: 0.8rem 1.2rem;
  border-radius: 0.8rem;
  margin: 0.8rem 1.8rem;

  ${(props) => props.userId && css`
      background-color: #78E378;
    `
  };
`;

export const MessageContent = styled.div<SendProps>`
  /* display: flex;
  flex-direction: column;
  align-items: start; */

  > p {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  > div time {
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 0.4rem;

    ${(props) => props.userId && css`
      color: #FFFFFF;
    `
  };
  }
`;

export const ConversationDate = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.4rem 0;

  p {
    padding: 0.8rem 1.6rem;
    background-color: #3D70B866;
    border-radius: 1.2rem;
    color: #FFFFFF;
  }
`;