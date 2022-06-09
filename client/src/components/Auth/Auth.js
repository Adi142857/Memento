import React,{useState} from 'react'
import {Avatar, Button , Paper, Grid, Typography, Container}
from '@material-ui/core'
import Input from './Input'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import {GoogleLogin} from 'react-google-login'
import  Icon  from './icon'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {signin,signup} from '../../actions/auth';

const initialState={firstName: '', lastName:'', email:'', password:'',confirmPassword:''};

const Auth = () => {
  const classes= useStyles();
  const [isSignup, setIsSignup]= useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword]=useState(false);
  const dispatch=useDispatch();
  const history=useNavigate();
  



  //passing as prop
  const handleShowPassword=()=>
  setShowPassword((prevShowPassword)=>!prevShowPassword);
  
  const handleSubmit=(e)=>{
      e.preventDefault();

      if(isSignup){
       dispatch(signup(formData,history))
      }else{
       dispatch(signin(formData,history))
      }
      console.log(formData);
  }

  const handleChange=(e)=>{
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  const googleSuccess=async(res)=>{
      const result=res?.profileObj;
      const token=res?.tokenId;

      try{
          dispatch({type:'AUTH',data:{result,token}});
          history.push('/');
      }catch(error){
          console.log(error);
      }
  };

  const googleFailure=(error)=>{
      console.log(error);
      console.log('Google sign In unsuccesful');
  }

  const switchMode=()=>{
      setIsSignup((prevIsSignup)=>!prevIsSignup);
      setShowPassword(false);
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
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half/>

                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                {isSignup && <Input name="confirmPassword" label="Retype Password" handleChange={handleChange} type="password"/>}
                </Grid>

            
            <Button type="submit" fullWidth variant="contained" color="primary" 
            className={classes.submit}>
                {isSignup? 'Sign Up':'Sign In'}
            </Button>

            <GoogleLogin
              clientId='701626899548-uhj9kn2afrc6615ji4p4htrcpemfpq1r.apps.googleusercontent.com'
              render={(renderProps)=>(
                  <Button 
                  className={classes.googleButton} 
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled} 
                  startIcon={<Icon/>}
                  variant="contained">
                Google Sign In
              </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            {/* <Button onClick={SignInWithGoogle}>Sign in with google</Button> */}
            <Grid container justify="flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                        {isSignup?'Already have an account? Sign In':"Don't have an account? Sign Up" }
                    </Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;