import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React,{useState} from "react"
import { PersonAdd, Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Footer1 from "./Footer"
import Header from './Header';
import { postData } from "../FetchNodeServices"

const useStyles = makeStyles({
    root:
    {
        display:'flex',
        //justifyContent:'center',
        alignItem:'center',
        background:'#ecf0f1',
        padding:10,
        flexDirection:'column'
    },
    subdiv:
    {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:600,
        marginTop:20,
        padding:15,
        background:'#ecf0f1',
        borderRadius:5
    },
    margin:{
        marginLeft:30,
    },
})

export default function SignUp(props)
{
    const classes = useStyles(props)
    var otp = props
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [mobileno,setMobileNo] = useState(''+props.history.location.state.mobileno)
    const [emailid,setEmailid] = useState('')
    const [generatedOtp,setGeneratedOtp] = useState('')
    const [inputOtp,setInputOtp] = useState('')
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [confirmValues, setConfirmValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    console.log(otp)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleConfirmChange = (prop) => (event) => {
        setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    };
    
    const handleClickShowConfirmPassword = () => {
        setConfirmValues({
          ...confirmValues,
          showPassword: !confirmValues.showPassword,
        });
    };
    
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit=async()=>{
        if(confirmValues.password===values.password)
        {
            if(generatedOtp===inputOtp)
            {
                var body={mobileno:mobileno, emailid:emailid, firstname:firstName, lastname:lastName, password:values.password}
                var result=await postData("users/insertintouser",body)
                props.history.push({pathname:"/signin"})
            }
            else
            {
                alert("OTP not entered correctly..!!")
            }
        }
        else
        {
            alert("Password/Confirm Password Not Matched...")
        }
    }

    return(
        <>
        <div className={classes.root}>
            <Header history={props.history}/>
            <div style={{ width:1475, padding:15, display:'flex', flexDirection:'row', alignItems:'center', background:'#FFF',}}>
                <div>
                    <img src="/signup.jpg" width="950" style={{borderRadius:10}}></img>
                </div>

                <div style={{display:'flex', flexDirection:'column', marginLeft:10, border:'1px solid #000', borderRadius:5, width:500, height:580}}>
                    <div className={classes.margin} style={{display:'flex', flexDirection:'row',}}>
                    <div>
                        <div style={{marginTop:20, fontSize:30, fontWeight:'bold'}}>
                        Sign Up
                        </div>
                        <div style={{color:'#7f8c8d', fontSize:14, fontWeight:'bold'}}>Please enter your details</div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginLeft:230, marginTop:20, border:'3px solid', borderRadius:50, height:55, width:55}}>
                        <PersonAdd style={{fontSize:40}} />
                    </div>
                    </div>
                    <hr className={classes.margin} style={{background:'#ecf0f1', width:455, height:2, border:'none'}}></hr>
                    <div className={classes.margin} style={{marginTop:5}}>
                    <TextField onChange={(event)=>setFirstName(event.target.value)} variant="outlined" label="Your First Name"></TextField>
                    <TextField onChange={(event)=>setLastName(event.target.value)} style={{marginLeft:10}} variant="outlined" label="Your Last Name"></TextField>
                    <TextField onChange={(event)=>setEmailid(event.target.value)} style={{marginTop:15, width:455}} variant="outlined" label="Your Email Id"></TextField>

                    <FormControl sx={{ m: 0, width: '26ch', marginTop:2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                     type={values.showPassword ? 'text' : 'password'}
                     value={values.password}
                     onChange={handleChange('password')}
                     endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  </InputAdornment>
                }
                   label="Password"
               />
                  </FormControl>

                          <FormControl sx={{ m: 1, width: '26ch', marginTop:2 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                           <OutlinedInput
                         id="outlined-adornment-password"
                        type={confirmValues.showPassword ? 'text' : 'password'}
                         value={confirmValues.password}
                           onChange={handleConfirmChange('password')}
                          endAdornment={
                         <InputAdornment position="end">
                        <IconButton
                       aria-label="toggle password visibility"
                       onClick={handleClickShowConfirmPassword}
                       onMouseDown={handleMouseDownConfirmPassword}
                       edge="end"
                     >
                        {confirmValues.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                     </InputAdornment>
                   }
                      label="ConfirmPassword"
                   />
                      </FormControl>

                    <div style={{fontSize:11}}>Use 8 or more characters with a mix of letters & numbers</div>

                    <div style={{fontWeight:'bold', fontSize:20, marginTop:10}}>Verify</div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                    <div style={{fontSize:11}}>We have sent 4 digit OTP on <b>+91{mobileno}</b></div>
                    <span onClick={()=>props.history.push({pathname:"/signin"})} style={{width:60, fontSize:11,color:'red', marginLeft:'auto', cursor:'pointer' }}>Change</span>
                    </div>
                    <TextField style={{marginTop:15, width:455}} variant="outlined" label="Enter OTP"></TextField>
                    <div style={{fontSize:11, color:'red', display:'flex', flexDirection:'row', marginLeft:390}}>Resend OTP</div>

                    <Button onClick={handleSubmit} fullWidth style={{backgroundColor:'#000', width:455, marginTop:10}} variant='contained'>Verify</Button>

                    <div style={{marginTop:10, display:'flex', justifyContent:'center'}}>
                    <span style={{fontSize:13, color:'#000'}}>By continuing you agree to our&nbsp;</span>
                    <span style={{fontSize:13, color:'red', cursor:'pointer'}}>Terms of service</span>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                    <span style={{fontSize:13, color:'#000'}}>and&nbsp;</span>
                    <span style={{fontSize:13, color:'red', cursor:'pointer'}}>Privacy & Legal Policy.</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer1 />
        </>
    )
}