import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { approval, setFlag, passHash, logout } from '../../slices/auth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Dialog, DialogTitle, DialogActions, 
  DialogContent, DialogContentText } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import SmsIcon from '@material-ui/icons/Sms';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as Colors from '@material-ui/core/colors';

const drawerWidth = 200;
let counter = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    '& > *': {
      margin: theme.spacing(2),
      width: '35ch',
    },
  },
  appBar: {
    color: Colors.common.white,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -15,
    marginLeft: -15,
  },
  offset: theme.mixins.toolbar,

  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  avatar: {
    margin: 'auto',
  },
}));

const Header2Component = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const profileImage = useSelector(state => state.auth.user.profileImage);
  const userName = useSelector(state => state.auth.user.userName);
  const userId = useSelector(state => state.auth.user.userId);
  const text = userName +"\nID:" +userId;

  const flag = useSelector(state => state.auth.flag);
  const [id, setId] = React.useState('');
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const handleClose = () => {
    setCheck(false);
  };
  const handleClose2 = () => {
    dispatch(setFlag());
  };

  const hash = useSelector(state => state.auth.hashed);
  const submit = async() => {
    setId('');
    const log = await dispatch(approval(id, hash));
    setLoading(false);
    if(log === 0) {
      history.push('/SignUp');
    };
  };
  if(counter === 1) {
    counter = 0;
    submit();
  };

  const handleAgree = () => {
    let txt = "";
    if(id === '') {
      txt = "IDが入力されていません。\n";
    };
    if(values.password === '') {
      txt += "PWが入力されていません。";
    };
    if(txt !== "") {
      alert(txt);
      return;
    };
    setLoading(true);

    dispatch(passHash(values.password));
    setValues({ ...values, password: '' });
    counter = 1;
  };

  const drawer = () => {
    return (
      <div>
        <div className={classes.drawerHeader}>
          <Avatar className={classes.avatar} src={profileImage} />
          <Typography
            component="span"
            color="textPrimary"
          >
            {text.split("\n").map((t, i) => {
              return <div key={i}>{t}</div>
            })}
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => {(history.push('/home2'));setOpen(false);}}>
            <IconButton
              className={classes.button}
              aria-label="home"
            >
              <HomeIcon />
            </IconButton>
            <ListItemText primary={"ホーム"} />
          </ListItem>
          <ListItem button onClick={() => {(history.push('/home2/talk'));setOpen(false);}}>
            <IconButton
              className={classes.button}
              aria-label="sms"
            >
              <SmsIcon />
            </IconButton>
            <ListItemText primary={"トーク"} />
          </ListItem>
          <ListItem button onClick={() => {(history.push('/home2/book'));setOpen(false);}}>
            <IconButton
              className={classes.button}
              aria-label="assignment"
            >
              <AssignmentIcon />
            </IconButton>
            <ListItemText primary={"書類管理"} />
          </ListItem>
          <ListItem button onClick={() => {(history.push('/home2/settings'));setOpen(false);}}>
            <IconButton
              className={classes.button}
              aria-label="settings"
            >
              <SettingsIcon />
            </IconButton>
            <ListItemText primary={"設定"} />
          </ListItem>
          <ListItem button onClick={() => setCheck(true)}>
            <IconButton
              className={classes.button}
              aria-label="settings"
            >
              <PersonAddIcon />
            </IconButton>
            <ListItemText primary={"SignUp"} />
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <div>
      <header>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              align="center" children={props.title}
              variant="h6"
              className={classes.root}
            />

            <IconButton
              edge="end"
              color="inherit"
              aria-label="exit"
              onClick={() => {
                dispatch(logout());
              }}
              className={classes.button}
            >
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            className={classes.drawer} anchor="left" 
            variant="temporary" open={open}
            onClose={() => setOpen(false)}
            classes={{ paper: classes.drawerPaper, }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer()}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.drawerPaper, }}
          >
            {drawer()}
          </Drawer>
        </Hidden>
        <div className={classes.offset} />
      </header>

      <Dialog
      open={check} onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"マスター認証"}</DialogTitle>
        <DialogContent className={classes.root2}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-id">IDを入力</InputLabel>
            <OutlinedInput
              id="outlined-id" value={id}
              onChange={e => setId(e.target.value)}
              labelWidth={70}
            />
          </FormControl>
          <br />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">PWを入力</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password} onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility" onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword} edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <br />
          <Button
            variant="contained" color="primary" disabled={loading}
            onClick={handleAgree}
          >
            認証する
          </Button>
          {loading && <CircularProgress size={32} className={classes.buttonProgress} />}
        </DialogContent>
      </Dialog>

      <Dialog
          open={flag} onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"えらー"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              IDまたはPWが間違っています。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2} color="primary">
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default Header2Component;
