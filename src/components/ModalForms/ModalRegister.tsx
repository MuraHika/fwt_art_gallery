import React, { FC, useEffect, useState } from 'react';
import "./styles.scss";
import Lock from "../../assets/Lock.svg";
import User from "../../assets/User.svg";
import Button from '../Button';
import Input from '../Input';
import Link from '../Link';
import ResizeScreen from "../../utils/ScreenSize";

import NoImage from "../../assets/no_image.webp";

interface ModalRegisterProps {
  type?: 'artist' | 'paint';
}

const ModalRegister: FC<ModalRegisterProps> = ({ type } : ModalRegisterProps) => {
  const screen = ResizeScreen();

  useEffect(() => {
    // console.log("type type", urlImage);
  }, []);

  return (
    <div className="container-modal" >
      <div className='modal'>
        <div className='modal-form'>
          <h1>СREATE YOUR PROFILE</h1>
          <Input text="Email" icon={<User />} type="text"/>
          <Input text="Password" icon={<Lock />} type="password"/>
          <Input text="Comfirm password" icon={<Lock />} type="password"/>
          <Button theme="dark" isPrimary={false} size="medium" text="REGISTRATION" paddings='12px 66px'  />
          <span>If you already have an account, <Link theme="light" text='please log in' url=''/> </span>
        </div>
      </div>
    </div>
  );
};

export default ModalRegister;