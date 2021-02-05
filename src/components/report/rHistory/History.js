import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setOneData } from "../../../slices/history";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import DescriptionIcon from '@material-ui/icons/Description';
import { green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

const HistoryComponent = (prop) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(state => state.history.data);
  const user = useSelector(state => state.history.user);
  const flagT = useSelector(state => state.auth.flagT);

  const handleOnClickList = (props) => {
    dispatch(setOneData(props));
    if(flagT) {
      history.push('/home2/book/rSetDocument?page=' +prop.targetPage);
    }
    else {
      history.push('/home/select/report/rSetDocument?page=' +prop.targetPage);
    };
  };

  const msgs = () => {
    try {
      return data.map((m, i) => {        
        const checkApproval = () => {  
          if(m.approval){
            return(
              <div>
                <ListItemIcon>
                  <CheckCircleOutlineIcon style={{ color: green[500] }} fontSize="large" />
                </ListItemIcon>
              </div>
            );
          };
        };
        
        return (
          <div key={i}>
            <List className={classes.root}>
              <ListItem button onClick={() => handleOnClickList(m)}>
                <ListItemIcon>
                  <DescriptionIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <React.Fragment>
                      企業名：{m.company}
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      提出日時：{m.day}
                    </React.Fragment>
                  }
                />
                
                {checkApproval()}
              
                <Button variant="contained" color="primary" children="確認" />
              </ListItem>
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
          <h2>{user.name}／提出履歴</h2>
          {msgs()}
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;
