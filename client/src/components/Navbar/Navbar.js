import React,{useState,useEffect} from "react";
import { AppBar,Typography,Avatar,Toolbar, Button} from "@material-ui/core";
import memories from '../../images/memories.png';
import useStyles from './styles';
import {Link,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'


const Navbar=()=>{
  const classes= useStyles();
  const dispatch=useDispatch(); 
  const history=useNavigate();
  const location=useLocation();
  
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  console.log("navbar",user);

  const logout=()=>{
    dispatch({type:'LOGOUT'});
    history('/');
    setUser(null);
  }

  useEffect(()=>{
    const token=user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);
  
  return(
  <AppBar className={classes.appBar} position="static" color="inherit">
    <div classsName={classes.brandContainer}>
      <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memento</Typography>
      <img className={classes.image} src={memories} alt="icon" height="60" />
    </div>
  <Toolbar className={classes.toolbar}>
    {user ? (
      <div className={classes.profile}>
        <Avatar className={classes.purple} alt={user.name} src={user.imageUrl}>{user.name.charAt(0)}</Avatar>
        <Typography className={classes.userName} variant="h6">{user.name}</Typography>
        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
      </div>
    ):(
      <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
    )}
  </Toolbar>
  </AppBar>
  );

};

export default Navbar;