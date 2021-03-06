import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setUser, log } from '../../slices/history';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {firebaseDb} from '../../plugins/firebase';
const ref = firebaseDb.ref('report');

let intern = [];
ref.child('intern').on('value', (snapshot) => {
  intern = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('intern/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      intern.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});
let application = [];
ref.child('application').on('value', (snapshot) => {
  application = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('application/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      application.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});
let participation = [];
ref.child('participation').on('value', (snapshot) => {
  participation = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('participation/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      participation.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});
let examination = [];
ref.child('examination').on('value', (snapshot) => {
  examination = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('examination/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      examination.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});
let assessment = [];
ref.child('assessment').on('value', (snapshot) => {
  assessment = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('assessment/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      assessment.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});
let offer = [];
ref.child('offer').on('value', (snapshot) => {
  offer = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('offer/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      offer.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});
let training = [];
ref.child('training').on('value', (snapshot) => {
  training = [];
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;

    ref.child('training/' +key).once('value', (parent) => {
      const m = parent.val();
      const count = parent.numChildren();
      training.push({
        'user' : key,
        'name' : m.name,
        'count' : (count-1),
      });
    });
  });
});

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginLeft: 220,
    },
  },
  CS:{
    margin: theme.spacing(-1),
    padding: '10px 15px',
    color: 'primary',
    border: '2px solid',
    borderRadius: 40,
  },
  tl:{
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const BookComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnClickHistory = async (props) => {
    await dispatch(log(props.user, props.page));
    dispatch(setUser({name: props.name, user: props.user}));
    history.push('/home2/book/rHistory?page=' +props.page);
  };

  const Intern = () => {
    try {
      return intern.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:1,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };
  const Application = () => {
    try {
      return application.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:2,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };
  const Participation = () => {
    try {
      return participation.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:3,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };
  const Examination = () => {
    try {
      return examination.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:4,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };
  const Assessment = () => {
    try {
      return assessment.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:5,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };
  const Offer = () => {
    try {
      return offer.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:6,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        );
      });
    } catch(e) {
      console.log(e);
    };
  };
  const Training = () => {
    try {
      return training.map((m,i) => {
        return (
          <div key={i}>
            <List>
              <ListItem
                button onClick={() => handleOnClickHistory({
                  user:m.user,
                  name:m.name,
                  page:7,
                })}
              >
                <ListItemText className={classes.CS}
                  primary={
                    <React.Fragment>
                      {m.name}<br />({m.user})
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      {m.count}件
                    </React.Fragment>
                  }
                />
              </ListItem>
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
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="インターンシップ-Intern"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Intern()}
          </AccordionDetails>
        </Accordion>
        <div />
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="各書類申請書-Application"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Application()}
          </AccordionDetails>
        </Accordion>
        <div />
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="参加報告書-Participation"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Participation()}
          </AccordionDetails>
        </Accordion>
        <div />
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="受験報告書-Examination"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Examination()}
          </AccordionDetails>
        </Accordion>
        <div />
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="自己評価シート-Assessment"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Assessment()}
          </AccordionDetails>
        </Accordion>
        <div />
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="内定報告書-Offer"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Offer()}
          </AccordionDetails>
        </Accordion>
        <div />
        <Accordion className={classes.tl}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              component="span" color="textPrimary" children="内定研修参加報告書-Training"
            />
          </AccordionSummary>
          <AccordionDetails style={{flexWrap: 'wrap'}}>
            {Training()}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default BookComponent;
