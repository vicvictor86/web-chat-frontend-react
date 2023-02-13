import styled, { css } from 'styled-components';

interface SendProps {
  userId: string;
  messageOwnerId: string;
}

export const Background = styled.div`
  height: 100vh;
  background-color: #8BABD8;
`;

export const Messages = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 6.2rem;

  div.input-message {
    margin: 0.8rem 0 2.4rem 0;
  }
`;

export const Container = styled.div<SendProps>`
  display: flex;
  ${(props) => props.userId === props.messageOwnerId && css`
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
  margin: 0.8rem 0;

  ${(props) => props.userId === props.messageOwnerId && css`
      background-color: #78E378;
    `
  };
`;

export const MessageContent = styled.div<SendProps>` 
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

    ${(props) => props.userId === props.messageOwnerId && css`
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