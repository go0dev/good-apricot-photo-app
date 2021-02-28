import { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

type Props = {
  handleLogin: (userName: string) => Promise<void>;
};

const Login: FC<Props> = ({ handleLogin }) => {
  const [userName, setUserName] = useState('');
  console.log(handleLogin);

  const handleClick = async () => {
    await handleLogin(userName);
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
