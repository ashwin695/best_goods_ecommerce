import { useEffect,useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List, Edit,AddBox } from "@mui/icons-material";
import { getData,postData,postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import Banners from "./Banners";

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
        width:1000,
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

export default function DisplayAllBanners(props)
{
    const classes = useStyles();
    const [list,setList]=useState([])
    const [open, setOpen] = useState(false);
    const [bannerId,setBannerId]=useState("")
    const [description,setDescription]=useState("")
    const [priority,setPriority]=useState("")
    const [btnState, setBtnState] = useState(false);
    const [bannerImage,setBannerImage]=useState({filename:"/banner avatar.png",bytes:""})
    const [oldBannerImage,setOldBannerImage]=useState('')

    const fetchAllBanner=async()=>{
        var result=await getData("banner/displayallbanner")
        setList(result.data)
    }

    useEffect(function(){
        fetchAllBanner()
    },[])

    const handleClick=()=>{
        // props.history.push({pathname:'/banners'})
        props.setComponent(<Banners setComponent={props.setComponent}/>)
    }

    const handleClickOpen = (rowData) => {
        setBannerId(rowData.bannerid)
        setDescription(rowData.description)
        setPriority(rowData.priority)
        setOldBannerImage(rowData.image)
        setBannerImage({filename:`${ServerURL}/images/${rowData.image}`,bytes:""})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBannerImage=(event)=>{
        setBannerImage({filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]})
          setBtnState(true);
    }

    const handleCancel=()=>{
        setBtnState(false)
        setBannerImage({filename:`${ServerURL}/images/${oldBannerImage}`,bytes:""})
    }

    const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
    
          title: `Do you want to Delete ${data.description}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("banner/deletebanner",{bannerid : data.bannerid})
            if(result)
            {
              Swal.fire('Record Deleted Sucessfully...')
              fetchAllBanner()
            }
            else
            {
              Swal.fire('Fail to Delete Record...')
            }
    
          } else if (result.isDenied) {
            Swal.fire(`${data.description} is Safe`)
          }
        })
    }

    const handleBannerSubmit=async()=>{
        setOpen(false)
        var body={'bannerId':bannerId, 'description':description, 'priority':priority}
        var result=await postData('banner/updatebannerdata',body)
    
        if(result)
        {
            Swal.fire({
                
                text: 'Banner Edited Succesfully',
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
                    
                text: 'Fail to Edit Banner Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllBanner()
    }

    const handleEditBannerImage=async()=>{
        setOpen(false)
        var formData=new FormData()
            formData.append('bannerId', bannerId)
            formData.append('image', bannerImage.bytes)
            
            var result=await postDataAndImage('banner/bannereditimage', formData)
    
        if(result)
            {
            Swal.fire({
                 
                text: 'Banner Edited Succesfully',
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
                    
                    text: 'Fail to Edit Banner Data',
                    imageUrl: '/logo.jpg',
                    imageWidth: 400,
                    imageHeight: 100,
                    imageAlt: 'Custom image',
                    icon:'error'
                })
            }
            fetchAllBanner()
    }

    const showBannerForm=()=>{
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <img src="/banner icon.jpg" width='25'></img>
                            </div>
                            <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                                &nbsp; Edit Banner Interface
                            </div>
                            </Grid>
    
                        <Grid item xs={8}>
                            <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description"></TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={priority} onChange={(event)=>setPriority(event.target.value)} fullWidth variant="outlined" label="Set Priority"></TextField>
                        </Grid>
    
                        <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                                <input onChange={(event)=>handleBannerImage(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                                <Button fullWidth variant="contained" component="span" style={{background:'#000'}}>Upload</Button>
                            </label>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                           {btnState?<span>
                           <Button onClick={()=>handleEditBannerImage()} style={{background:'#000'}}>Save</Button>
                           <Button onClick={()=>handleCancel()} style={{background:'#000'}}>Cancel</Button>
                            </span>:<></>}
                            <Avatar alt="Pictures" src={bannerImage.filename}></Avatar>
                        </Grid>
    
                        <Grid item xs={6}>
                            <Button onClick={()=>handleBannerSubmit()} fullWidth variant="contained" startIcon={<Edit />} style={{background:'#000'}}>Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" style={{background:'#000'}} startIcon={<ClearAll />}>Reset</Button>
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
              {showBannerForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{fontWeight:'bold'}}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        )
      }

    return(
        <div className={classes.root}>
            <div className={classes.subdivtable}>
                <MaterialTable
                  title={<div style={{width:600, display:'flex', flexDirection:'row',alignItems:'center'}}>
                  <div style={{padding:5}}>
                  <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained" style={{background:'#000'}}>Add New Banner</Button>
                  </div>
     
                  <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                     List Of Banners
                  </div>
                  </div>}
                  columns={[
                     { title: 'Banner Id', field: 'bannerid' },
                     { title: 'Description', field: 'description' },
                     { title: 'Priority', field: 'priority' },
                     { title: 'Image', field: 'image',
                     render: rowData =><Avatar
                     alt="Banner"
                     variant="rounded"
                     src={`${ServerURL}/images/${rowData.image}`}
                     sx={{ width: 56, height: 56 }}
                     />
                     },
                    ]}

                    data={list}

                    actions={[
                        {
                          icon: 'edit',
                          tooltip: 'Edit Banner',
                          onClick: (event, rowData) => handleClickOpen(rowData)
                        },
                        {
                          icon: 'delete',
                          tooltip: 'Delete Banner',
                          onClick: (event, rowData) => handleDelete(rowData)
                        }
                    ]}
                />
            </div>
            {showDialog()}
        </div>
    )
}