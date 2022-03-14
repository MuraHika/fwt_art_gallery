import React, { useEffect, useState } from 'react';
import Arrow from "../../assets/Arrow.svg";
import ResizeScreen from "../../utils/ScreenSize";
import "./styles.scss";

interface AccordionProps {
  theme?: "dark" | "light";
  text?: string;
}

function Accordion({ theme, text } : AccordionProps) {
  const [buttonText, setButtonText] = useState<string>("Show all"); 
  
  const [showText, setShowText] = useState<string>(""); 
  const [hideText, setHideText] = useState<string>(""); 
  const screen = ResizeScreen();
  const [isHide, setIsHide] = useState<boolean>(true); 

  useEffect(() => {
    if ( text !== undefined) {
      if (text.length >= 238) {
        for (let index = 0; index < text.length; index += 1) {
          if (index <= 238) {
            setShowText((prevState) => (prevState + text[index]));
          } else {

            setHideText((prevState) => (prevState + text[index]));
          }
        }
        console.log(text.length);
      } else {
        setShowText(text);
        setIsHide(false);
      }
    }
  }, []);

  const SetHide = () => {
    const nowIsHide = !isHide;

    setShowText((prevState) => ( nowIsHide ? prevState.replace(hideText, "") : prevState + hideText));
    setButtonText(nowIsHide ? "Show all" : "Show less");
    setIsHide(nowIsHide);
  };

  return (
  <div className={`accordion accordion--${theme}`}>
    <div className={`accordion-text ${isHide ? "accordion-text--hide" : "accordion-text--show"}`}>
      <p className={`${isHide ? 'show-text' : ''}`}>
        <span className='text'>{showText}</span>
        {screen.isMobile && text!.length >= 238 &&
          <span className={`accordion-button_hide ${isHide ? "arrow--hide" : "arrow--show"}`} onClick={() => SetHide()} >
            <Arrow />
          </span> 
        }
      </p>
      
    </div>
    {!screen.isMobile  && text!.length >= 238 && <div className={`accordion-button_hide ${isHide ? "arrow--hide" : "arrow--show"}`} onClick={() => SetHide()}>
      <span>{buttonText}</span>
      <Arrow />
    </div>}
  </div>
  );
}

export default Accordion;

Accordion.defaultProps = {
  theme: "light",
};
