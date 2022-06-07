import React,{useState} from 'react'
import {Avatar, Button , Paper, Grid, Typography, Container}
from '@material-ui/core'
import Input from './Input'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'


const Auth = () => {
  const classes= useStyles();
  const isSignup=false;
  const [showPassword, setShowPassword]=useState(false);

  //passing as prop
  const handleShowPassword=()=>
  setShowPassword((prevShowPassword)=>!prevShowPassword);

  const handleSubmit=()=>{

  }
  const handleChange=()=>{

  }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">
                {isSignup?'Sign Up':'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup &&(
                            <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <Input name="firstName" label="First Name" handleChange={handleChange} half/>

                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} 
                    handleShowPassword={handleShowPassword}/>
                {isSignup && <Input name="confirmPassword" label="Repeat Paswword" handleChange={handleChange} type="password"/>}
                </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" 
            className={classes.submit}>
                {isSignup? 'Sign Up':'Sign In'}
            </Button>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;