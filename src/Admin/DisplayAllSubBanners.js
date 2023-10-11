import React,{useState,useEffect} from "react";
import { makeStyles } from '@mui/styles';
import { Grid,TextField,Button,Avatar, MenuItem, InputLabel, Select } from "@mui/material";
import { Save,ClearAll,List, Add, Edit, AddBox } from "@mui/icons-material";
import { postDataAndImage,ServerURL, postData, getData } from "../FetchNodeServices";
import Swal from "sweetalert2";
import SubBanners from "./SubBanners";
import {DropzoneDialog} from 'material-ui-dropzone'
import FormControl from '@mui/material/FormControl';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MaterialTable from "material-table";

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
        width:1000,
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

export default function DisplayAllSubBanners(props)
{
    const classes = useStyles(props)
    const [list,setList]=useState([])
    const [open, setOpen] = useState(false);
    const [subBannerId,setSubBannerId] = useState('')
    const [categoryId,setCategoryId]=useState("")
    const [listCategory,setListCategory]=useState([])
    const [subCategoryId,setSubCategoryId]=useState("")
    const [listSubCategory,setListSubCategory]=useState([])
    const [btnState, setBtnState] = useState(false);
    const [subBannerImage,setSubBannerImage]=useState({filename:"/banner avatar.png",bytes:""})
    const [oldSubBannerImage,setOldSubBannerImage]=useState('')

    const fetchAllSubBanner=async()=>{
        var result=await getData("subbanner/displayallsubbanner")
        setList(result.data)
    }

    useEffect(function(){
        fetchAllSubBanner()
        fetchAllCategories()
        fetchAllSubCategories()
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

    const handleClick=()=>{
        // props.history.push({pathname:'/subbanners'})
        props.setComponent(<SubBanners setComponent={props.setComponent}/>)
    }

    const handleClickOpen = (rowData) => {
        fillCategory()
        fillSubCategory()
        setSubBannerId(rowData.subbannerid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setOldSubBannerImage(rowData.image)
        setSubBannerImage({filename:`${ServerURL}/images/${rowData.image}`,bytes:""})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubBannerImage=(event)=>{
        setSubBannerImage({filename:URL.createObjectURL(event.target.files[0]),
          bytes:event.target.files[0]})
          setBtnState(true);
    }

    const handleCancel=()=>{
        setBtnState(false)
        setSubBannerImage({filename:`${ServerURL}/images/${oldSubBannerImage}`,bytes:""})
    }

    const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
    
          title: `Do you want to Delete this SubBanner ?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData("subbanner/deletesubbanner",{subbannerid : data.subbannerid})
            if(result)
            {
              Swal.fire('Record Deleted Sucessfully...')
              fetchAllSubBanner()
            }
            else
            {
              Swal.fire('Fail to Delete Record...')
            }
    
          } else if (result.isDenied) {
            Swal.fire(`SubBanner is Safe`)
          }
        })
    }

    const handleSubBannerSubmit=async()=>{
        setOpen(false)
        var body={'subBannerId':subBannerId, 'categoryId':categoryId, 'subCategoryId':subCategoryId}
        var result=await postData('subbanner/updatesubbannerdata',body)
    
        if(result)
        {
            Swal.fire({
                
                text: 'SubBanner Edited Succesfully',
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
                    
                text: 'Fail to Edit SubBanner Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllSubBanner()
    }

    const handleEditSubBannerImage=async()=>{
        setOpen(false)
        var formData=new FormData()
            formData.append('subBannerId', subBannerId)
            formData.append('image', subBannerImage.bytes)
            
            var result=await postDataAndImage('subbanner/subbannereditimage', formData)
    
        if(result)
            {
            Swal.fire({
                 
                text: 'SubBanner Edited Succesfully',
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
                    
                    text: 'Fail to Edit SubBanner Data',
                    imageUrl: '/logo.jpg',
                    imageWidth: 400,
                    imageHeight: 100,
                    imageAlt: 'Custom image',
                    icon:'error'
                })
            }
        fetchAllSubBanner()
    }

    const showSubBannerForm=()=>{
        return(
            <div className={classes.root}>
                <div className={classes.subdiv}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                        <div>
                            <img src="/banner icon.jpg" width='25'></img>
                            </div>
                            <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                                &nbsp; Sub Banner Interface
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
                            <label htmlFor="contained-button-file">
                                <input onChange={(event)=>handleSubBannerImage(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                                <Button fullWidth variant="contained" component="span">Upload</Button>
                            </label>
                        </Grid>
                        <Grid item xs={6} className={classes.center}>
                           {btnState?<span>
                           <Button onClick={()=>handleEditSubBannerImage()}>Save</Button>
                           <Button onClick={()=>handleCancel()}>Cancel</Button>
                            </span>:<></>}
                            <Avatar alt="Pictures" src={subBannerImage.filename}></Avatar>
                        </Grid>
    
                        <Grid item xs={6}>
                            <Button fullWidth onClick={()=>handleSubBannerSubmit()} variant="contained" startIcon={<Edit />}>Edit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    const showDialog=()=>{
        return(
          <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogContent>
              {showSubBannerForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        )
    }

    return(
        <div className={classes.root}>
            <div className={classes.subdivtable}>
                <MaterialTable
                  title={<div style={{width:600, display:'flex', flexDirection:'row',alignItems:'center'}}>
                  <div style={{padding:5}}>
                  <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add New SubBanner</Button>
                  </div>
     
                  <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
                     List Of Sub Banners
                  </div>
                  </div>}
                  columns={[
                     { title: 'SubBanner Id', field: 'subbannerid' },
                     { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
                    { title: 'SubCategory ID', render: (rowData) => (<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>) },
                     { title: 'Image', field: 'image',
                     render: rowData =><Avatar
                     alt="SubBanner"
                     variant="rounded"
                     src={`${ServerURL}/images/${rowData.image}`}
                     sx={{ width: 56, height: 56 }}
                     />
                     },
                    ]}

                    data={list}

                    actions={[
                        {
                          icon: 'edit',
                          tooltip: 'Edit SubBanner',
                          onClick: (event, rowData) => handleClickOpen(rowData)
                        },
                        {
                          icon: 'delete',
                          tooltip: 'Delete SubBanner',
                          onClick: (event, rowData) => handleDelete(rowData)
                        }
                    ]}
                />
            </div>
            {showDialog()}
        </div>
    )

}