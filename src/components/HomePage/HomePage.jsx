import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DialogContentText } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerSection = ({ playerName, setScore, currScore, setTimer, currTimer, setFinished, value }) => {
  const [isSelected, setSelected] = useState(false);
  const [openRules, setOpenRules] = useState(false);

  useEffect(() => {
    if (!isSelected) return;

    const intervalID = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalID);
          setSelected(false);
          setFinished(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isSelected]);

  const toggleClick = () => {
    setSelected((prev) => !prev);
  }

  const handleReset = () => {
    setTimer(30);
    setScore(0);
  }

  const handleOpen = () => {
    setOpenRules(true);
  }

  const handleRuleClose = () => {
    setOpenRules(false);
  }

  const handleClick = () => {
    setScore(currScore + 1);
  }

  return (
    <div>
      <div className={styles.pl}>
        <div className={styles.pl1}>
          <div>
            <p>{currScore}</p>
            <p>Total Clicks</p>
          </div>
          <div>
            <h1 className={styles.h1}>Player {value}: {playerName}</h1>
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
          <button className={styles.butt} onClick={handleClick} disabled={isSelected === false || currTimer === 0}>Click Me</button>
          <div className={styles.buttSec}>
            <button className={styles.butt} onClick={handleReset}>Reset Timer & Score</button>
            <button className={styles.butt} onClick={handleOpen}>How to Play</button>
          </div>
        </div>
      </div>
      <Dialog
        open={openRules}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleRuleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>How to Play The Game of Clicks</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ul>
              <li>Click on the Red Light image to make it green and start your turn.</li>
              <li>Click on the 'Click Me' button below the image as fast and as many times as you can within 30 seconds.</li>
              <li>You can reset the timer and score if you wish with the 'Reset Timer & Score' button.</li>
              <li><b>Your clicks will only be counted if and only if the light is green.</b></li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRuleClose}>Continue Playing</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};



const HomePage = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player1Timer, setPlayer1Timer] = useState(30);
  const [player1Finished, setPlayer1Finished] = useState(false);

  const [player2Score, setPlayer2Score] = useState(0);
  const [player2Timer, setPlayer2Timer] = useState(30);
  const [player2Finished, setPlayer2Finished] = useState(false);

  const [winner, setWinner] = useState('');
  const [open, setOpen] = useState(false);

  const navigateTo = useNavigate();

  const player1_name = JSON.parse(localStorage.getItem('Player 1 Name: '));
  const player2_name = JSON.parse(localStorage.getItem('Player 2 Name: '));

  useEffect(() => {
    if (player1Finished && player2Finished) {
      if (player1Score > player2Score) {
        setWinner(`${player1_name}`);
      } else if (player2Score > player1Score) {
        setWinner(`${player2_name}`);
      } else {
        setWinner('Tie');
      }
      setOpen(true);
    }
  }, [player1Finished, player2Finished]);

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
      location.reload();
    }
  }

  const handleRedirect = () => {
    navigateTo("/");
  }

  return (
    <div>
      <PlayerSection 
        playerName={player1_name}
        currScore={player1Score}
        setScore={setPlayer1Score}
        currTimer={player1Timer}
        setTimer={setPlayer1Timer}
        setFinished={setPlayer1Finished}
        value={1}
      />
          
      <hr className={styles.line} />

      <PlayerSection 
        playerName={player2_name}
        currScore={player2Score}
        setScore={setPlayer2Score}
        currTimer={player2Timer}
        setTimer={setPlayer2Timer}
        setFinished={setPlayer2Finished}
        value={2}
      />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>And the winner is...</DialogTitle>
        <DialogContent>
          <DialogTitle>{winner === 'Tie' ? "It's a tie!" : `${winner}!`}</DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Play Again</Button>
          <Button onClick={handleRedirect}>Go Back To Home Page</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomePage
