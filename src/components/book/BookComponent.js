import React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {firebaseDb} from '../../plugins/firebase';
const usersRef = firebaseDb.ref('users');
let ids = [];
usersRef.on('child_added', (snapshot) => {
  const key = snapshot.key;
  const ref = firebaseDb.ref(key +'r');
  ref.once('value', (snapshot2) => {
    const m = snapshot2.val();
    if(m !== null) {
      snapshot2.forEach((childSnapshot) => {
        childSnapshot.forEach((childSnapshot2) => {
          const m2 = childSnapshot2.val();
        });
      });
    };
  });

  if(key.slice(0, 2) !== "00") {
    ids.push({
      'key': key,
    });
  };
});

/*
const applicationRef = firebaseDb.ref('application');
applicationRef.on('child_added', (snapshot) => {
  const key = snapshot.key;
  const childRef = applicationRef.child(key);
  childRef.once('value', parent => {
    parent.numChildren();
  });
});
*/
const participationRef = firebaseDb.ref('participation');
const examinationRef = firebaseDb.ref('examination');
const assessmentRef = firebaseDb.ref('assessment');
const offerRef = firebaseDb.ref('offer');
const trainingRef = firebaseDb.ref('training');
// const updateRef = ref.child(data.key);

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      marginLeft: 90,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const BookComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const data = useSelector(state => state.history.data);

  const handleClickOpen =() => {
      let alert_text = "";
      let cnt = 0;
  };

  const rireki = () => {
    try {
      return data.map((m,i) => {
        return (
          <div key={i}>
            <List className={classes.root}> 
              <ListItemText
                  primary ={
                    <React.Fragment>
                      書類名：{m.className}
                      名前：{m.name}
                    </React.Fragment>
                  }
                  secondary ={
                    <React.Fragment>
                      提出日時：{m.day}
                    </React.Fragment>
                  }
              />
              <Divider variant="inset" component="li" />
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };

  return (
    <div className={classes.root}>
      <div className="centerTable">
        <div>
          {rireki()}
        </div>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            onClick={() => history.push('/home2/book/bConfirm')}
          >
            コンフィルムページ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;
