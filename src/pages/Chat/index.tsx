import React, { useState, useEffect, useCallback } from "react";
import { FiMenu, FiSearch, FiMoreVertical } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { Socket } from "socket.io-client";

import { InputWithButtons } from "../../components/Input";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";

import { api } from "../../services/api";

import { useAuth } from "../../hooks/Auth";

import { socket } from "../../socket";

import {
  Background,
  Messages,
  ConversationDate,
  InputMessages,
} from "../../components/Message/styles";
import { Groups, SideBar, Container, TopBarGroup } from "./styles";

interface Room {
  id: string;
  name: string;
  userLimit: number;
  isPrivate: boolean;
  userQuantity: number;
}

interface SelectRoomProps {
  roomId: string;
  userId: string;
  socket: Socket;
}

interface SelectedRoomResponse {
  room: Room;

  isOnChat: boolean;
}

interface MessageProps {
  id: string;
  userId: string;
  room: Room;
  text: string;
  created_at: string;
}

export const Chat: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    api.get("rooms/").then((response) => {
      setRooms(response.data);
    });
  });

  const selectRoom = ({ roomId, userId, socket }: SelectRoomProps) => {
    socket.emit(
      "select_room",
      {
        userId,
        roomId,
      },
      ({ room, isOnChat }: SelectedRoomResponse) => {
        setSelectedRoom(room);

        previousMessage(roomId);
      }
    );
  };

  const sendMessageHandler = useCallback(() => {
    const messageInput = document.getElementById(
      "message-input"
    ) as HTMLInputElement | null;

    if (messageInput) {
      const text = messageInput.value;
      if (text !== "") {
        socket.emit("message", {
          userId: user.id,
          text,
          roomName: selectedRoom?.name,
        });

        messageInput.value = "";
      }
    }
  }, [selectedRoom?.name, user.id]);

  // socket.on("message", (message: MessageProps) => {
  //   setMessages([...messages, message]);
  // });

  const previousMessage = (roomId: string) => {
    api.get(`messages/${roomId}`).then((response) => {
      const messages = response.data.map(({id, userId, text, created_at}: MessageProps) => {
        return {
          id,
          userId,
          text,
          created_at: created_at.substring(12, 16),
        } as MessageProps;
      });

      setMessages(messages);
    });
  };

  return (
    <Container>
      <SideBar>
        <div className="content-search-bar">
          <Button icon={FiMenu} />
          <div className="search-bar">
            <FiSearch size={24} className="fi-search" />
            <input placeholder="Search" type="text" />
          </div>
        </div>

        {rooms.map((room) => (
          <Groups
            key={room.id}
            groupId={room.id}
            onClick={() =>
              selectRoom({ roomId: room.id, userId: user.id, socket })
            }
          >
            <div className="left-icons">
              <div className="avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/45568289?v=4"
                  alt="User"
                />
              </div>

              <div className="content-message-container">
                <span className="content-username">{room.name}</span>
                <span className="content-message">Default Message</span>
              </div>
            </div>

            <div className="info-time-container">
              <span className="info-time">18:30</span>
              <div className="info-message-count">
                <span>2</span>
              </div>
            </div>
          </Groups>
        ))}
      </SideBar>

      {selectedRoom && (
        <div className="chat-group">
          <TopBarGroup>
            <div className="left-icons">
              <div className="avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/45568289?v=4"
                  alt="User"
                />
              </div>

              <div className="content-message-container">
                <span className="content-group-name">{selectedRoom.name}</span>
                <span className="content-message">Last group Message time</span>
              </div>
            </div>

            <div className="content-group-features">
              <Button icon={FiSearch} />
              <Button icon={FiMoreVertical} />
            </div>
          </TopBarGroup>

          <Background>
            <Messages>
              <div className="content-message">
                <ConversationDate>
                  <p>Today</p>
                </ConversationDate>

                {messages.map((message) => (
                  <Message
                    messageOwnerId={message.userId}
                    userId={user.id}
                    messageTime={message.created_at}
                  >
                    {message.text}
                  </Message>
                ))}
              </div>
            </Messages>
          </Background>
          <InputMessages>
            <InputWithButtons
              id="message-input"
              leftIcon={HiOutlineEmojiHappy}
              rightIcon={IoMdSend}
              onClickRightIcon={sendMessageHandler}
              placeholder="Message"
            />
          </InputMessages>
        </div>
      )}
    </Container>
  );
};
