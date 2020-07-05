import React, { useState } from 'react';

import { Typer } from 'react-typetool';

const App = () => {
  const [startReplayA, setStartReplayA] = useState(false);
  const [startReplayB, setStartReplayB] = useState(false);
  const [buttonBText, setButtonBText] = useState('Start');

  const replayA = () => {
    setStartReplayA(true);
  };

  const replayB = () => {
    setStartReplayB(true);
    setButtonBText('Replay');
  };


  return (
    <div className='app'>
      <div className='textContainer'>
        <Typer
          text='Typer example'
          onStart={() => console.log('started')}
          onFinish={() => console.log('finished')}
          loop={true}
        />
        <Typer text='Fast typing' stepIntervalMS={100} loop={true} />
        <Typer text='Fast blinking caret' blinkIntervalMS={100} loop={true} />
        <Typer text='No blinking caret' blink={false} loop={true} />
        <Typer text='No caret' showCaret={false} loop={true} />
        <Typer text='Start from step 5' startStep={5} loop={true} />
        <div className='withButton'>
          <Typer
            text={`Don't loop`}
            onStart={() => setStartReplayA(false)}
            replay={startReplayA}
          />
          <button onClick={replayA}>Replay</button>
        </div>
        <div className='withButton'>
          <Typer
            text={`Don't start instantly`}
            onStart={() => setStartReplayB(false)}
            startInstantly={false}
            replay={startReplayB}
          />
          <button onClick={replayB}>{buttonBText}</button>
        </div>
      </div>
    </div>
  );
};

export default App;
