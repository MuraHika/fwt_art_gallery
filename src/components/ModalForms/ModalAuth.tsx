import React, { FC, useEffect, useState } from 'react';
import "./styles.scss";
import Lock from "../../assets/Lock.svg";
import User from "../../assets/User.svg";
import Input from '../Input';
import ResizeScreen from "../../utils/ScreenSize";

import NoImage from "../../assets/no_image.webp";

interface ModalAuthProps {
  type?: 'artist' | 'paint';
}

const ModalAuth: FC<ModalAuthProps> = ({ type } : ModalAuthProps) => {
  const screen = ResizeScreen();

  useEffect(() => {
    // console.log("type type", urlImage);
  }, []);

  return (
    <div className="container-modal" >
      <div className='modal'>
        <div className='modal-form'>
          <span>СREATE YOUR PROFILE</span>
          <Input text="Email" icon={<User />} type="text"/>
          <Input text="Password" icon={<Lock />} type="password"/>
        </div>
      </div>
    </div>
  );
};

export default ModalAuth;