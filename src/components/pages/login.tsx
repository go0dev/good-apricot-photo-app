import { FC, useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AuthContext from 'contexts/auth';

const Login: FC = () => {
  const [userName, setUserName] = useState('');
  const { signUp } = useContext(AuthContext);

  const handleClick = async () => {
    console.log('signUp');
    await signUp(userName);
  };

  return (
    <Dialog open aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          onChange={(e) => setUserName(e.target?.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
