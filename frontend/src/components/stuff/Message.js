import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(0),
    },
    marginBottom:'10px',
  },
}));

const Message = ({variant,severity,children}) => {
    const classes=useStyles()
    return (
        <div className={classes.root}>
           <Alert variant={variant} severity={severity} >
               {children}
           </Alert>

        </div>
    )
}
Message.defaultProps={
    variant:'info'
}
export default Message
