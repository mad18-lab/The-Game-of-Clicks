import React, { useState, useEffect } from 'react';
import styles from './Player.module.css';

const Player1 = () => {
    const [isSelected, setSelected] = useState(false);
    const [currScore, setScore] = useState(0);
    const [currTimer, setTimer] = useState(30);
  
    useEffect(() => {
      if (!isSelected) return; // Exit if not selected
  
      const intervalID = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalID);
            setSelected(false);
            return 0;
          }
        });
      }, 1000);
  
      // Clear interval on component unmount or when isSelected changes to prevent memory leaks
      return () => clearInterval(intervalID);
    }, [isSelected]);
  
    const toggleClick = () => {
      setSelected((prev) => !prev);
    }
  
    const handleClick = () => {
      setScore(currScore + 1);
    }
  
    const handleReset = () => {
      setTimer(30);
      setScore(0);
    }
  
    const player1_name = JSON.parse(localStorage.getItem('Player 1 Name: '));
  
    return (
      <div>
        <div className={styles.pl}>
          <div className={styles.pl1}>
            <div>
              <p>{currScore}</p>
              <p>Total Clicks</p>
            </div>
            <div>
              <h1 className={styles.h1}>Player 1:  {player1_name}</h1>
            </div>
            <div>
              <p>{currTimer}</p>
              <p>Timer</p>
            </div>
          </div>
          <div className={styles.image}>
            <img src={isSelected ? '/images/green_light.PNG' : '/images/red_light.PNG'} alt='light' onClick={toggleClick} />
          </div>
          <div className={styles.buttons}>
            <button className={styles.butt} onClick={handleClick} disabled={currTimer===0 || isSelected===false}> Click Me </button>
            <button className={styles.butt} onClick={handleReset}> Reset Timer & Score </button>
          </div>
        </div>
      </div>
    )
}

export default Player1;
