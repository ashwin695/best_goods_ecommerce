import React,{useState} from "react";
import { makeStyles } from "@mui/styles";
import { Grid,Button,TextField,Avatar, InputLabel, Select, MenuItem } from "@mui/material";
import { List,Save,ClearAll } from "@mui/icons-material";
import { getData, postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import DisplayAllColors from "./DisplayAllColors";


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

export default function Colors(props)
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
    const [color,setColor]=useState("")
    const [colorPicture,setColorPicture]=useState({filename:"/color avatar.jpg" ,bytes:""})

    const handleColorPicture=(event)=>{
        setColorPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleColorSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productid',productId)
        formData.append('colorname',color)
        formData.append('icon',colorPicture.bytes)

        var result=await postDataAndImage('color/colorsubmit',formData)
        if(result)
        {
         Swal.fire({
            text: 'Color Added Succesfully',
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
                
                text: 'Fail to Add Color',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
    }

    const handleColorsList=()=>{
       // props.history.push({pathname:"/displayallcolors"})
       props.setComponent(<DisplayAllColors setComponent={props.setComponent}/>)
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

    const handleColorReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setCompanyId('')
        setProductId('')
        setColor('')
        setColorPicture({filename:"/color avatar.jpg" ,bytes:""})
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <img src="/color icon.png" width='25'></img>
                        </div>
                        <div style={{fontSize:17, letterSpacing:1, fontWeight:800}}>
                            &nbsp;Colors Interface
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.center}>
                        <Button onClick={()=>handleColorsList()} variant="contained"style={{background:'#000', marginLeft:'auto'}} startIcon={<List />}>Color List</Button>
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
                        <TextField value={color} onChange={(event)=>setColor(event.target.value)} fullWidth container="outlined" label="Color"></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <label htmlFor="contained-button-file">
                        <input onChange={(event)=>handleColorPicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button fullWidth variant="contained" component="span" style={{background:'#000'}}>
                            Upload
                        </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar alt="colorPicture" src={colorPicture.filename}></Avatar>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleColorSubmit()} fullWidth variant="contained" style={{background:'#000'}} startIcon={<Save />}>Save</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleColorReset()} fullWidth variant="contained" style={{background:'#000'}} startIcon={<ClearAll />}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}