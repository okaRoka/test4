import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { Dialog, DialogTitle, DialogActions, 
  DialogContent, DialogContentText } from '@material-ui/core';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';

import {firebaseDb} from '../../plugins/firebase';
let view = '';
let data = "";

const HomeMessage = (props) => {
  const flagT = useSelector(state => state.auth.flagT);
  if(flagT) {
    view = '';
  }
  else {
    view = 'none';
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
    },
    TL:{
      wordBreak: 'break-all',
    },
    tl:{
      width: '100%',
      marginBottom: theme.spacing(-2),
    },
    button: {
      right: 10,
      bottom: 0,
      position: 'absolute',
      display: view,
    },
  }));
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleOnClick = (props) => {
    data = props;
    setOpen(true);
  };

  const handleDelete = () => {
    const ref = firebaseDb.ref('less/' +data.home.key);
    ref.remove();
    setOpen(false);
    history.replace('/home2');
  };

  const formatText = () => {
    return props.teachers.map((m, i) => {
      if(props.home.id === m.key) {
        return (
          <div key={i}>
            <ListItem alignItems="flex-start">
              <Accordion className={classes.tl}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItemAvatar>
                    <Avatar className="" src={m.profileImage} />
                  </ListItemAvatar>
                  <ListItemText className={classes.TL}
                    primary={
                      <React.Fragment>
                        {m.userName}「{props.home.title}」
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        {props.home.day}
                      </React.Fragment>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <ListItemText className={classes.TL}
                    primary={
                      <React.Fragment>
                        {(props.home.less).split("\n").map((t, i) => {
                          return <div key={i}>{t}</div>
                        })}
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <IconButton
                          className={classes.button} aria-label="cancel" color="primary"
                          onClick={() => handleOnClick({home: props.home, name: m.userName})}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </React.Fragment>
                    }
                  />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          </div>
        );
      }
      else {
        return (<div key={i} />);
      };
    });
  };

  const itemsDialog = () => {
    if(data !== "") {
      return (
        <div>
          {data.name}「{data.home.title}」
          <br />
          {data.home.day}
          {(data.home.less).split("\n").map((t, i) => {
            return <div key={i}>{t}</div>
          })}
        </div>
      );
    };
  };
  
  return (
    <div className={classes.root}>
      <div className="centerTable">
        <List>
          {formatText()}
        </List>

        <Dialog
          open={open} onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"TL削除"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              className={classes.TL} 
              id="alert-dialog-description"
            >
              {itemsDialog()}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color="primary">
              削除する
            </Button>
            <Button onClick={() => setOpen(false)} color="primary">
              キャンセル
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default HomeMessage;
