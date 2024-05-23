import styles from './Landing-Page.module.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
// import { PlayerContext } from '../../context/PlayerContext';

const Landing_Page = () => {
  const [open, setOpen] = useState(false);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  // const { setPlayerNames } = useContext(PlayerContext);
  const navigateTo = useNavigate();

  const setClickOpen = () => {
    setOpen(true);
  }

  const setClickClose = () => {
    setOpen(false);
  }

  const setSubmit = (event) => {
    event.preventDefault();
    // setPlayerNames({ player1, player2 });   //set player names in context
    localStorage.setItem("Player 1 Name: ", JSON.stringify(player1));
    localStorage.setItem("Player 2 Name: ", JSON.stringify(player2));
    navigateTo('/home');
  }

  return (
    <div>
      <div className={styles.elements}>
        <div className={styles.image}>
          <img className={styles.click} src='/images/Hand-pointer-clicking-icon.png' alt='Clicking Image' onClick={setClickOpen} />
        </div>
        <div className={styles.head}>
          <h1 className={styles.title}>The Game of Clicks</h1>
        </div>
        <div className={styles.but}>
          <button onClick={setClickOpen} className={styles.playBut}>Play</button>
        </div>
        <Dialog 
        open={open}
        onClose={setClickClose}
        PaperProps={{
          component: 'form',
          onSubmit: setSubmit,
        }}
        >
          <DialogTitle> Enter Player Names </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the names of Player 1 and Player 2 here:
            </DialogContentText>
            <TextField 
            autoFocus
            required
            margin="dense"
            id="Player 1"
            name="Name of Player 1"
            label="Name of Player 1"
            type="text"
            fullWidth
            variant="standard"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            />
            <TextField 
            autoFocus
            required
            margin="dense"
            id="Player 2"
            name="Name of Player 2"
            label="Name of Player 2"
            type="text"
            fullWidth
            variant="standard"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={setClickClose}>Go Back</Button>
            <Button type="submit">Enter Game</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Landing_Page
