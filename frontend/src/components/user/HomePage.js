import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import {
    Button, Grid,
    makeStyles, Paper, IconButton,
    InputAdornment, TextField, Typography, InputBase, useMediaQuery, fade
} from '@material-ui/core'
import { getImage } from '../../actions/user';
import { USER_IMAGE_RESET } from '../../constants/user';
const useStyles = makeStyles(theme => ({
    typoHeader: {
        fontFamily: 'Arizonia',
        fontSize: '3.2rem',
        fontWeight: '600',
        color: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.9rem'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        // padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 200,
    },
    imageName:{
        ...theme.typography.fontF,
        color:theme.palette.secondary.main,
        fontSize:'2rem',
        fontWeight:500
    },
    btn:{
        ...theme.typography.fontF,
        marginRight:'2em',
        fontSize:'1rem',
        fontWeight:400,
        width:145,
        textTransform:'none',
        [theme.breakpoints.down('xs')]:{
            width:70,
            marginRight:16,
            fontSize:'0.8rem'
        }
    }

}))
const HomePage = ({ history }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    const { data } = userFromStorage
    const [Term, setTerm] = React.useState("")
    const image = useSelector(state => state.image)
    const { userImage,success } = image
    useEffect(() => {
        dispatch(getImage(Term))

    }, [Term])
    useEffect(() => {
        if (!userFromStorage.success) {
            history.push('/login')
        }
    }, [])
    console.log(Term)
    const handleClick=(val)=>{
        console.log('running')
        console.log(val)
        setTerm(val)
    }
    
    return (
        <Grid container direction="column" style={{ marginTop: '2.4em' }}>
            <Grid item container md justify="center" style={{ marginTop: '5em' }}>
                <Grid item>
                    <Typography align="center" className={classes.typoHeader}>
                        {`Welcome ${data.user.name} to The SnapShot`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container md justify="center" style={{ marginTop: '2em' }}>
                <Grid item style={{ border: '1px solid grey' }} >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={Term}
                            onChange={e => setTerm(e.target.value)}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid item container justify="center" style={{marginTop:'2em'}}>
                <Grid item  >
                    <Button variant="contained" 
                    className={classes.btn} color="secondary" onClick={()=>handleClick('Mountain')}>Mountain</Button>
                    <Button variant="contained" 
                    className={classes.btn} color="secondary" onClick={()=>handleClick('Beaches')}>Beaches</Button>
                    <Button variant="contained" 
                    className={classes.btn} color="secondary" onClick={()=>handleClick('Birds')}>Birds</Button>
                    <Button variant="contained" 
                    className={classes.btn} color="secondary" onClick={()=>handleClick('Food')}>Food</Button>
                </Grid>
            </Grid>
            <Grid item container md justify="center" style={{marginTop:'2em'}}>
                <Grid item>
                    <Typography className={classes.imageName}>{`${Term} Images`}</Typography>
                </Grid>
            </Grid>
            <Grid item container md sm style={{ marginTop: '2em' }}>
                {userImage&&!userImage.msg? userImage.photos.photo.map(val => (
                    <>
                        <Grid item lg={3} md={3} sm={6}xs={12}>
                            <Card className={classes.root} style={{ width: 'auto', marginTop:10,marginBottom:10,marginLeft:8 }}>
                                <CardMedia
                                    className={classes.media}
                                    image={`https://farm${val.farm}.staticflickr.com/${val.server}/${val.id}_${val.secret}_m.jpg`}
                                    title="Contemplative Reptile"
                                />
                            </Card>
                        </Grid>
                    </>
                )):
                <Grid item container md justify="center" style={{marginTop:'2em'}}>
                <Grid item>
                    <Typography align="center" className={classes.imageName}>No Images Found</Typography>
                    <Typography align="center" variant="h4" color="textPrimary" style={{marginTop:'1.6em'}}>Please Try a different search</Typography>
                </Grid>
            </Grid>
                }
            </Grid>
        </Grid>
    )
}

export default HomePage
