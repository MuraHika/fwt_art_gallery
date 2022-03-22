import React, { FC, useEffect, useState } from 'react';
import "./styles.scss";
import Lock from "../../assets/Lock.svg";
import User from "../../assets/User.svg";
import Button from '../Button';
import Input from '../Input';
import Close from "../../assets/Close.svg";
import Link from '../Link';
import { useAppDispatch, useAppSelector } from "../../hooks/useToolkit";
import { authUser, checkEmptyField } from "../../slices/artistSlice";

interface ModalAuthProps {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>; 
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAuth: FC<ModalAuthProps> = ({ setRegister, setAuth } : ModalAuthProps) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.artists.errorValidate);

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('email', email);
    console.log('password', password);

    if (email.length > 0 && password.length > 0) {
      dispatch(authUser({ email: email, password: password }))
        .finally(() => {
          setPassword("");
        });
    } else {
      dispatch(checkEmptyField({ email:email, password: password }));
    }
  };

  const closeModal = () => {
    setRegister(false);
    setAuth(false);
  };

  const handleCloseModal = (e:any) => {
    if (e.target.classList[0] === 'container-modal') {
      closeModal();
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Escape") {
      window.removeEventListener('keyup', onKeyPress);
      closeModal();
    } 
  };

  return (
    <div className="container-modal" onClick={(e) => handleCloseModal(e)}>
      <div className='modal'>
        <div className='close-button' onClick={() => closeModal()}>
          <Close />
        </div>
        <form className='modal-form' onSubmit={handleSubmit}>
          <h1>AUTHORIZATION</h1>
          <Input name='email' text="Email" icon={<User />} type="text" onChange={(e) => setEmail(e.currentTarget.value)}  error={error.email} value={email}/>
          <Input name='password'  text="Password" icon={<Lock />} type="password" onChange={(e) => setPassword(e.currentTarget.value)}  error={error.password} value={password}/>
          <Button theme="dark" isPrimary={false} size="medium" text="LOG IN" paddings='12px 66px' type="submit" onClick={handleSubmit}/>
          <span className='form-link'>If you don't have an account yet,  
            <Link theme="light" text='please sign up' url=''/> 
          </span>
        </form>
      </div>
    </div>
  );
};

export default ModalAuth;

