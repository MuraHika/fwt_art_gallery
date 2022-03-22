import React, { FC, useEffect, useState } from 'react';
import "./styles.scss";
import Lock from "../../assets/Lock.svg";
import User from "../../assets/User.svg";
import Button from '../Button';
import Input from '../Input';
import Close from "../../assets/Close.svg";
import Link from '../Link';
import { useAppDispatch, useAppSelector } from "../../hooks/useToolkit";
import { registerUser, checkEmptyField } from "../../slices/artistSlice";

interface ModalRegisterProps {
  setRegister: React.Dispatch<React.SetStateAction<boolean>>; 
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRegister: FC<ModalRegisterProps> = ({ setRegister, setAuth } : ModalRegisterProps) => {
 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.artists.errorValidate);

  useEffect(() => {
    window.addEventListener('keyup', onKeyPress);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('email', email);
    console.log('password', password);
    console.log('confirm password', confirmPassword);
    if (email.length > 0 && password.length > 0 && confirmPassword.length > 0) {
      dispatch(registerUser({ email: email, password: password, confirmPassword: confirmPassword }))
        .then((res) => {
          if (res.meta.requestStatus !== "rejected") {
            console.log("okkkk", res);
            closeModal();
          }
        })
        .finally(() => {
          setPassword("");
          setConfirmPassword("");
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

  const onNavigate = () => {
    setRegister(true);
    setAuth(false);
  };

  return (
    <div className="container-modal" onClick={(e) => handleCloseModal(e)} >
      <div className='modal'>
        <div className='close-button' onClick={() => closeModal()}>
          <Close />
        </div>
        <form className='modal-form' onSubmit={handleSubmit}>
          <h1>СREATE YOUR PROFILE</h1>
          <Input text="Email" icon={<User />} type="text" onChange={(e) => setEmail(e.currentTarget.value)} error={error.email} value={email}/>
          <Input text="Password" icon={<Lock />} type="password"  onChange={(e) => setPassword(e.currentTarget.value)} error={error.password} value={password}/>
          <Input text="Comfirm password" icon={<Lock />} type="password"  onChange={(e) => setConfirmPassword(e.currentTarget.value)} error={error.confirmPassword} value={confirmPassword}/>
          <Button theme="dark" isPrimary={false} size="medium" text="REGISTRATION" paddings='12px 66px' type="submit" onClick={handleSubmit}/>
          <span className='form-link'>If you already have an account, 
            <Link theme="light" text='please log in' url=''  isTargetBlank={false}  onClick={() => onNavigate()}/> 
          </span>
        </form>
      </div>
    </div>
  );
};

export default ModalRegister;