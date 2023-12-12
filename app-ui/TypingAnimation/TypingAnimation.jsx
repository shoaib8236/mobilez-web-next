import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ texts, speed = 100, delay = 1500 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentText = texts[textIndex];

      if (currentText && displayText.length < currentText.length) {
        setDisplayText((prevText) => prevText + currentText[displayText.length]);
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setDisplayText('');
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, delay);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [displayText, textIndex, texts, speed, delay]);

  return <span>{displayText}</span>;
};

export default TypingAnimation;
