import React, {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { postData } from "../FetchNodeServices";
import Swal from "sweetalert2";
import '../bestgoods.css'

const useStyles = makeStyles({
    function:{
        margin:10,
        padding:15,
        width:'100%',
    },
    fnhd:{
        fontWeight:700,
        fontSize:24
    },
    fnsubhd:{
        fontWeight:600,
        fontSize:15
    }
})

export default function UserProfilePersonalInformation(props){
    const classes = useStyles()
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]

    var firstnm = localStorage.getItem('firstname')
    var lastnm = localStorage.getItem('lastname')
    var mobile = localStorage.getItem('mobileno')
    var email = localStorage.getItem('emailid')

    const [firstName, setFirstName] = useState(firstnm)
    const [lastName, setLastName] = useState(lastnm)
    const [getMobileNo, setMobileNo] = useState(mobile)
    const [emailId, setEmailId] = useState(email)
    const [addressStatus, setAddressStatus] = useState({status:false, data:[]})


    /* const checkAddress=async()=>{
        var result=await postData("users/checkuseraddress",{mobileno:userData.mobileno})
        setAddressStatus({status:result.result,data:result.data})
        if(!result.result)
        {
          setMobileNo(userData.mobileno)
          setFirstName(userData.firstname)
          setLastName(userData.lastname)
          setEmailId(userData.emailId)
        }
    }
    useEffect(function(){
        checkAddress()
    },[]) */

    const handleUpdate=async()=>{
        var body = {firstname:firstName, lastname:lastName, emailid:emailId, mobileno:getMobileNo}
        var result = await postData("users/updateuser", body)
        if(result)
        {
            Swal.fire({
                text: 'User Updated Succesfully.',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else
        {
            Swal.fire({
                text: 'User not Updated...!!!',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    return(
        <Grid item xs={12}>
            <Paper className={classes.function}>
                <Grid item xs={12} style={{margin:12}}>
                    <div className={classes.fnhd}>Personal Information</div>
                    <div className={classes.fnsubhd}>You can Update your Details Here</div>
                </Grid>
                <Grid item xs={12} style={{margin:20}}>
                    <TextField onChange={(event)=>setFirstName(event.target.value)} value={firstName} fullWidth variant="outlined" label=" Your First Name" style={{background:'whitesmoke'}}></TextField>
                </Grid>
                <Grid item xs={12} style={{margin:20}}>
                    <TextField onChange={(event)=>setLastName(event.target.value)} value={lastName} fullWidth variant="outlined" label="Your Last Name" style={{background:'whitesmoke'}}></TextField>
                </Grid>
                <Grid item xs={12} style={{margin:20}}>
                    <TextField onChange={(event)=>setEmailId(event.target.value)} value={emailId} fullWidth variant="outlined" label="Your Email Id" style={{background:'whitesmoke'}}></TextField>
                </Grid>
                <Grid item xs={12} style={{margin:20}}>
                    <TextField disabled value={getMobileNo} fullWidth variant="outlined" label="Your Mobile No" style={{background:'whitesmoke'}}></TextField>
                </Grid>
                <Grid item xs={12} style={{margin:20}}>
                    <Button onClick={()=>handleUpdate()} variant="contained" fullWidth style={{background:'#000'}}>UPDATE</Button>
                </Grid>
            </Paper>
        </Grid>
    )
}