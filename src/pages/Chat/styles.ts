import styled, { css } from 'styled-components';

interface RoomsProps {
  roomId: string;
  selectedRoomId: string | undefined;
}

interface CreateRoomProps {
  visibility: boolean;
}

interface SideBarMenuProps {
  visibility: boolean;
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  div.chat-room {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export const SideBar = styled.section`
  background-color: #ffffff;
  width: 52rem;
  height: 100vh;
  border-right: thin solid #70799166;
  overflow-y: auto;

  div.content-search-bar {
    padding: 0.8rem 0;
    display: flex;
    margin-left: 1.6rem;

    .search-bar {
      display: flex;
      align-items: center;
      margin: 0 1.6rem;
      background-color: #F5F5F5;
      width: 100%;
      padding: 0.8rem 1.8rem;
      border-radius: 1.6rem;

      .fi-search {
        color: #707991;
      }
      
      > input {
        margin-left: 1.2rem;
        background: none;
        border: none;
        color: #707991;
        font-size: 1.7rem;
      }
    }
  }

  div.create-room-button {
    display: flex;
    justify-content: center;
  }
`;

export const SideBarMenu = styled.div<SideBarMenuProps>`
  visibility: ${props => props.visibility ? 'visible' : 'hidden'};

  position: relative;

  div {
    position: absolute;
    top: 3rem;
    left: -2.2rem;
    height: 16rem;
    width: 16rem;
    background-color: #F5F5F5F2;
    z-index: 1;

    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      margin-top: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 0.8rem;
      }
    }
  }
`;

export const Rooms = styled.div<RoomsProps>`
  display: flex;
  padding: 1.6rem;
  background: #ffffff;
  justify-content: space-between;
  transition: background-color 0.2s;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  
  div.info-time-container, div.content-message-container  { 
    display: flex;
    flex-direction: column;
  }

  .left-icons {
    display: flex;

    div.content-message-container {
      margin-left: 1.6rem;

      .content-username {
        color: #011627;
        font-weight: bold;
      }
  
      .content-message {
        color: #707991;
        margin-top: 0.4rem;
      }
    }
  }


  div.info-time-container {
    align-items: end;

    > span.info-time {
      color: #707991;
    }

    > div.info-message-count {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      background-color: #78E378;
      margin-top: 0.5rem;
      
      > span {
        font-size: 1.2rem;
        text-align: center;
        color: #FFFFFF;
      }
    }
  }

  &:not(:last-child){
    margin-bottom: 0.1rem;
  } 

  :hover {
    background: #F5F5F5;
    cursor: pointer;
  }

  ${props => props.selectedRoomId === props.roomId && css`
      background: #F5F5F5;
    `
  }
`;

export const TopBarRoom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.8rem 1.8rem 1.2rem 2.8rem;

  div.avatar {
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
  }

  .left-icons {
    display: flex;

    div.content-message-container {
      display: flex;
      flex-direction: column;
      margin-left: 1.6rem;

      .content-room-name {
        color: #011627;
        font-weight: bold;
      }

      .content-message {
        margin-top: 0.5rem;
        color: #707991;
      }
    }
  }

  div.content-room-features{
    & > button:first-child {
      margin-right: 2.4rem;
    }
  }
`;

export const CreateRoom = styled.div<CreateRoomProps>`
  visibility: ${props => props.visibility ? 'visible' : 'hidden'};
  
  form {
    position: absolute;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    border-radius: 8%;
    width: 15%;
    height: 40%;
    top: 8rem;
    left: 12rem;
    z-index: 1;

    h1 {
      color: #707991;
    }

    div {
      width: 80%;

      input {
        margin-left: 0.4rem;
      }
    }
  }
`;