import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Button, TextField, Avatar, InputLabel, Select, MenuItem} from "@mui/material";
import { List,Save,ClearAll } from "@mui/icons-material";
import { getData, postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import DisplayAllModels from "./DisplayAllModels";

const useStyles=makeStyles({
    root:
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

export default function Model(props)
{
    const classes=useStyles(props)
    const [categoryId,setCategoryId]=useState("")
    const [listCategory,setListCategory]=useState([])
    const [subCategoryId,setSubCategoryId]=useState("")
    const [listSubCategory,setListSubCategory]=useState([])
    const [companyId,setCompanyId]=useState("")
    const [listCompany,setListCompany]=useState([])
    const [productId,setProductId]=useState("")
    const [listProduct,setListProduct]=useState([])
    const [model,setModel]=useState("")
    const [size,setSize]=useState("")
    const [weight,setWeight]=useState("")
    const [modelPicture,setModelPicture]=useState({filename:"/model avatar.png", bytes:""})

    const handleModelPicture=(event)=>{
        setModelPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleModelsList=()=>{
       // props.history.push({pathname:"/displayallmodels"})
       props.setComponent(<DisplayAllModels setComponent={props.setComponent}/>)
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
        fetchAllProducts(event.target.value)
    }

    const fetchAllCompanies=async(pid)=>{
        var body={productid:pid}
        var result=await postData('product/displayallproductsbycompany',body)
        setListCompany(result.data)
    }

    const fillCompany=()=>{
        return listCompany.map((item)=>{
            return <MenuItem value={item.companyid}>
                {item.companyname}
            </MenuItem>
        })
    }

    const handleChangeCompanies=(event)=>{
        setCompanyId(event.target.value)
    }

    const fetchAllProducts=async(sid)=>{
        var body={subcategoryid:sid}
        var result=await postData('product/displayallproductsbysubcategory',body)
        setListProduct(result.data)
    }

    const fillProduct=()=>{
        return listProduct.map((item)=>{
            return <MenuItem value={item.productid}>
                {item.productname}
            </MenuItem>
        })
    }

    const handleChangeProducts=(event)=>{
        setProductId(event.target.value)
        fetchAllCompanies(event.target.value)
    }

    const handleModelSubmit=async()=>{
        var formData=new FormData
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productid',productId)
        formData.append('modelname',model)
        formData.append('size',size)
        formData.append('weight',weight)
        formData.append('modelicon',modelPicture.bytes)

        var result=await postDataAndImage("model/modelsubmit",formData)
        if(result)
        {
            Swal.fire({
                text: 'Model Added Succesfully',
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
                
                text: 'Fail to Add Model',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                        <img src="/model icon.png" width='25'></img>
                        </div>

                        <div style={{fontSize:17, letterSpacing:1, fontWeight:800}}>
                        &nbsp;Models Interface
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Button onClick={()=>handleModelsList()} variant="contained" startIcon={<List />}>Model List</Button>
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

                    <Grid item xs={6} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product ID</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={productId} 
                            label="Product Id"
                            onChange={(event=>handleChangeProducts(event))} >
                                {fillProduct()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Company ID</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={companyId} 
                            label="Company Id"
                            onChange={(event=>handleChangeCompanies(event))} >
                                {fillCompany()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.center}>
                        <TextField onChange={(event)=>setModel(event.target.value)} fullWidth container="outlined" label="Model"></TextField>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <TextField onChange={(event)=>setSize(event.target.value)} fullWidth container="outlined" label="Size"></TextField>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <TextField onChange={(event)=>setWeight(event.target.value)} fullWidth container="outlined" label="Weight"></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                        <input onChange={(event)=>handleModelPicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button fullWidth variant="contained" component="span">
                            Upload
                        </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="modelPicture" src={modelPicture.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleModelSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}