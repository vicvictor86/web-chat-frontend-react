import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const SideBar = styled.section`
  background-color: #ffffff;
  width: 52rem;
  height: 100%;

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
`;

export const Groups = styled.div`
  display: flex;
  padding: 1.6rem;
  background: #ffffff;
  justify-content: space-between;

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
    margin-bottom: 0.5rem;
  } 
`;

export const TopBarGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-left: thin solid #707991;
  padding: 0.8rem 1.8rem 0 2.8rem;

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

      .content-group-name {
        color: #011627;
        font-weight: bold;
      }

      .content-message {
        margin-top: 0.5rem;
        color: #707991;
      }
    }
  }

  div.content-group-features{
    & > button:first-child {
      margin-right: 2.4rem;
    }
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: #707991;
`;