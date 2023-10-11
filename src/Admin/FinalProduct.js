import React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Button, TextField, Avatar, InputLabel, Select, MenuItem} from "@mui/material";
import { List,Save,ClearAll,Add } from "@mui/icons-material";
import { getData, postData, postDataAndImage,postDataAndImageWithId,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import DisplayAllFinalProducts from "./DisplayAllFinalProducts"
import {DropzoneDialog} from 'material-ui-dropzone'

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
        width:1000,
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

export default function FinalProduct(props)
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
    const [colorId,setColorId]=useState("")
    const [listColor,setListColor]=useState([])
    const [modelId,setModelId]=useState("")
    const [listModel,setListModel]=useState([])
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [offerPrice,setOfferPrice]=useState("")
    const [stock,setStock]=useState("")
    const [size,setSize]=useState("")
    const [dropVisible,setDropVisible]=useState(false)
    const [finalProductId,setFinalProductId]=useState()
    const [productStatus,setProductStatus]=useState('')
    const [finalProductPicture,setFinalProductPicture]=useState({filename:"/finalproduct avatar.jpg", bytes:""})

    const handleFinalProductPicture=(event)=>{
        setFinalProductPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleFinalProductsList=()=>{
       // props.history.push({pathname:"/displayallfinalproducts"})
       props.setComponent(<DisplayAllFinalProducts setComponent={props.setComponent}/>)
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
        fetchAllColors(event.target.value)
        fetchAllModels(event.target.value)
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

    const fetchAllColors=async(comid)=>{
        var body={companyid:comid}
        var result=await postData('color/displayallcolorsbycompany',body)
        setListColor(result.data)
    }

    const fillColor=()=>{
        return listColor.map((item)=>{
            return <MenuItem value={item.colorid}>
                {item.colorname}
            </MenuItem>
        })
    }

    const handleChangeColors=(event)=>{
        setColorId(event.target.value)
    }

    const fetchAllModels=async(comid)=>{
        var body={companyid:comid}
        var result=await postData('model/displayallmodelsbycompany',body)
        setListModel(result.data)
    }

    const fillModel=()=>{
        return listModel.map((item)=>{
            return <MenuItem value={item.modelid}>
                {item.modelname}
            </MenuItem>
        })
    }

    const handleChangeModels=(event)=>{
        setModelId(event.target.value)
    }

    const fillSize=()=>{
        return listModel.map((item)=>{
            return <MenuItem value={item.size}>
                {item.size}
            </MenuItem>
        })
    }

    const handleChangeSizes=(event)=>{
        setSize(event.target.value)
    }

    const handleAddPicture=()=>{
        setDropVisible(true)
    }

    const handleSave=async(files)=>{
        var formData = new FormData()
        formData.append('finalproductid',finalProductId)
        files.map((file,index)=>{
            formData.append("image"+index,file)
        })
        var result=await postDataAndImage('finalproduct/savemorepictures',formData)
        alert(result)
    }

    const handleFinalProductSubmit=async()=>{
        var formData= new FormData
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productid',productId)
        formData.append('colorid',colorId)
        formData.append('modelid',modelId)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('offerprice',offerPrice)
        formData.append('stock',stock)
        formData.append('size',size)
        formData.append('productstatus',productStatus)
        formData.append('icon',finalProductPicture.bytes)

        var result=await postDataAndImageWithId('finalproduct/finalproductsubmit',formData)

        if(result.result)
        {  setFinalProductId(result.finalproductid)
        Swal.fire({
            
            text: 'Final Product Added Succesfully',
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
                
                text: 'Fail to add Final Product',
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
                            <img src="/finalproduct icon.png" width='25'></img>
                        </div>
                        <div style={{fontSize:17, letterSpacing:1, fontWeight:800}}>
                        &nbsp;Final Product Interface
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Button onClick={()=>handleFinalProductsList()} variant="contained" startIcon={<List />}>Final Product List</Button>
                    </Grid>

                    <Grid item xs={3} className={classes.center}>
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
                    <Grid item xs={3} className={classes.center}>
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

                    <Grid item xs={3} className={classes.center}>
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

                    <Grid item xs={3} className={classes.center}>
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

                    <Grid item xs={3} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Color ID</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={colorId} 
                            label="Color Id"
                            onChange={(event=>handleChangeColors(event))} >
                                {fillColor()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Model ID</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={modelId} 
                            label="Model Id"
                            onChange={(event=>handleChangeModels(event))} >
                                {fillModel()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} className={classes.center}>
                        <TextField onChange={(event)=>setPrice(event.target.value)} fullWidth variant="outlined" label="Price"></TextField>
                    </Grid>

                    <Grid item xs={3} className={classes.center}>
                        <TextField onChange={(event)=>setOfferPrice(event.target.value)} fullWidth variant="outlined" label="Offer Price"></TextField>
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                        <TextField onChange={(event)=>setStock(event.target.value)} fullWidth variant="outlined" label="Stock"></TextField>
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Size</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={size} 
                            label="Size"
                            onChange={(event=>handleChangeSizes(event))} >
                                {fillSize()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} className={classes.center}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Product Status</InputLabel>
                            <Select 
                            labelId="demo-simple-select-label" 
                            id="demo-simple-select" 
                            value={productStatus} 
                            label="Product Status"
                            onChange={(event=>setProductStatus(event.target.value))} >
                                <MenuItem value="trending">Trending</MenuItem>
                                <MenuItem value="new arrival">New Arrival</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.center}>
                        <TextField onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description"></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                        <input onChange={(event)=>handleFinalProductPicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button fullWidth variant="contained" component="span">
                            Upload
                        </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="finalProductPicture" src={finalProductPicture.filename}></Avatar>
                    </Grid>

                    <Grid item xs={4}>
                        <Button onClick={()=>handleFinalProductSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button fullWidth onClick={()=>handleAddPicture()} variant="contained" startIcon={<Add />}>Add Pictures</Button>
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