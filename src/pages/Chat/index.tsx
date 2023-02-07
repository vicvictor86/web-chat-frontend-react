import React, { FormEvent, useState, useEffect } from "react";

import { Groups, SideBar, Container, TopBarGroup, Button } from "./styles";

import { FiAlignJustify, FiSearch, FiMoreVertical } from "react-icons/fi";

export const Chat: React.FC = () => (
  <Container>
    <SideBar>
      <div className="content-search-bar">
        <Button>
          <FiAlignJustify size={24}/>
        </Button>
        <div className="search-bar">
          <FiSearch size={24} className="fi-search" />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <Groups>
        <div className="left-icons">
          <div className="avatar">
            <img
              src="https://avatars.githubusercontent.com/u/45568289?v=4"
              alt="User"
            />
          </div>

          <div className="content-message-container">
            <span className="content-username">User name</span>
            <span className="content-message">Last Message</span>
          </div>
        </div>

        <div className="info-time-container">
          <span className="info-time">18:30</span>
          <div className="info-message-count">
            <span>2</span>
          </div>
        </div>
      </Groups>

      
      <Groups>
        <div className="left-icons">
          <div className="avatar">
            <img
              src="https://avatars.githubusercontent.com/u/45568289?v=4"
              alt="User"
            />
          </div>

          <div className="content-message-container">
            <span className="content-username">User name</span>
            <span className="content-message">Last Message</span>
          </div>
        </div>

        <div className="info-time-container">
          <span className="info-time">18:30</span>
          <div className="info-message-count">
            <span>2</span>
          </div>
        </div>
      </Groups>
    </SideBar>

    <TopBarGroup>
      <div className="left-icons">
        <div className="avatar">
          <img
            src="https://avatars.githubusercontent.com/u/45568289?v=4"
            alt="User"
          />
        </div>

        <div className="content-message-container">
          <span className="content-group-name">Group name</span>
          <span className="content-message">Last group Message time</span>
        </div>
      </div>

      <div className="content-group-features">
        
        <Button>
          <FiSearch size={24}/>
        </Button>
        <Button>
          <FiMoreVertical size={24} />
        </Button>
      </div>
    </TopBarGroup>
  </Container>
);
