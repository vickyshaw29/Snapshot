import {
    Button, Grid,
    makeStyles, Paper, IconButton,
    InputAdornment, TextField, Typography, useMediaQuery
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Loader from '../stuff/Loader'
import { loginUser } from '../../actions/user';
const useStyles = makeStyles(theme => ({
    paperContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    paper: {
        // height: 'calc(100vh - 8rem)',
        height:'100vh',
        display: 'flex'
        , flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        //   to see
        [theme.breakpoints.down('xs')]:{
            padding:0
        } 
    },
    avatar: {
        backgroundColor: theme.palette.common.green
    },
    TextField: {
        ...theme.typography.textField,
        ['& fieldset']:{
            borderRadius:8
        }
    },
    logintxt: {
        ...theme.typography.logintxt,
    },
    loginlink: {
        fontWeight: 'bold',
        // textDecoration: 'none',
        color: theme.palette.secondary.main,
    },
    loginButton: {
        ...theme.typography.submitBtn,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    forgotLink: {
        ...theme.typography.fontF,
        fontWeight: 300,
        fontSize: '0.9em',
        color: '#4B4B4B',
        textTransform: 'none',
        textDecoration: 'none'
    },
    capsLock: {
        ...theme.typography.fontF,
        fontWeight: 400,
        fontSize: '0.9em',
        color: '#EB1F1F'
    },
    mainContainer: {
        minHeight: 'calc(100vh-7.5rem)',
        position: 'relative',
    },
    formWrapper:{
        // paddingLeft: '20em',
        // paddingRight:'20rem',
        [theme.breakpoints.down('sm')]:{
            padding:'inherit'
        }
    }
}))
const Login = ({ history }) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [message, setmessage] = useState('')
    const [warning, setwarning] = useState(false)
    const classes = useStyles()

    const matches = useMediaQuery('(max-width:340px)');
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, success, userInfo, error } = userLogin
    useEffect(() => {
        if (success === true) {
            history.push('/homepage')
        }else{
            history.push('/login')
        }
    }, [userInfo, history])

    const handleloginSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const detectCaps = (event) => {
        if (event.getModifierState("CapsLock")) {
            setwarning(true)
        } else {
            setwarning(false)
        }
    }
    
    return (
        <>
            <Grid container spacing={0} justify="center">
                <Grid item>
                <Paper square={true} variant="elevation" elevation={0} className={classes.paper} style={matches ? { height: '82vh' } : {}}>
                    {loading ? <Loader /> : null}
                        <Grid  container direction="column" justify="center" alignItems="center" className={classes.formWrapper}>
                            {error ? <Message variant="filled" severity="warning">{error}</Message> : ""}
                            {message ? <Message variant="filled" severity="success">{message}</Message> : ""}
                            {/* <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar> */}
                            <Typography variant='h4' className={classes.logintxt}>Login</Typography>

                            <form onSubmit={handleloginSubmit} className={classes.form}>
                                <TextField label='Email'
                                    variant='outlined'
                                    size='small'
                                    type='email'
                                    name="email"
                                    onChange={(e) => { setemail(e.target.value); setmessage('') }}
                                    className={classes.TextField}
                                    error={error && email === ""}
                                    helperText={error && email === "" ? 'Enter your email' : ' '}
                                    autoFocus={true}
                                    inputProps={{ style: {WebkitBoxShadow: "0 0 0 1000px white inset"} }}
                                    fullWidth />
                                <TextField label='Password'
                                    variant="outlined"
                                    size="small"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => { setpassword(e.target.value); setmessage('') }}
                                    onKeyDown={(e) => detectCaps(e)}
                                    className={classes.TextField}
                                    error={error && password.length < 6}
                                    helperText={error && password.length < 6 ? "Password must be at least 6 characters long" : ' '}
                                    fullWidth
                                    inputProps={{ style: {WebkitBoxShadow: "0 0 0 1000px white inset"} }}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility color="primary" fontSize="small"/> : <VisibilityOff fontSize="small" color="primary" />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Grid container>
                                    <Grid item lg={6} sm={6} xs={6}><Typography className={classes.capsLock} variant="subtitle2">
                                        {warning ? 'WARNING: CAPS Lock is on.' : ""}
                                    </Typography></Grid>
                                    <Grid item lg={6} sm={6} xs={6}>
                                        <Grid align="end">
                                            <Typography variant='subtitle2' style={{ marginBottom: '1.5rem' }}>
                                                {/* <Link to='/forgotpass' className={classes.forgotLink}>Forgot Password ?</Link> */}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Button type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.loginButton}
                                    fullWidth>Login</Button>
                                <Grid align='center' style={{ marginTop: 16 }}>
                                    <Typography variant='subtitle2'>
                                        Dont have an account ? <Link to='/' className={classes.loginlink}>Register</Link>
                                    </Typography>
                                </Grid>
                            </form>
                        </Grid>
                    </Paper>

                </Grid>
            </Grid>
        </>
    )
}

export default Login
