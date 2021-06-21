import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid, IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    TextField,
    Typography,
    useMediaQuery
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { registerUser } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message';
import Loader from '../stuff/Loader';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const useStyles = makeStyles(theme => ({
    paper: {
        // height: 'calc(100vh - 8rem)',
       height:'100vh',

        display: 'flex'
        , flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        //   to see
        [theme.breakpoints.down('xs')]: {
            height: '75vh',
            padding: 0
        }
    },
    avatar: {
        backgroundColor: theme.palette.common.green
    },
    TextField: {
        ...theme.typography.textField,
        ['& fieldset']: {
            borderRadius: 8
        }
    },
    loginText: {
        ...theme.typography.logintxt,
    },
    loginlink: {
        fontWeight: 'bold',
        // textDecoration: 'none',
        color: theme.palette.secondary.main,
    },
    privacyLink: {
        // textDecoration: 'none',
        ...theme.typography.fontF,
        fontWeight: 400,
        fontWeight: 'normal',
        color: theme.palette.primary.main,
    },
    checkboxTxt: {
        ...theme.typography.fontF,
        fontSize: '0.9em',
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.9em'
        }
    },
    registerBtn: {
        ...theme.typography.submitBtn,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    formWrapper: {
        paddingLeft: '20em',
        paddingRight:'20rem',
        [theme.breakpoints.down('sm')]:{
            padding:'inherit'
        }
    }
}))
const Register = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [checkbox, setcheckbox] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [flag, setflag] = useState(false)
    const matches = useMediaQuery('(max-width:340px)');
    var [upper, setupper] = useState(0)
    var [lower, setlower] = useState(0)
    var [number, setnumber] = useState(0)
    var [special, setspecial] = useState(0)

    const classes = useStyles()
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, success } = userRegister

    const handleSubmit = async (e) => {
        e.preventDefault()
        setflag(true)
        if (password.length > 6 && lower !== 0 && upper !== 0 && special !== 0) {
            setflag(false)
            dispatch(registerUser({ name,email,password}))
        }
    }
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        setName('')
        setemail('')
        setpassword('')
        if (success === true) {
            history.push('/login')
        }
    }, [success, history])
    // var upper = 0,
    //         lower = 0,
    //         number = 0,
    //         special = 0;
    useEffect(() => {
        function Count(password) {
            for (var i = 0; i < password.length; i++) {
                if (password[i] >= "A" && password[i] <= "Z") {
                    setupper(upper + 1)
                }
                else {
                    setupper(upper)
                }
                if (password[i] >= "a" && password[i] <= "z") {
                    setlower(lower + 1)
                } else {
                    setlower(lower)
                }
                if (password[i] >= "0" && password[i] <= "9") {
                    setnumber(number + 1)
                }
                else {
                    setnumber(number)
                }
                if (!(password[i] >= "A" && password[i] <= "Z") &&
                    (!(password[i] >= "a" && password[i] <= "z") &&
                        (!(password[i] >= "0" && password[i] <= "9"))
                    )
                ) {
                    setspecial(special + 1)
                } else {
                    setspecial(special)
                }
            }
        }
        Count(password)
    }, [password])
    const isValid = () => {
        if (password.length === 0 && lower === 0 && upper === 0 && special === 0) {
            return false
        }
        return true
    }
    return (
        <>
            <Grid container spacing={0}>
               
                <Grid item >
                    <Paper square={true} variant="elevation" elevation={0} className={classes.paper} style={matches ? { height: '82vh' } : {}}>
                        {loading ? <Loader /> : ""}
                        <Grid container justify="center" className={classes.formWrapper}>
                            {error ? <Message variant="filled" severity="warning">{error}</Message> : ""}

                            <Typography variant='h4' className={classes.loginText}>Register</Typography>
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <TextField label='Name'
                                    variant="outlined"
                                    name='first_name'
                                    size="small"
                                    autoFocus={true}
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    className={classes.TextField}
                                    error={flag === true && name=== ""}
                                    helperText={flag === true && name === "" ? 'Enter your first name' : ' '}
                                    fullWidth 
                                    inputProps={{ style: {WebkitBoxShadow: "0 0 0 1000px white inset"} }}
                                    />
                               
                                <TextField label='Email'
                                    variant="outlined"
                                    name="email"
                                    size="small"
                                    type='email'
                                    value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                    className={classes.TextField}
                                    error={flag === true && email === ""}
                                    helperText={flag === true && email === "" ? 'Enter your email' : ' '}
                                    fullWidth 
                                    inputProps={{ style: {WebkitBoxShadow: "0 0 0 1000px white inset"} }}
                                    />
                                <TextField label='Password'
                                    variant="outlined"
                                    name="password"
                                    size="small"
                                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                    value={password}
                                    onChange={(e) => { setpassword(e.target.value) }}
                                    className={classes.TextField}
                                    inputProps={{ style: {WebkitBoxShadow: "0 0 0 1000px white inset"} }}
                                    error={
                                        flag === true
                                    }

                                    helperText={flag === true &&
                                        <>
                                            <Grid container >
                                                <Grid item lg={10.5} md={10} sm={10} xs={9}>
                                                    <Grid container>
                                                        <Grid item lg={6}
                                                            style={password.length <= 8 ? { color: '#4B4B4B', opacity: 0.5 } : { color: '#4B4B4B', opacity: 1 }}
                                                        ><li>8 Characters Minimum</li></Grid>
                                                        <Grid item lg={6}
                                                            style={lower === 0 ? { color: '#4B4B4B', opacity: 0.5 } : { color: '#4B4B4B', opacity: 1 }}
                                                        ><li>Lower Case Characters</li></Grid>
                                                        <Grid item lg={6}
                                                            style={upper === 0 ? { color: '#4B4B4B', opacity: 0.5 } : { color: '#4B4B4B', opacity: 1 }}
                                                        ><li>Upper Case Characters</li></Grid>
                                                        <Grid item lg={6}
                                                            style={special === 0 ? { color: '#4B4B4B', opacity: 0.5 } : { color: '#4B4B4B', opacity: 1 }}
                                                        ><li>1 Special Case Character</li></Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item lg={1.5} md={2} sm={2} xs={3} >
                                                    <Grid container>
                                                        <Grid item>
                                                            {console.log(lower, upper, special, 'gth')}
                                                            {
                                                                password.length === 0 ? <strong
                                                                    style={{ color: 'red' }}
                                                                >WEAK</strong> :
                                                                    password.length > 6 && lower > 0 && upper > 0 && special > 0 ? <strong style={{ color: '#0FAA0E' }}>STRONG</strong> :
                                                                        lower > 0 ? <strong style={{ color: '#EB1F1F' }}>WEAK</strong> :
                                                                            upper > 0 ? <strong>OKAY</strong> :
                                                                                special > 0 ? <strong style={{ color: '#A3BC68;' }}>GOOD</strong> :
                                                                                    ""
                                                            }
                                                        </Grid>
                                                        <Grid item> <ErrorOutlineIcon fontSize="small" style={{ color: 'grey' }} /></Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </>
                                    }
                                    fullWidth
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility color="primary" /> : <VisibilityOff color="primary" />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="check"
                                            color="secondary"
                                            onClick={() => { setcheckbox(!checkbox) }}
                                        />
                                    }
                                    label={<p className={classes.checkboxTxt}>I have read and agree to the terms of the <Link
                                        className={classes.privacyLink}
                                    > Privacy Policy</Link></p>}
                                />
                                <Button type="submit"
                                    variant="contained"
                                    className={classes.registerBtn}
                                    fullWidth>Register</Button>
                                <Grid align='center'>
                                    <Typography variant='subtitle2' style={{ marginTop: 16 }}>
                                        Already have an account ? <Link to='/login' className={classes.loginlink}>login</Link>
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

export default Register
