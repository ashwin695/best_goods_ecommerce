import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List, Clear } from "@mui/icons-material";
import { getData,postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from "react"
import DisplayAllSubCategories from "./DisplayAllSubCategories";

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
        padding:20,
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

export default function SubCategories(props)
{
    const classes = useStyles(props);
    const [subCategory,setSubCategory]=useState("")
    const [categoryId,setCategoryId]=useState("")
    const [listCategory,setListCategory]=useState([])
    const [subCategoryDescription,setSubCategoryDescription]=useState("")
    const [subCategoryPicture,setSubCategoryPicture]=useState({filename:"/subcategory avatar.jpg",bytes:""})
    const handleSubCategoryPicture=(event)=>{
        setSubCategoryPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    useEffect(function()
    {
        fetchAllCategories()
    },[])

    const fetchAllCategories=async()=>{
        var result=await getData("category/displayallcategory")
        setListCategory(result.data)
    }

    const handleChange = (event) => {
        setCategoryId(event.target.value);
    };

    const fillCategory=()=>{
        return listCategory.map((item)=>{
            return <MenuItem value={item.categoryid}>
              {item.categoryname}
            </MenuItem>
        })
    }

    const handleSubCategorySubmit=async()=>{
        var formData=new FormData()
        formData.append('subcategoryname',subCategory)
        formData.append('subcategoryicon',subCategoryPicture.bytes)
        formData.append('categoryid',categoryId)
        formData.append('subcategorydescription',subCategoryDescription)

        var result=await postDataAndImage('subcategory/subcategorysubmit',formData)

        if(result)
        {
        Swal.fire({
            
            text: 'SubCategory Added Succesfully',
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
                
                text: 'Fail to add SubCategory',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    const handleClick=()=>{
      //  props.history.push({pathname:'/displayallsubcategories'})
      props.setComponent(<DisplayAllSubCategories setComponent={props.setComponent}/>)
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <div>
                            <img src="/subcategoryicon.png" width="27"></img>
                            </div>
                            <div style={{fontSize:15,letterSpacing:1,fontWeight:800}}>
                                &nbsp;SubCategory Interface
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <Button onClick={()=>handleClick()} startIcon={<List />} variant="contained">SubCategory List</Button>
                        </div>
                 </Grid>

                    <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                           <Select
                             labelId="demo-simple-select-label"
                             id="demo-simple-select"
                             value={categoryId}
                             label="Category Id"
                             onChange={(event)=>handleChange(event)}
                            >
                            {fillCategory()}
                         </Select>
                    </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField onChange={(event)=>setSubCategory(event.target.value)} fullWidth contained="outlined" label="Subcategory Name"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event)=>setSubCategoryDescription(event.target.value)} fullWidth contained="outlined" label="Description"></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleSubCategoryPicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button fullWidth variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="subCategoryPicture"  src={subCategoryPicture.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleSubCategorySubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
