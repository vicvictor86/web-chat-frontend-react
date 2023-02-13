import React from "react";
import { FiCheck } from "react-icons/fi";

import { BackgroundMessage, MessageContent, Container } from "./styles";

interface MessageProps {
  messageTime: string;
  messageOwnerId: string;
  userId: string;
  children: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ messageTime, messageOwnerId, userId, children}) => (
  <Container messageOwnerId={messageOwnerId} userId={userId}>
    <BackgroundMessage messageOwnerId={messageOwnerId} userId={userId}>
      <MessageContent messageOwnerId={messageOwnerId} userId={userId}>
        <p>
          {children}
        </p>
        <div>

          <time>
            {messageTime} <FiCheck />
          </time>
        </div>
      </MessageContent>
    </BackgroundMessage>
  </Container>
);
