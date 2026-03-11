import { useState, useEffect } from 'react';

export const useTypewriter = (text: string, speed: number = 50, delay: number = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let timeoutId: any;
    let i = 0;
    
    setDisplayText('');
    setIsDone(false);

    const startTyping = () => {
      const type = () => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
          timeoutId = setTimeout(type, speed);
        } else {
          setIsDone(true);
        }
      };
      type();
    };

    const delayTimeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimeoutId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  return { displayText, isDone };
};
