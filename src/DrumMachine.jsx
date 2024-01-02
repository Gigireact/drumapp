import React, { useState, useEffect, useRef } from 'react';
import analog from './beats/analog.mp3';
import clap from './beats/clap.mp3';
import bassdrum from './beats/bassdrum.mp3';
import fresh from './beats/fresh.mp3';
import safari from './beats/safari.mp3';
import punch from './beats/punch.mp3';
import casio from './beats/casio.mp3';
import hitom from './beats/hitom.mp3';
import bassboom from './beats/bassboom.mp3';

const DrumPad = ({ id, src, keyTrigger, onClick }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      onClick(id);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === keyTrigger) {
        playAudio();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [keyTrigger, playAudio]);

  return (
    <div className="drum-pad" onClick={playAudio}>
      {keyTrigger}
      <audio ref={audioRef} className="clip" src={src}></audio>
    </div>
  );
};

const DrumMachine = () => {
  const [displayText, setDisplayText] = useState('');

  const playAudio = (id) => {
    setDisplayText(id);
  };

  return (
        <div id="drum-machine">
          <div id="display">{displayText}</div>
          <div className="drum-pads">
            <DrumPad id="Analog" src={analog} keyTrigger="Q" onClick={playAudio} />
            <DrumPad id="Bassboom" src={bassboom} keyTrigger="W" onClick={playAudio} />
            <DrumPad id="Bassdrum" src={bassdrum} keyTrigger="E" onClick={playAudio} />
            <DrumPad id="Casio" src={casio} keyTrigger="A" onClick={playAudio} />
            <DrumPad id="Clap" src={clap} keyTrigger="S" onClick={playAudio} />
            <DrumPad id="Fresh" src={fresh} keyTrigger="D" onClick={playAudio} />
            <DrumPad id="Hi-Tom" src={hitom} keyTrigger="Z" onClick={playAudio} />
            <DrumPad id="Punch" src={punch} keyTrigger="X" onClick={playAudio} />
            <DrumPad id="Safari" src={safari} keyTrigger="C" onClick={playAudio} />
          </div>
        </div>
      );
};

export default DrumMachine;

