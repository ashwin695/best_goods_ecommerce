import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List } from "@mui/icons-material";
import { postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";
import DisplayAllBanners from "./DisplayAllBanners";

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
    }
})

export default function Banners(props)
{
    const classes = useStyles();
    const [description,setDescription]=useState("")
    const [priority,setPriority]=useState("")
    const [bannerImage,setBannerImage]=useState({filename:"/banner avatar.png",bytes:""})
    const handleBannerImage=(event)=>{
        setBannerImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleBannerSubmit=async()=>{
        var formData=new FormData()
        formData.append('description', description)
        formData.append('priority', priority)
        formData.append('image', bannerImage.bytes)
        

        var result=await postDataAndImage('banner/bannersubmit', formData)

        if(result)
        {
        Swal.fire({
            
            text: 'Banner Added Succesfully',
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
                
                text: 'Fail to add Banner',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    const handleClick=()=>{
        //  props.history.push({pathname:'/displayallbanners'})
         props.setComponent(<DisplayAllBanners setComponent={props.setComponent}/>)
    }

    const handleBannerReset=()=>{
        setDescription('')
        setBannerImage({filename:"/banner avatar.png",bytes:""})
        setPriority('')
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <div>
                        <img src="/banner icon.jpg" width='25'></img>
                        </div>
                        <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                            &nbsp; Banner Interface
                        </div>
                        </Grid>
                        
                    <Grid item xs={6} className={classes.center}>
                        <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained" style={{background:'#000', marginLeft:'auto'}}>Banner List</Button>
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
                        <Avatar alt="Pictures" src={bannerImage.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleBannerSubmit()} fullWidth variant="contained" style={{ background:'#000' }} startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleBannerReset()} fullWidth variant="contained" style={{ background:'#000' }} startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}