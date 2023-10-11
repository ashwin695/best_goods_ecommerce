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
import FinalProduct from "./FinalProduct";

const useStyles=makeStyles({
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
        width:1250,
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

export default function DisplayAllFinalProducts(props)
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
    const [listColor,setListColor]=useState([])
    const [modelId,setModelId]=useState("")
    const [listModel,setListModel]=useState([])
    const [finalProductId,setFinalProductId]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [offerPrice,setOfferPrice]=useState("")
    const [stock,setStock]=useState("")
    const [size,setSize]=useState("")
    const [btnState,setBtnState]=useState(false)
    const [oldFinalProductPicture,setOldFinalProductPicture]=useState()
    const [finalProductPicture,setFinalProductPicture]=useState({filename:"/finalproduct avatar.jpg", bytes:""})

    const handleFinalProductPicture=(event)=>{
        setFinalProductPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnState(true)
    }

    const handleClick=()=>{
       // props.history.push({pathname:"/finalproducts"})
       props.setComponent(<FinalProduct setComponent={props.setComponent}/>)
    }

    const handleClickOpen=(rowData)=>{
        fillCategory()
        fillSubCategory()
        fillCompany()
        fillProduct()
        fillColor()
        fillModel()
        setOpen(true)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setProductId(rowData.productid)
        setColorId(rowData.colorid)
        setModelId(rowData.modelid)
        setFinalProductId(rowData.finalproductid)
        setDescription(rowData.description)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setSize(rowData.size)
        setOldFinalProductPicture(rowData.icon)
        setFinalProductPicture({filename:`${ServerURL}/images/${rowData.icon}` ,bytes:""})
    }

    const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
    
          title: `Do you want to Delete ${data.description}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("finalproduct/deletefinalproduct",{finalproductid : data.finalproductid})
            if(result)
            {
              Swal.fire('Record Deleted Sucessfully...')
              fetchAllFinalProducts()
            }
            else
            {
              Swal.fire('Fail to Delete Record...')
            }
    
          } else if (result.isDenied) {
            Swal.fire(`${data.description} is Safe`)
          }
        })
    }

    const fetchAllFinalProducts=async()=>{
        var result=await getData('finalproduct/displayallfinalproducts')
        setList(result.data)
    }

    useEffect(function(){
        fetchAllFinalProducts()
        fetchAllCategories()
        fetchAllSubCategories()
        fetchAllCompanies()
        fetchAllProducts()
        fetchAllColors()
        fetchAllModels()
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

    const fetchAllColors=async()=>{
        var result=await getData('color/displayallcolors')
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

    const fetchAllModels=async()=>{
        var result=await getData('model/displayallmodels')
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

    const handleClose=()=>{
        setOpen(false);
    }

    const handleFinalProductSubmit=async()=>{
        setOpen(false)
        var body={'finalProductId':finalProductId, 'categoryId':categoryId, 'subCategoryId':subCategoryId, 'companyId':companyId, 'productId':productId, 'colorId':colorId, 'modelId':modelId, 'description':description, 'price':price, 'offerPrice':offerPrice, 'stock':stock, 'size':size}
        var result=await postData("finalproduct/editfinalproductsubmit",body)
        if(result)
        {
         Swal.fire({
            text: 'Final Product Edited Succesfully',
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
                
                text: 'Fail to Edit Final Product Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllFinalProducts()
    }

    const handleEditFinalProductPicture=async()=>{
        setOpen(false)
        var formData=new FormData()
        formData.append('finalproductid',finalProductId)
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
        formData.append('icon',finalProductPicture.bytes)

        var result=await postDataAndImage('finalproduct/editfinalproductpicture',formData)
        if(result)
        {
         Swal.fire({
            text: 'Final Product Edited Succesfully',
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
                
                text: 'Fail to Edit Final Product Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllFinalProducts()
    }

    const handleCancel=()=>{
        {  setBtnState(false)
           setFinalProductPicture({filename:`${ServerURL}/images/${oldFinalProductPicture}`,bytes:""})
        }
    }

    const showFinalProductForm=()=>{
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <div>
                                <img src="/finalproduct icon.png" width='25'></img>
                            </div>
                            <div style={{fontSize:17, letterSpacing:1, fontWeight:800}}>
                            &nbsp;Final Product Interface
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
    
                        <Grid item xs={6} className={classes.center}>
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
    
                        <Grid item xs={6} className={classes.center}>
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
    
                        <Grid item xs={6} className={classes.center}>
                            <TextField value={price} onChange={(event)=>setPrice(event.target.value)} fullWidth container="outlined" label="Price"></TextField>
                        </Grid>
    
                        <Grid item xs={6} className={classes.center}>
                            <TextField value={offerPrice} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth container="outlined" label="Offer Price"></TextField>
                        </Grid>
    
                        <Grid item xs={6} className={classes.center}>
                            <TextField value={stock} onChange={(event)=>setStock(event.target.value)} fullWidth container="outlined" label="Stock"></TextField>
                        </Grid>

                        <Grid item xs={6} className={classes.center}>
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

                        <Grid item xs={12} className={classes.center}>
                            <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth container="outlined" label="Description"></TextField>
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
                            {btnState?<span>
                            <Button onClick={()=>handleEditFinalProductPicture()}>Save</Button>
                            <Button onClick={()=>handleCancel()}>Cancel</Button>
                            </span>:<></>}
                            <Avatar alt="finalProductPicture" src={finalProductPicture.filename}></Avatar>
                        </Grid>
    
                        <Grid item xs={6}>
                            <Button onClick={()=>handleFinalProductSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
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
        return(
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent>
                  {showFinalProductForm()}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        )
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdivtable}>
                <MaterialTable
                title={<div style={{width:740,display:'flex', flexDirection:'row',alignItems:'center'}}>
                    <div style={{padding:5}}>
                        <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add Final Product</Button>
                    </div>

                    <div style={{marginLeft:250,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                        List Of Final Products
                    </div>
                </div>}
                columns={[
                    { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                    { title: 'SubCategory ID', render: (rowData) => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
                    { title: 'Company ID', render: (rowData) => (<div>{rowData.companyid},{rowData.companyname}</div>) },
                    { title: 'Product ID', render: (rowData) => (<div>{rowData.productid},{rowData.productname}</div>) },
                    { title: 'Color ID', render: (rowData) => (<div>{rowData.colorid},{rowData.colorname}</div>) },
                    { title: 'Model ID', render: (rowData) => (<div>{rowData.modelid},{rowData.modelname}</div>) },
                    { title: 'Final Product ID', field: 'finalproductid' },
                    { title: 'Description', field: 'description'},
                    { title: 'Price', field: 'price'},
                    { title: 'Offer Price', field: 'offerprice'},
                    { title: 'Stock', field: 'stock'},
                    { title: 'Size', field: 'size'},
                    { title: 'Icon', field: 'icon', 
                    render: rowData =><Avatar
                    alt="FinalProduct"
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