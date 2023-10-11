import MaterialTable from "material-table";
import { useEffect,useState } from "react";
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List, Clear, Edit,AddBox } from "@mui/icons-material";
import { getData,postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City }  from 'country-state-city';
import Companies from "./Companies";

const useStyles = makeStyles({
    root:
    {
        display:'flex',
        justifyContent:'center',
        alignItem:'center',
    },
    subdivtable:
    {
        
        justifyContent:'center',
        alignItems:'center',
        width:1200,
        marginTop:20,
        padding:10,
        background:'#ecf0f1',
        borderRadius:5
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
    }
})

export default function DisplayAllCompanies(props)
{   
    const classes = useStyles(props)
    const [list,setList]=useState([])
    const [open,setOpen]=useState(false)
    const [company,setCompany]=useState("")
    const [companyId,setCompanyId]=useState("")
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
    const [btnState,setBtnState]=useState(false)
    const [oldPicture,setOldPicture]=useState()
    const fetchAllCompany=async()=>{
        var result=await getData("company/displayallcompany")
        setList(result.data)
    }

    const handleSubmit=async()=>{
        setOpen(false)
        var body={'companyId':companyId, 'companyName':company, 'companyAddress1':companyAddress1, 'companyAddress2':companyAddress2, 'companyCountry':companyCountry, 'companyState':companyState, 'companyCity':companyCity, 'companyPincode':companyPincode, 'contactPerson':contactPerson, 'mobileno':mobileno, 'email':email, 'companyDescription':companyDescription}
        var result=await postData("company/updatecompanydata",body)
        if(result)
        {
            Swal.fire({
                text: 'Company Edited Succesfully',
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
                text: 'Fail to Edit Company Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchAllCompany()
    }

    const handleEditPicture=async()=>{
        setOpen(false)
            var formData=new FormData()
            formData.append('companyId',companyId)
            formData.append('icon',picture.bytes)
    
            var result=await postDataAndImage('company/companyeditpicture',formData)
        if(result)
        {
            Swal.fire({
                text: 'Company Edited Succesfully',
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
                text: 'Fail to Edit Company Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon: 'error'
            })
        }
        fetchAllCompany()
    }

    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnState(true)
    }

    useEffect(function(){
        fetchAllCompany()
    },[])

    const handleClick=()=>{
      //  props.history.push({pathname:'/companies'})
      props.setComponent(<Companies setComponent={props.setComponent}/>)
    }

    const handleClickOpen=(rowData)=>{
        setCompanyId(rowData.companyid)
        setCompany(rowData.companyname)
        setCompanyAddress1(rowData.companyaddress1)
        setCompanyAddress2(rowData.companyaddress2)
        setCompanyCountry(rowData.country)
        setCompanyState(rowData.state)
        setCompanyCity(rowData.city)
        setCompanyPincode(rowData.zipcode)
        setContactPerson(rowData.contactperson)
        setMobileno(rowData.mobileno)
        setEmail(rowData.email)
        setCompanyDescription(rowData.description)
        setOldPicture(rowData.icon)
        setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }

    const handleCancel=()=>{
        setBtnState(false)
        setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    }

    const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
    
          title: `Do you want to Delete ${data.companyname}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("company/deletecompany",{companyid : data.companyid})
            if(result)
            {
              Swal.fire('Record Deleted Sucessfully...')
              fetchAllCompany()
            }
            else
            {
              Swal.fire('Fail to Delete Record...')
            }
    
          } else if (result.isDenied) {
            Swal.fire(`${data.companyname} is Safe`)
          }
        })
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

    const showCompanyForm=()=>{
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <img src="/company logo 2.png" width='25'></img>
                            </div>
                            <div style={{fontSize:16, letterSpacing:1, fontWeight:800,color:'black'}}>
                                &nbsp;Edit Company
                            </div>
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
                                <Button fullWidth variant="contained" component="span">Upload</Button>
                            </label>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            {btnState?<span>
                            <Button onClick={()=>handleEditPicture()}>Save</Button>
                            <Button onClick={()=>handleCancel()}>Cancel</Button>
                            </span>:<></>}
                            <Avatar alt="Pictures" src={picture.filename}></Avatar>
                        </Grid>
    
                        <Grid item xs={6}>
                            <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    const showDialog=()=>{
     return(
        <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {showCompanyForm()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
     )
    }

    return (
        <div className={classes.root}>
            <div className={classes.subdivtable}>
        <MaterialTable
          title={<div style={{width:1000,display:'flex',flexDirection:'row',alignItem:'center'}}>
              <div style={{padding:5}}>
              <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add New Company</Button>
              </div>

              <div style={{marginLeft:220,fontSize:25,fontWeight:700,letterSpacing:1,padding:5}}>
                  List Of Companies
               </div>
          </div>}
          columns={[
            { title: 'Company ID', field: 'companyid' },
            { title: 'Company Name', field: 'companyname' },
            { title: 'Address', render: rowData => <div><div>{rowData.companyaddress1}</div><div>{rowData.companyaddress2}</div></div> },

            { title: 'Country', render : rowData => <div><div>{rowData.city},{State.getStateByCodeAndCountry(rowData.state,rowData.country).name}</div><div>{Country.getCountryByCode(rowData.country).name},{rowData.zipcode}</div></div> },



            { title: 'Contact Person', render : rowData => <div><div>{rowData.contactperson},{rowData.mobileno}</div><div>{rowData.email}</div></div> },

            { title: 'Description', field: 'description' },
            { title: 'Icon', field: 'icon',
              render : rowData => <Avatar
              alt="Company"
              variant="rounded"
              src={`${ServerURL}/images/${rowData.icon}`}
              sx={{ width: 56, height: 56 }}
              />
             },
          ]}
          data={list}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Save User',
              onClick: (event, rowData) => handleClickOpen(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Save User',
                onClick: (event, rowData) => handleDelete(rowData)
            }
          ]}
        />
        {showDialog()}
        </div>
        </div>
      )
}