import { useEffect,useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List, Clear, Edit,AddBox } from "@mui/icons-material";
import { getData, postData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Colors from "./Colors"


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

export default function DisplayAllColors(props)
{
    const classes=useStyles(props)
    const [list,setList]=useState([])
    const [open,setOpen]=useState(false)
    const [categoryId,setCategoryId]=useState("")
    const [listCategory,setListCategory]=useState([])
    const [subCategoryId,setSubCategoryId]=useState("")
    const [listSubCategory,setListSubCategory]=useState([])
    const [companyId,setCompanyId]=useState("")
    const [listCompany,setListCompany]=useState([])
    const [productId,setProductId]=useState("")
    const [listProduct,setListProduct]=useState([])
    const [colorId,setColorId]=useState("")
    const [color,setColor]=useState("")
    const [btnState,setBtnState]=useState(false)
    const [oldColorPicture,setOldColorPicture]=useState()
    const [colorPicture,setColorPicture]=useState({filename:"/color avatar.jpg" ,bytes:""})

    const handleColorPicture=(event)=>{
        setColorPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnState(true)
    }

    const handleColorSubmit=async()=>{
        setOpen(false)
        var body={'colorId':colorId, 'categoryId':categoryId, 'subCategoryId':subCategoryId, 'companyId':companyId, 'productId':productId, 'colorName':color}
        var result=await postData("color/editcolorsubmit",body)
        if(result)
        {
         Swal.fire({
            text: 'Color Edited Succesfully',
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
                
                text: 'Fail to Edit Color Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllColors()
    }

    const handleEditColorPicture=async()=>{
        setOpen(false)
        var formData=new FormData()
        formData.append('colorId',colorId)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productid',productId)
        formData.append('colorname',color)
        formData.append('icon',colorPicture.bytes)

        var result=await postDataAndImage('color/editcolorpicture',formData)
        if(result)
        {
         Swal.fire({
            text: 'Color Edited Succesfully',
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
                
                text: 'Fail to Edit Color Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllColors()
    }

    const fetchAllColors=async()=>{
        var result=await getData('color/displayallcolors')
        setList(result.data)
    }

    useEffect(function(){
        fetchAllColors()
        fetchAllCategories()
        fetchAllSubCategories()
        fetchAllCompanies()
        fetchAllProducts()
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
    }

    const fetchAllSubCategories=async()=>{
        var result=await getData('subcategory/displayallsubcategory')
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

    const fetchAllProducts=async()=>{
        var result=await getData('product/displayallproducts')
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
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const handleClick=()=>{
       // props.history.push({pathname:"/colors"})
       props.setComponent(<Colors setComponent={props.setComponent}/>)
    }

    const handleClickOpen=(rowData)=>{
        fillCategory()
        fillSubCategory()
        fillCompany()
        fillProduct()
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setProductId(rowData.productid)
        setColorId(rowData.colorid)
        setColor(rowData.colorname)
        setOldColorPicture(rowData.icon)
        setColorPicture({filename:`${ServerURL}/images/${rowData.icon}` ,bytes:""})
    }

    const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
    
          title: `Do you want to Delete ${data.colorname}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("color/deletecolor",{colorid : data.colorid})
            if(result)
            {
              Swal.fire('Record Deleted Sucessfully...')
              fetchAllColors()
            }
            else
            {
              Swal.fire('Fail to Delete Record...')
            }
    
          } else if (result.isDenied) {
            Swal.fire(`${data.colorname} is Safe`)
          }
        })
    }

    const handleCancel=()=>{
        {  setBtnState(false)
           setColorPicture({filename:`${ServerURL}/images/${oldColorPicture}`,bytes:""})
        }
    }

    const showColorForm=()=>{
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <div>
                                <img src="/color icon.png" width='25'></img>
                            </div>
                            <div style={{fontSize:17, letterSpacing:1, fontWeight:800}}>
                                &nbsp;Colors Interface
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
    
                        <Grid item xs={12} className={classes.center}>
                            <TextField value={color} onChange={(event)=>setColor(event.target.value)} fullWidth container="outlined" label="Color"></TextField>
                        </Grid>
    
                        <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                            <input onChange={(event)=>handleColorPicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button fullWidth variant="contained" component="span">
                                Upload
                            </Button>
                            </label>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                            {btnState?<span>
                            <Button onClick={()=>handleEditColorPicture()}>Save</Button>
                            <Button onClick={()=>handleCancel()}>Cancel</Button>
                            </span>:<></>}
                            <Avatar alt="colorPicture" src={colorPicture.filename}></Avatar>
                        </Grid>
    
                        <Grid item xs={6}>
                            <Button onClick={()=>handleColorSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    const showDialogForm=()=>{
        return (
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  {showColorForm()}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        );
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdivtable}>
                <MaterialTable
                title={<div style={{width:740,display:'flex', flexDirection:'row',alignItems:'center'}}>
                    <div style={{padding:5}}>
                        <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add New Color</Button>
                    </div>

                    <div style={{marginLeft:250,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                        List Of Colors
                    </div>
                </div>}
                columns={[
                    { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                    { title: 'SubCategory ID', render: (rowData) => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
                    { title: 'Company ID', render: (rowData) => (<div>{rowData.companyid},{rowData.companyname}</div>) },
                    { title: 'Product ID', render: (rowData) => (<div>{rowData.productid},{rowData.productname}</div>) },
                    { title: 'Color ID', field: 'colorid' },
                    { title: 'Color Name', field: 'colorname'},
                    { title: 'Icon', field: 'icon', 
                    render: rowData =><Avatar
                    alt="Color"
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
                      tooltip: 'Edit User',
                      onClick: (event, rowData) => handleClickOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                  ]}
                />
                {showDialogForm()}
            </div>
        </div>
    )
}