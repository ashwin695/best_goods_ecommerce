import React,{useState} from "react";
import { makeStyles } from "@mui/styles";
import { Grid,Button,TextField,Avatar, InputLabel, Select, MenuItem } from "@mui/material";
import { List,Save,ClearAll } from "@mui/icons-material";
import { getData, postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { formatMs } from "@material-ui/core";
import DisplayAllProducts from "./DisplayAllProducts";

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

export default function Product(props)
{
    const classes=useStyles(props)
    const [categoryId,setCategoryId]=useState("")
    const [listCategory,setListCategory]=useState([])
    const [subCategoryId,setSubCategoryId]=useState("")
    const [listSubCategory,setListSubCategory]=useState([])
    const [companyId,setCompanyId]=useState("")
    const [listCompany,setListCompany]=useState([])
    const [product,setProduct]=useState("")
    const [productDescription,setProductDescription]=useState("")
    const [status,setStatus]=useState("")
    const [productPicture,setProductPicture]=useState({filename:"/product avatar.png" ,bytes:""})

    const handleProductPicture=(event)=>{
        setProductPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleProductSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productname',product)
        formData.append('description',productDescription)
        formData.append('status',status)
        formData.append('producticon',productPicture.bytes)

        var result=await postDataAndImage('product/productsubmit',formData)
        if(result)
        {
         Swal.fire({
            text: 'Product Added Succesfully',
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
                
                text: 'Fail to Add Product',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    useEffect(function(){
        fetchAllCategories()
       
        fetchAllCompanies()
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

    const 
    handleChangeCategories=(event)=>{
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

    const fetchAllCompanies=async()=>{
        var result=await getData('company/displayallcompany')
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

    const handleChange=(event)=>{
        setStatus(event.target.value)
    }

    const handleProductList=()=>{
      // props.history.push({pathname:"/displayallproducts"})
      props.setComponent(<DisplayAllProducts setComponent={props.setComponent}/>)
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <img src="/product.png" width='25'></img>
                        </div>
                        <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                            &nbsp;Product Interface
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <Button onClick={()=>handleProductList()} variant="contained" startIcon={<List />}>Product List</Button>
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
                    <Grid item xs={6} className={classes.center}>
                        <TextField onChange={(event)=>setProduct(event.target.value)} fullWidth container="outlined" label="Product Name"></TextField>
                    </Grid>

                    <Grid item xs={12} className={classes.center}>
                        <TextField onChange={(event)=>setProductDescription(event.target.value)} fullWidth container="outlined" label="Description"></TextField>
                    </Grid>

                    <Grid item xs={8}>
                       <FormControl component="fieldset">
                          <FormLabel style={{fontSize:16}} component="legend">Status</FormLabel>
                          <RadioGroup row aria-label="status" name="row-radio-buttons-group">
                              <FormControlLabel onChange={(event)=>handleChange(event)} checked={status === "continue"} value="continue" control={<Radio />} label="Continue" />
                              <FormControlLabel onChange={(event)=>handleChange(event)} checked={status === "discontinue"} value="discontinue" control={<Radio />} label="Discontinue" />
                          </RadioGroup>
                       </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                        <input onChange={(event)=>handleProductPicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button fullWidth variant="contained" component="span">
                            Upload
                        </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="productPicture"  src={productPicture.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleProductSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}