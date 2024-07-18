import React, { useEffect, useState } from 'react';

const AnimatedText = () => {
  const [currentText, setCurrentText] = useState('');
  const sentence = 'ADMIN PANEL';

  useEffect(() => {
    let index = 0;

    const animateText = () => {
      setCurrentText(sentence.slice(0, index + 1));
      index++;
      if (index <= sentence.length) {
        setTimeout(animateText, 2000 / sentence.length);
      } else {
        setTimeout(() => {
          setCurrentText('');
          index = 0;
          animateText();
        }, 1000);
      }
    };

    animateText();

    return () => clearTimeout(animateText);
  }, [sentence]);

  const getTextColor = (char) => {
    if (char === 'A' || char === 'D' || char === 'M' || char=== 'I' || char === 'N') {
      return 'text-red-600';
    } else if (char === 'P' || char === 'A' || char === 'N' ||char === 'E' || char === 'L') {
      return 'text-red-600';
    }
    return ''; // Default case
  };

  return (
    <div className=''> {/* Adjust background color here */}
      <div className="text-6xl inline-block rounded font-extrabold opacity-100 transition duration-4000 mb-8">
        {currentText.split('').map((char, index) => (
          <span
            key={index}
            className={`${getTextColor(char)} `}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
