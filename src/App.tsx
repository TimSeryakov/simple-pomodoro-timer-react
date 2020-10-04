import React, {useRef, useState} from 'react';
import './App.css';


export default function App() {
  const timeRange = 25 * 60
  const [title, setTitle] = useState<string>('Let the countdown begin!')
  const [timeLeft, setTimeLeft] = useState<number>(timeRange)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<number>(-1)

  const padTime = (time: number) :string  => time.toString().padStart(2, '0')

  const startTimer = (): void => {
    setTitle(`You're doing great!` )
    setIsRunning(true)

    // @ts-ignore
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1

        resetTimer()
        return 0
      })
    }, 1000)
  }

  const stopTimer = (): void => {
    clearInterval(intervalRef.current)
    setTitle('Keep it up!')
    setIsRunning(false)
  }

  const resetTimer = (): void => {
    setTitle(`Ready to go another round?` )
    clearInterval(intervalRef.current)
    setTimeLeft(timeRange)
    setIsRunning(false)
  }


  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime(timeLeft - Number(minutes) * 60)

  return (
      <div className="app">
        <h2>{title}</h2>

        <div className="timer">
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>

        <div className="buttons">
          {!isRunning && <button onClick={startTimer}>Start</button>}
          {isRunning && <button onClick={stopTimer}>Stop</button>}
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
  );
}


// =======================================================================
// TODO Запомнить этот синтаксис:

// setInterval(() => {
//   setTimeLeft(timeLeft => timeLeft - 1)
// }, 1000)

// иначе постоянно остается предыдещее значение и не происходит перерендер