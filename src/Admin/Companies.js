import React from "react";
import { makeStyles } from '@mui/styles';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List } from "@mui/icons-material";
import { postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City }  from 'country-state-city';
import DisplayAllCompanies from "./DisplayAllCompanies";

const useStyles = makeStyles({
    root:
    {
        display:'flex',
        justifyContent:'center',
        alignItem:'center',
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
        marginBottom:20
    },
    inputstyle:
    {
        display:'none'
    },
    center:
    {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default function Companies(props)
{
    const classes=useStyles(props)
    const [company,setCompany]=useState("")
    const [companyAddress1,setCompanyAddress1]=useState("")
    const [companyAddress2,setCompanyAddress2]=useState("")
    const [companyCountry,setCompanyCountry]=useState("")
    const [companyState,setCompanyState]=useState("")
    const [companyCity,setCompanyCity]=useState("")
    const [companyPincode,setCompanyPincode]=useState("")
    const [contactPerson,setContactPerson]=useState("")
    const [mobileno,setMobileno]=useState("")
    const [email,setEmail]=useState("")
    const [companyDescription,setCompanyDescription]=useState("")
    const [picture,setPicture]=useState({filename:"/company avatar.png",bytes:""})

    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('companyname',company)
        formData.append('companyaddress1',companyAddress1)
        formData.append('companyaddress2',companyAddress2)
        formData.append('country',companyCountry)
        formData.append('state',companyState)
        formData.append('city',companyCity)
        formData.append('zipcode',companyPincode)
        formData.append('contactperson',contactPerson)
        formData.append('mobileno',mobileno)
        formData.append('email',email)
        formData.append('description',companyDescription)
        formData.append('icon',picture.bytes)

        var result=await postDataAndImage('company/companysubmit',formData)
        if(result)
        {
            Swal.fire({
                text: 'Company Added Succesfully',
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
                text: 'Fail to Add Company',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
    }

    const handleClick=()=>{
       // props.history.push({pathname:'/displayallcompanies'})
       props.setComponent(<DisplayAllCompanies setComponent={props.setComponent}/>)
    }

    const fillCountry=()=>{
        return Country.getAllCountries().map((item)=>{
            return <MenuItem value={item.isoCode}>
                {item.name}
            </MenuItem>
        })
    }
    const handleCountry=(event)=>{
        setCompanyCountry(event.target.value)
        fillState()
    }

    const fillState=()=>{
        return State.getStatesOfCountry(companyCountry).map((item)=>{
            return <MenuItem value={item.isoCode}>
                {item.name}
            </MenuItem>
        })
    }
    const handleState=(event)=>{
        setCompanyState(event.target.value)
        fillCity()
    }

    const fillCity=()=>{
        return City.getCitiesOfState(companyCountry,companyState).map((item)=>{
            return <MenuItem value={item.name}>
                {item.name}
            </MenuItem>
        })
    }
    const handleCity=(event)=>{
        setCompanyCity(event.target.value)
    }

    const handleReset=()=>{
        setCompany('')
        setCompanyAddress1('')
        setCompanyAddress2('')
        setCompanyCountry('')
        setCompanyCity('')
        setCompanyState('')
        setContactPerson('')
        setCompanyPincode('')
        setEmail('')
        setMobileno('')
        setCompanyDescription('')
        setPicture({filename:"/company avatar.png",bytes:""})
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <div>
                        <img src="/company logo 2.png" width='25'></img>
                        </div>
                        <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                            &nbsp;Company Interface
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained" style={{background:'#000', marginLeft:'auto'}}>Company List</Button>
                    </Grid>

                    <Grid item xs={12} className={classes.center}>
                        <TextField value={company} onChange={(event)=>setCompany(event.target.value)} fullWidth contained="outlined" label="Company Name"></TextField>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <TextField value={companyAddress1} onChange={(event)=>setCompanyAddress1(event.target.value)} fullWidth contained="outlined" label="Address 1"></TextField>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <TextField value={companyAddress2} onChange={(event)=>setCompanyAddress2(event.target.value)} fullWidth contained="outlined" label="Address 2"></TextField>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={companyCountry}
                             label="Country"
                             onChange={(event)=>handleCountry(event)}
                            >
                            {fillCountry()}
                         </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={companyState}
                             label="State"
                             onChange={(event)=>handleState(event)}
                            >
                            {fillState()}
                         </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">City</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={companyCity}
                             label="City"
                             onChange={(event)=>handleCity(event)}
                            >
                            {fillCity()}
                         </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <TextField value={companyPincode} onChange={(event)=>setCompanyPincode(event.target.value)} fullWidth contained="outlined" label="Pincode"></TextField>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <TextField value={contactPerson} onChange={(event)=>setContactPerson(event.target.value)} fullWidth contained="outlined" label="Contact Person"></TextField>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <TextField value={mobileno} onChange={(event)=>setMobileno(event.target.value)} fullWidth contained="outlined" label="Mobile No."></TextField>
                    </Grid>

                    <Grid item xs={8} className={classes.center}>
                        <TextField value={email} onChange={(event)=>setEmail(event.target.value)} fullWidth contained="outlined" label="Email"></TextField>
                    </Grid>

                    <Grid item xs={12} className={classes.center}>
                        <TextField value={companyDescription} onChange={(event)=>setCompanyDescription(event.target.value)} fullWidth contained="outlined" label="Description"></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                            <Button fullWidth variant="contained" component="span" style={{background:'#000'}}>Upload</Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Pictures" src={picture.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleSubmit()} fullWidth variant="contained" style={{background:'#000'}} startIcon={<Save />}>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleReset()} fullWidth variant="contained" style={{background:'#000'}} startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}