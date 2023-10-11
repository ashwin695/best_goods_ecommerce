import React,{useState,useEffect} from "react";
import { makeStyles } from '@mui/styles';
import { Grid,TextField,Button,Avatar, MenuItem, InputLabel, Select } from "@mui/material";
import { Save,ClearAll,List, Add } from "@mui/icons-material";
import { postDataAndImage,ServerURL, postData, getData } from "../FetchNodeServices";
import Swal from "sweetalert2";
import DisplayAllSubBanners from "./DisplayAllSubBanners";
import {DropzoneDialog} from 'material-ui-dropzone'
import FormControl from '@mui/material/FormControl';

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

export default function SubBanner(props)
{
    const classes = useStyles(props)
    const [categoryId,setCategoryId] = useState("")
    const [listCategory,setListCategory] = useState([])
    const [subCategoryId,setSubCategoryId] = useState("")
    const [listSubCategory,setListSubCategory] = useState([])
    const [dropVisible,setDropVisible]=useState(false)

    const handleAddPicture=()=>{
        setDropVisible(true)
    }

    useEffect(function(){
        fetchAllCategories()
    },[])

    const fetchAllCategories=async()=>{
        var result=await getData('category/displayallcategory')
        setListCategory(result.data)
    }

    const fillCategory=()=>{
        return listCategory.map((item)=>{
            return <MenuItem value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        })
    }

    const handleChangeCategories=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategories(event.target.value)
    }

    const fetchAllSubCategories=async(cid)=>{
        var body={categoryid:cid}
        var result=await postData('subcategory/displayallsubcategorybycategory',body)
        setListSubCategory(result.data)
    }

    const fillSubCategory=()=>{
        return listSubCategory.map((item)=>{
            return <MenuItem value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        })
    }

    const handleChangeSubCategories=(event)=>{
        setSubCategoryId(event.target.value)
    }

    const handleSave=async(files)=>{
        var formData = new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        files.map((file,index)=>{
            formData.append("image"+index,file)
        })
        var result=await postDataAndImage('subbanner/savesubbannerimages',formData)
        
        if(result)
        {  
        Swal.fire({
            
            text: 'SubBanner Added Succesfully',
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
                
                text: 'Fail to add SubBanner',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        setDropVisible(false)
    }

    const handleSubBannersList=()=>{
        // props.history.push({pathname:"/displayallsubbanners"})
        props.setComponent(<DisplayAllSubBanners setComponent={props.setComponent}/>)
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
                            &nbsp; Sub Banner Interface
                        </div>
                    </Grid>
                        
                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <Button onClick={()=>handleSubBannersList()} startIcon={<List />} variant="contained">SubBanner List</Button>
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={categoryId} 
                            label="Category Id"
                            onChange={(event=>handleChangeCategories(event))} >
                                {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Subcategory ID</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={subCategoryId} 
                            label="SubCategory Id"
                            onChange={(event=>handleChangeSubCategories(event))} >
                                {fillSubCategory()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth onClick={()=>handleAddPicture()} variant="contained" startIcon={<Add />}>Add Pictures</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
                <DropzoneDialog
                    open={dropVisible}
                    onSave={(files)=>handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={()=>setDropVisible(false)}
                    filesLimit={10}
                />
            </div>
        </div>
    )
}