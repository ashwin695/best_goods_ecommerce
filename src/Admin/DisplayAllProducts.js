import { useEffect,useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List, Clear, Edit,AddBox } from "@mui/icons-material";
import { getData, postData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { formatMs } from "@material-ui/core";
import Product from "./Product"

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

export default function DisplayAllProducts(props)
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
    const [product,setProduct]=useState("")
    const [productDescription,setProductDescription]=useState("")
    const [status,setStatus]=useState("")
    const [btnState,setBtnState]=useState(false)
    const [oldProductPicture,setOldProductPicture]=useState()
    const [productPicture,setProductPicture]=useState({filename:"/product avatar.png" ,bytes:""})

    const handleProductPicture=(event)=>{
        setProductPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnState(true)
    }

    const handleProductSubmit=async()=>{
        setOpen(false)
        var body={'productId':productId, 'categoryId':categoryId, 'subCategoryId':subCategoryId, 'companyId':companyId, 'productName':product, 'description':productDescription, 'status':status}
        var result=await postData("product/editproductsubmit",body)
        if(result)
        {
         Swal.fire({
            text: 'Product Edited Succesfully',
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
                
                text: 'Fail to Edit Product Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllProducts()
    }

    const handleEditProductPicture=async()=>{
        setOpen(false)
        var formData=new FormData()
        formData.append('productId',productId)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('productname',product)
        formData.append('description',productDescription)
        formData.append('status',status)
        formData.append('producticon',productPicture.bytes)

        var result=await postDataAndImage('product/editproductpicture',formData)
        if(result)
        {
         Swal.fire({
            text: 'Product Edited Succesfully',
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
                
                text: 'Fail to Edit Product Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllProducts()
    }

    const fetchAllProducts=async()=>{
        var result=await getData('product/displayallproducts')
        setList(result.data)
    }

    useEffect(function(){
        fetchAllProducts()
        fetchAllCategories()
        fetchAllSubCategories()
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

    const handleChange=(event)=>{
        setStatus(event.target.value)
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const handleClickOpen=(rowData)=>{
        fillCategory()
        fillSubCategory()
        fillCompany()
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setProductId(rowData.productid)
        setProduct(rowData.productname)
        setProductDescription(rowData.description)
        setOldProductPicture(rowData.producticon)
        setStatus(rowData.status)
        setProductPicture({filename:`${ServerURL}/images/${rowData.producticon}` ,bytes:""})
    }

    const handleClick=()=>{
       // props.history.push({pathname:"/products"})
       props.setComponent(<Product setComponent={props.setComponent}/>)
    }

    const handleCancel=()=>{
        {  setBtnState(false)
           setProductPicture({filename:`${ServerURL}/images/${oldProductPicture}`,bytes:""})
        }
    }

    const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
    
          title: `Do you want to Delete ${data.productname}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("product/deleteproduct",{productid : data.productid})
            if(result)
            {
              Swal.fire('Record Deleted Sucessfully...')
              fetchAllProducts()
            }
            else
            {
              Swal.fire('Fail to Delete Record...')
            }
    
          } else if (result.isDenied) {
            Swal.fire(`${data.productname} is Safe`)
          }
        })
      }

    const showProductForm=()=>{
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <div>
                                <img src="/product.png" width='25'></img>
                            </div>
                            <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                                &nbsp;Edit Product
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
                            <TextField value={product} onChange={(event)=>setProduct(event.target.value)} fullWidth container="outlined" label="Product Name"></TextField>
                        </Grid>
    
                        <Grid item xs={12} className={classes.center}>
                            <TextField value={productDescription} onChange={(event)=>setProductDescription(event.target.value)} fullWidth container="outlined" label="Description"></TextField>
                        </Grid>
    
                        <Grid item xs={8}>
                           <FormControl component="fieldset">
                              <FormLabel style={{fontSize:16}} component="legend">Status</FormLabel>
                              <RadioGroup row aria-label="status" name="row-radio-buttons-group">
                                  <FormControlLabel value={status} onChange={(event)=>handleChange(event)} checked={status === "continue"} value="continue" control={<Radio />} label="Continue" />
                                  <FormControlLabel value={status} onChange={(event)=>handleChange(event)} checked={status === "discontinue"} value="discontinue" control={<Radio />} label="Discontinue" />
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
                            {btnState?<span>
                            <Button onClick={()=>handleEditProductPicture()}>Save</Button>
                            <Button onClick={()=>handleCancel()}>Cancel</Button>
                            </span>:<></>}
                            <Avatar alt="productPicture"  src={productPicture.filename}></Avatar>
                        </Grid>
    
                        <Grid item xs={6}>
                            <Button onClick={()=>handleProductSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
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
                  {showProductForm()}
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

    return (
        <div className={classes.root}>
            <div className={classes.subdivtable}>
        <MaterialTable
          title={<div style={{width:740,display:'flex', flexDirection:'row',alignItems:'center'}}>
          <div style={{padding:5}}>
          <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add New Product</Button>
          </div>

          <div style={{marginLeft:250,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
            List Of Products
          </div>
        </div>}
          columns={[
            { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
            { title: 'SubCategory ID', render: (rowData) => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
            { title: 'Company ID', render: (rowData) => (<div>{rowData.companyid},{rowData.companyname}</div>) },
            { title: 'Product ID', field: 'productid' },
            { title: 'Product Name', field: 'productname'},
            { title: 'Description', field: 'description' },
            { title: 'Status', field: 'status' },
            { title: 'Icon', field: 'producticon', 
            render: rowData =><Avatar
            alt="Product"
            variant="rounded"
            src={`${ServerURL}/images/${rowData.producticon}`}
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