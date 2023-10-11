import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List } from "@mui/icons-material";
import { postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import DisplayAllCategories from "./DisplayAllCategories";

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
export default function Categories(props)
{  const classes = useStyles();
    const [category,setCategory]=useState("")
    const [picture,setPicture]=useState({filename:"/avatar.png",bytes:""})
    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryname', category)
        formData.append('icon', picture.bytes)
        

        var result=await postDataAndImage('category/categorysubmit', formData)

        if(result)
        {
        Swal.fire({
            
            text: 'Category Added Succesfully',
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
                
                text: 'Fail to add Category',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    const handleClick=()=>{
      //  props.history.push({pathname:'/displayallcategories'})
      props.setComponent(<DisplayAllCategories setComponent={props.setComponent}/>)
    }

    const handleReset=()=>{
        setCategory('')
        setPicture({filename:"/avatar.png",bytes:""})
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                        <img src="/electronic.png" width='25'></img>
                        </div>
                        <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                            &nbsp;Category Interface
                        </div>
                    </Grid>
                        
                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained" style={{background:'#fff', color:'#000', marginLeft:'auto'}}>Category List</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField value={category} onChange={(event)=>setCategory(event.target.value)} fullWidth variant="outlined" label="Category Name"></TextField>
                    </Grid>
                    
                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                            <Button fullWidth variant="contained" component="span" style={{background:'#fff', color:'#000',}}>Upload</Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="Pictures" src={picture.filename}></Avatar>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleSubmit()} fullWidth variant="contained" style={{background:'#fff', color:'#000',}} startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleReset()} fullWidth variant="contained" style={{background:'#fff', color:'#000',}} startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}