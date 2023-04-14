import React, { useState, useEffect, useCallback } from "react";
import {
  FiMenu,
  FiSearch,
  FiMoreVertical,
  FiLock,
  FiMessageCircle,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { Socket } from "socket.io-client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "../../components/Input";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";

import { api } from "../../services/api";

import { UserProps, useAuth } from "../../hooks/Auth";

import { socket } from "../../socket";

import {
  Background,
  Messages,
  ConversationDate,
  InputMessages,
} from "../../components/Message/styles";
import { Rooms, SideBar, Container, TopBarRoom, CreateRoom, SideBarMenu } from "./styles";
import { useHistory } from "react-router-dom";

interface Room {
  id: string;
  name: string;
  userLimit: number;
  isPrivate: boolean;
  userQuantity: number;
  created_at: string;
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

interface InputsNewRoom {
  name: string;
  password: string;
  userLimit: number;
}

interface ConnectionUsersRooms {
  id: string;
  room: Room;
  user: UserProps;
  socketId: string;
  isOnChat: boolean;
}

export const Chat: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  
  const [messages, setMessages] = useState<MessageProps[]>([]);
  
  const [createRoomVisibility, setCreateRoomVisibility] = useState<boolean>(false);
  const [sideBarMenuVisibility, setSideBarMenuVisibility] = useState<boolean>(false);

  const [usersInRoom, setUsersInRoom] = useState<UserProps[]>([]);

  const { register, handleSubmit } = useForm<InputsNewRoom>();

  const { user, signOut } = useAuth();

  const navigate = useHistory();

  useEffect(() => {
    api.get(`rooms/user/${user.id}`).then((response) => {
      setRooms(response.data);
    });
  }, [user.id]);

  useEffect(() => {
    socket.on("message", (message: MessageProps) => {
      const newMessage = {
        ...message,
        created_at: message.created_at.substring(12, 16),
      } as MessageProps;

      setMessages([...messages, newMessage]);
    });

    socket.on("app_error", (message: string) => {
      console.log(message);
    })
  }, [messages]);

  const onCreateRoomSubmit: SubmitHandler<InputsNewRoom> = async ({
    name,
    password,
    userLimit,
  }) => {
    const response = await api.post(
      "rooms",
      {
        name,
        password,
        userLimit,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("@Web-chat:token"),
        },
      }
    );

    const room = response.data as Room;

    setRooms([...rooms, room]);
  };

  const handleSignOut = useCallback(() => {
    signOut();

    navigate.push('/');
  }, [signOut, navigate])

  const selectRoom = ({ roomId, userId, socket }: SelectRoomProps) => {
    socket.emit(
      "select_room",
      {
        userId,
        roomId,
      },
      ({ room }: SelectedRoomResponse) => {
        setSelectedRoom(room);

        previousMessage(roomId);
      }
    );

    socket.emit("connections_room", {
      roomId,
    }, (data: ConnectionUsersRooms[]) => {
      const usersInSelectedRoom = data.map((connections) => {
        return {
          id: connections.user.id,
          username: connections.user.username,
        } as UserProps;
      });

      setUsersInRoom(usersInSelectedRoom);
    })
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

  const previousMessage = (roomId: string) => {
    api.get(`messages/${roomId}`).then((response) => {
      const messages = response.data.map(
        ({ id, userId, text, created_at }: MessageProps) => {
          return {
            id,
            userId,
            text,
            created_at: created_at.substring(12, 16),
          } as MessageProps;
        }
      );

      setMessages(messages);
    });
  };

  const showUsersInRoom = useCallback(() => {
    let usersInRoomString = '';
    usersInRoom.forEach((user) => (
      usersInRoomString += `${user.username}, `
    ));

    usersInRoomString = usersInRoomString.substring(0, usersInRoomString.length - 2);

    return usersInRoomString;
  }, [usersInRoom]);

  return (
    <Container>
      <SideBar>
        <div className="content-search-bar">
          <Button icon={FiMenu} onClick={() => setSideBarMenuVisibility(!sideBarMenuVisibility)} />
          <SideBarMenu visibility={sideBarMenuVisibility}>
            <div>
              <Button icon={FiLogOut} onClick={handleSignOut}>SignOut</Button>
            </div>
          </SideBarMenu>
          <div className="search-bar">
            <FiSearch size={24} className="fi-search" />
            <input placeholder="Pesquisar" type="text" />
          </div>
        </div>

        <div className="create-room-button">
          <Button
            onClick={() => setCreateRoomVisibility(!createRoomVisibility)}
          >
            <p>Criar novo grupo </p>
          </Button>
        </div>

        <CreateRoom visibility={createRoomVisibility}>
          <form onSubmit={handleSubmit(onCreateRoomSubmit)}>
            <h1>Novo Grupo</h1>

            <Input
              leftIcon={FiMessageCircle}
              placeholder="Nome do grupo"
              {...register("name")}
            />
            <Input
              leftIcon={FiLock}
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            <Input
              leftIcon={FiUsers}
              type="number"
              placeholder="Número máximo de usuários"
              {...register("userLimit")}
            />

            <Button type="submit">Criar</Button>
          </form>
        </CreateRoom>

        {rooms.map((room) => (
          <Rooms
            key={room.id}
            selectedRoomId={selectedRoom && selectedRoom.id}
            roomId={room.id}
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
          </Rooms>
        ))}
      </SideBar>

      {selectedRoom && (
        <div className="chat-room">
          <TopBarRoom>
            <div className="left-icons">
              <div className="avatar">
                <img
                  src="https://avatars.githubusercontent.com/u/45568289?v=4"
                  alt="User"
                />
              </div>

              <div className="content-message-container">
                <span className="content-room-name">{selectedRoom.name}</span>
                <span className="content-message">{showUsersInRoom()}</span>
              </div>
            </div>

            <div className="content-room-features">
              <Button icon={FiSearch} />
              <Button icon={FiMoreVertical} />
            </div>
          </TopBarRoom>

          <Background>
            <Messages>
              <div className="content-message">
                <ConversationDate>
                  <p>Today</p>
                </ConversationDate>

                {messages.map((message) => (
                  <Message
                    key={message.id}
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
          <InputMessages onKeyUp={(event) => {
            if (event.key === 'Enter') {
              sendMessageHandler()
            }
          }}>
            <Input
              id="message-input"
              hasButton={true}
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
