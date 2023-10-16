// import React from "react";

// const drumpad =[]

// const DrumMachine = () => {
//     return (
//         <div id="drum-machine">
//             <div id="display"></div>
//             <div className="drumpad">
//                 <button id="Q"></button>
//                 <button id="w"></button>
//                 <button id="E"></button>
//                 <button id="A"></button>
//                 <button id="S"></button>
//                 <button id="D"></button>
//                 <button id="Z"></button>
//                 <button id="X"></button>
//                 <button id="C"></button>
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import './App.css';


const DrumMachine = () => {

  const drumPadsData = [
    { id: 'Q', keyCode: 81, src: 'analog.mp3', description: 'Sound 1' },
    { id: 'W', keyCode: 87, src: 'clap.mp3', description: 'Sound 2' },
    { id: 'E', keyCode: 69, src: 'bassdrum.mp3', description: 'Sound 3' },
    { id: 'A', keyCode: 65, src: 'fresh.mp3', description: 'Sound 4' },
    { id: 'S', keyCode: 83, src: 'safari.mp3', description: 'Sound 5' },
    { id: 'D', keyCode: 68, src: 'punch.mp3', description: 'Sound 6' },
    { id: 'Z', keyCode: 90, src: 'casio.mp3', description: 'Sound 7' },
    { id: 'X', keyCode: 88, src: 'hitom.mp3', description: 'Sound 8' },
    { id: 'C', keyCode: 67, src: 'bassboom.mp3', description: 'Sound 9' },
  ];
  
  const [displayText, setDisplayText] = useState('');

  const handlePadClick = (description) => {
    setDisplayText(description);
    playSound(description);
  };

  const handleKeyPress = (event) => {
    const drumPad = drumPadsData.find((pad) => pad.keyTrigger === event.key.toUpperCase());
    if (drumPad) {
      setDisplayText(drumPad.description);
      playSound(drumPad.description);
    }
  };

  const playSound = (description) => {
    const sound = new Audio();
    sound.src = drumPadsData.find((pad) => pad.description === description).src;
    sound.play();
  };

  // Add event listeners to handle keyboard presses
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        {drumPadsData.map((pad) => (
          <div
            key={pad.id}
            className="drum-pad"
            id={pad.id}
            onClick={() => handlePadClick(pad.description)}
            tabIndex="0"
          >
            {pad.keyTrigger}
            <audio className="clip" id={pad.keyTrigger} src={pad.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;
