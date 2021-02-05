import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { initialOneData } from "../../../slices/history";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';

import {firebaseDb} from '../../../plugins/firebase';

let keyIn = 0;
let data = {};

const useStyles = makeStyles((theme) => ({
  root:{
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
  },
  root1:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  check1:{
    color: '#ff0000'
  },
  Rbutton: {
    width: 100,
    height: 50,
    fontWeight: 'bold',
    color: '#FFF',
    background: '#5cca13',
    margin:20,
    '&:hover' :{
      background: '#4eaa10',
    },
  },
  size :{
    width: 320,
    backgroundColor: theme.palette.background.paper,
  },
  size1 :{
    width: 155,
  },
}));

const InternComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.userId);
  const name = useSelector(state => state.auth.user.userName);
  const flagT = useSelector(state => state.auth.flagT);
  const oneData = useSelector(state => state.history.oneData);
  const user = useSelector(state => state.history.user);
  const [flag, setFlag] = React.useState(true);
  // 初期化
  if(flag){
    keyIn = 0;
    let data2 = {};
    data2.company = ""; data2.address = "";
    data2.practice_start = "";  data2.practice_end = "";
    data2.practice = "";  data2.impressions = "";
    data = data2;
    setFlag(false);
  };
  if(oneData !== null) {
    keyIn = 1;
    data = oneData;
    dispatch(initialOneData());
  };
  const [values, setValues] = React.useState({
    company: data.company, address: data.address,
    practice_start: data.practice_start, practice_end: data.practice_end,
    practice: data.practice, impressions: data.impressions, approval: data.approval,
  });
  const [open, setOpen] = React.useState(false);

  const [check1, setCheck1] = React.useState("");
  const [check2, setCheck2] = React.useState("");
  const [check3, setCheck3] = React.useState("");
  const [check4, setCheck4] = React.useState("");
  const [check5, setCheck5] = React.useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

    if(event.target.value.length > 0){
      if(prop === 'company'){
        setCheck1("");
      }
      if(prop === 'address'){
        setCheck2("");
      }
      if(prop === 'practice_start'){
        setCheck3("");
      }
      if(prop === 'practice_end'){
        setCheck3("");
      }
      if(prop === 'practice'){
        setCheck4("");
      }
      if(prop === 'impressions'){
        setCheck5("");
      }
    }
  };

  const handleClickOpen = () => {
    let cnt = 0;

    if(values.company === "") {
      setCheck1("※企業名が入力されていません");
      cnt += 1;
    }
    if(values.address === "") {
      setCheck2("※住所が入力されていません");
      cnt += 1;
    }
    if(values.practice_start === "" || values.practice_end === "") {
      setCheck3("※実習期間が選択されていません");
      cnt += 1;
    }
    if(values.practice === "") {
      setCheck4("※実習内容が入力されていません");
      cnt += 1;
    }
    if(values.impressions === "") {
      setCheck5("※感想が入力されていません");
      cnt += 1;
    }
    
    if(cnt === 0) {
      setOpen(true);
    } 
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formatText1 = () => {
    if(flagT === false) {
      return(
          <div>
            <Button 
            className={classes.Rbutton}
            variant="contained"
            color="primary"
            disabled={values.approval}
            onClick={handleClickOpen}
            >
              提出
            </Button>

            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"提出しますか？"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleOnClickI} color="primary">
                はい
              </Button>
              <Button onClick={handleClose} color="primary">
                いいえ
              </Button>
            </DialogActions>
            </Dialog>
        </div>
      );
    } else {
      return(
        <div>
          <Button 
            className={classes.Rbutton}
            variant="contained"
            color="primary"
            disabled={values.approval}
            onClick={handleClickOpen}
            >
              承認
            </Button>

            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"承認しますか？"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleOnClickI} color="primary">
                はい
              </Button>
              <Button onClick={handleClose} color="primary">
                いいえ
              </Button>
            </DialogActions>
            </Dialog>

        </div>
      );
    };
  };

  const time = new Date().getTime();
  const day = new Date().toLocaleString();
  const today = time * -1;
  today.toLocaleString();

  let approval = false;

  const handleOnClickI = () => {
    let id = userId;

    if(flagT) {
      id = user.user;
      approval = true;
    };
    const Ref = firebaseDb.ref(id +'r/intern');
    const ref = firebaseDb.ref('report/intern/' + id);
    if(keyIn === 0) {
      const DayRef = Ref.child(time);
      DayRef.set({
        "company" : values.company,
        "address" : values.address,
        "practice_start" : values.practice_start,
        "practice_end" : values.practice_end,
        "practice" : values.practice,
        "impressions" : values.impressions,
        "today" : today,
        "day" : day,
        "approval" : approval,
      });
      const dayRef = ref.child(time);
      dayRef.set({"company" : values.company});
      ref.update({"name" : name});
    }
    else {
      keyIn = 0;
      const updateRef = Ref.child(data.key);
      const updRef = ref.child(data.key);
      updateRef.set({
        "company" : values.company,
        "address" : values.address,
        "practice_start" : values.practice_start,
        "practice_end" : values.practice_end,
        "practice" : values.practice,
        "impressions" : values.impressions,
        "today" : today,
        "day" : day,
        "approval" : approval,
      });
      updRef.set({"company" : values.company});
      if(flagT) {
        updateRef.update({"approver" : name});
      };
    };
    if(flagT === true) {
      alert('承認が完了しました。');
      history.push('/home2/book');
    } else {
      alert('提出が完了しました。\n各種書類提出画面へ');
      history.push('/home/select/report');
    }
  };

  return (
    <div className={classes.root}>
      <div className="centerTable">
        <p>企業名</p>
          <Typography className={classes.check1} >{check1}</Typography>
          <TextField
            className={classes.size}
            name='company'
            label="例）株式会社○○" 
            variant="outlined"
            disabled={flagT}
            value={values.company}
            onChange={handleChange('company')}
          />

        <p>住所</p>
          <Typography className={classes.check1} >{check2}</Typography>
          <TextField
            className={classes.size}
            name='address'
            label="住所を入力"
            variant="outlined"
            disabled={flagT}
            value={values.address}
            onChange={handleChange('address')}
          />

        <p>実習期間</p>
          <Typography className={classes.check1} >{check3}</Typography>
          <TextField
            className={classes.size1}
            name='practice_start'
            type="date"
            disabled={flagT}
            value={values.practice_start}
            onChange={handleChange('practice_start')}
          />
          ～
          <TextField
            className={classes.size1}
            name='practice_end'
            type="date"
            disabled={flagT}
            value={values.practice_end}
            onChange={handleChange('practice_end')}
          />

        <p>実習内容</p>
          <Typography className={classes.check1} >{check4}</Typography>
          <TextField
            className={classes.size}
            name='practice'
            label="内容を入力"
            variant="outlined"
            disabled={flagT}
            value={values.practice}
            onChange={handleChange('practice')}
          />
      
        <p>感想</p>
          <Typography className={classes.check1} >{check5}</Typography>
          <TextField
            className={classes.size}
            name='impressions'
            label="感想を入力"
            variant="outlined"
            disabled={flagT} 
            value={values.impressions}
            onChange={handleChange('impressions')}
          />

          <br></br>

          {formatText1()}

      </div>
    </div>
  );
};

export default InternComponent;