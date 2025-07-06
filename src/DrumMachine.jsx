
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
import './App.css';

const padBank = [
  { key: 'Q', id: 'Analog', src: analog },
  { key: 'W', id: 'Bassboom', src: bassboom },
  { key: 'E', id: 'Bassdrum', src: bassdrum },
  { key: 'A', id: 'Casio', src: casio },
  { key: 'S', id: 'Clap', src: clap },
  { key: 'D', id: 'Fresh', src: fresh },
  { key: 'Z', id: 'Hi-Tom', src: hitom },
  { key: 'X', id: 'Punch', src: punch },
  { key: 'C', id: 'Safari', src: safari },
];

const DrumPad = ({ id, src, keyTrigger, onClick, volume, power }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio && power) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      onClick(id);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toUpperCase() === keyTrigger) {
        playAudio();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [keyTrigger, volume, power]);

  return (
    <div className="drum-pad" id={id} onClick={playAudio}>
      {keyTrigger}
      <audio ref={audioRef} className="clip" id={keyTrigger} src={src}></audio>
    </div>
  );
};

const DrumMachine = () => {
  const [displayText, setDisplayText] = useState('Ready');
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);

  const handleDisplay = (text) => {
    if (power) setDisplayText(text);
  };

  const togglePower = () => {
    setPower(prev => !prev);
    setDisplayText(prev => (!power ? 'On' : 'Off'));
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (power) {
      setDisplayText(`Volume: ${Math.round(vol * 100)}%`);
    }
  };

  return (
    <div id="drum-machine">
      <div id='drum-mach'>
        {padBank.map((pad) => (
          <DrumPad
            key={pad.key}
            id={pad.id}
            src={pad.src}
            keyTrigger={pad.key}
            onClick={handleDisplay}
            volume={volume}
            power={power}
          />
        ))}
      </div>
      <div className="screen">
        <div id="display" className="display">{displayText}</div>
        <div className="keys">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="key"></div>
          ))}
        </div>
        <div className="controls">
          <label className="power-switch">
            <input type="checkbox" checked={power} onChange={togglePower} />
            <span className="slider"></span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>

      </div>
    </div>
  );
};

export default DrumMachine;


