import { Button, InputAdornment, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React,{useState,useEffect} from "react"
import SendIcon from '@mui/icons-material/Send';
import Footer from './Footer';
import Header from './Header';
import { postData } from '../FetchNodeServices';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    root:
    {
        display:'flex',
        //justifyContent:'center',
        alignItem:'center',
        background:'#ecf0f1',
        padding:25,
        flexDirection:'column',
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
        borderRadius:5,
    },
})

export default function SignIn(props)
{   var dispatch = useDispatch()

    const classes = useStyles()
    const [mobileno,setMobileNo] = useState('')
    const [visible,setVisible] = useState(false)
    const [generatedOtp,setGeneratedOtp] = useState('')
    const [inputOtp,setInputOtp] = useState('')
    const [userData,setUserData] = useState([])
    //const [token, setToken] = useState('')
    //console.log("token", token)

    const callOTPServer=async(msg,otp)=>{
        var result=await postData('smsapi/sendotp', {mobileno:mobileno, otp:otp})
    }

    const otpGenerator=()=>{
        var v=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        var otp=""
        for(var i=1; i<=4; i++)
        { otp+=v[parseInt(Math.random()*9)] }
        return otp
    }
    

    const handleCheckUser=async()=>{
        var result=await postData('users/checkuserbymobilenumber', {mobileno:mobileno})
        if(result.result)
        {
            setVisible(true)
            var otp=otpGenerator()
            alert(otp)
            setGeneratedOtp(otp)
            setUserData(result.data)
            //callOTPServer(mobileno, otp)
        }
        else
        {
            alert(otp)
            setGeneratedOtp(otp)
            //callOTPServer(mobileno, otp)
            props.history.push({pathname:"/signup"}, {mobileno:mobileno, otp:otp})
        }
    }

    const handleCheckOtp=()=>{
        if(generatedOtp===inputOtp)
        {
            dispatch({type:"ADD_USER", payload:[mobileno,userData]})
            //props.history.push({pathname:"/mycart"})
            props.history.push({pathname:"/ordersummary"})
            localStorage.setItem('firstname', userData.firstname)
            localStorage.setItem('lastname', userData.lastname)
            localStorage.setItem('emailid', userData.emailid)
            localStorage.setItem('mobileno', userData.mobileno)
            //localStorage.setItem('USER', Object.values(userData))
        }
        else
        {
            alert("InCorrect")
        }
    }

    useEffect(function(){
        window.scrollTo(0,0)
    },[])

    return(
        <>
        <div className={classes.root}>
            <Header history={props.history}/>
            <div style={{ width:1450, height:'auto', padding:15, display:'flex', flexDirection:'row',  background:'#FFF',}}>
                <div>
                <img src='/signin.jpg' width='950'  style={{ borderRadius:10, }}></img>
                </div>
                <div style={{ display:'flex', alignItems:'center', flexDirection:'column', marginLeft:20, border:'1px solid #000', borderRadius:5, width:470, height:'auto', }}>
                    <div style={{display:'flex', justifyContent:'center', marginTop:15}}>
                    <img src='/signinlogo.jpg' width="70"></img>
                    </div>
                    <div style={{fontSize:30, fontWeight:'bold', marginTop:5,}}>Sign in</div>
                    <div style={{fontSize:14,}}>Sign in to access your Orders, Offers and Wishlist</div>
                    <br></br>
                    <div>
                        <TextField 
                            style={{width:410}} 
                            variant="outlined"
                            value={mobileno} 
                            label="Enter Your Mobile No."
                            id="input-with-icon-textfield"
                            onChange={(event)=>setMobileNo(event.target.value)}
                            InputProps={{
                                startAdornment:(<InputAdornment position="start">+91 |</InputAdornment>),
                                endAdornment:(<InputAdornment  position="end">
                                    <span onClick={()=>setMobileNo('')} style={{fontSize:12, color:'red', cursor:'pointer'}}>Change</span>
                                </InputAdornment>),
                            }}
                        >
                        </TextField>
                    </div>
                    <br></br>
                    <div>
                        <Button onClick={handleCheckUser} fullWidth style={{backgroundColor:'#000', width:410}} variant='contained' endIcon={<SendIcon />}>Send</Button>
                    </div>

                    {visible ? <>
                    <TextField  
                        fullWidth 
                        variant="outlined" 
                        label="Enter OTP" 
                        onChange={(event)=>setInputOtp(event.target.value)}
                        style={{ marginTop:30, width:410}}>
                    </TextField>
                    <div style={{fontSize:11, color:'red', display:'flex', flexDirection:'row', marginLeft:350, cursor:'pointer'}}>Resend OTP</div>
                    <Button  
                        fullWidth 
                        style={{backgroundColor:'#000', width:410, marginTop:10, }} 
                        onClick={()=>handleCheckOtp()}
                        variant='contained'>
                            Verify
                    </Button>
                    </> : <></>}

                    <div style={{marginTop:30, display:'flex', justifyContent:'center'}}>
                    <span style={{fontSize:13, color:'#000'}}>By continuing you agree to our&nbsp;</span>
                    <span style={{fontSize:13, color:'red', cursor:'pointer'}}>Terms of service</span>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', marginBottom:15}}>
                    <span style={{fontSize:13, color:'#000'}}>and&nbsp;</span>
                    <span style={{fontSize:13, color:'red', cursor:'pointer'}}>Privacy & Legal Policy.</span>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}