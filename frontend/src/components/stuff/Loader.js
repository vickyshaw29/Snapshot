import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  spinner: {
    width: "50px",
    height: "50px",
    margin: "auto",
    display: "block"
  }
}));

export default function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />

    </div>
  );
}