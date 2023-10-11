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
import { getData,postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SubCategories from "./SubCategories";

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

export default function DisplayAllSubCategories(props)
{  const classes = useStyles();
   const [list,setList]=useState([])
   const [open, setOpen] = useState(false);
   const [subCategoryId,setSubCategoryId]=useState("")
   const [subCategory,setSubCategory]=useState("")
   const [categoryId,setCategoryId]=useState("")
   const [btnState,setBtnState]=useState(false)
   const [oldSubCategoryPicture,setOldSubCategoryPicture]=useState()
   const [subCategoryDescription,setSubCategoryDescription]=useState("")
   const [listCategory,setListCategory]=useState([])
   const [subCategoryPicture,setSubCategoryPicture]=useState({filename:"/subcategory avatar.jpg",bytes:""})
   const fetchAllSubCategory=async()=>{
    var result=await getData("subcategory/displayallsubcategory")
    setList(result.data)
   }

   useEffect(function(){
    fetchAllSubCategory()
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

  const handleClickOpen = (rowData) => {
    fillCategory()
    setSubCategoryId(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setSubCategory(rowData.subcategoryname)
    setOldSubCategoryPicture(rowData.subcategoryicon)
    setSubCategoryDescription(rowData.subcategorydescription)
    setSubCategoryPicture({filename:`${ServerURL}/images/${rowData.subcategoryicon}`,bytes:""})
    console.log(rowData)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick=()=>{
   // props.history.push({pathname:'/subcategories'})
   props.setComponent(<SubCategories setComponent={props.setComponent}/>)
  }

  const handleCancel=()=>{
    {setBtnState(false)
      setSubCategoryPicture({filename:`${ServerURL}/images/${oldSubCategoryPicture}`,bytes:""})}
  }

  const handleDelete=async(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',

      title: `Do you want to Delete ${data.subcategoryname}?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData("subcategory/deletesubcategory",{subcategoryid : data.subcategoryid})
        if(result)
        {
          Swal.fire('Record Deleted Sucessfully...')
          fetchAllSubCategory()
        }
        else
        {
          Swal.fire('Fail to Delete Record...')
        }

      } else if (result.isDenied) {
        Swal.fire(`${data.subcategoryname} is Safe`)
      }
    })
  }

  const handleSubCategoryPicture=(event)=>{
    setSubCategoryPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnState(true)
}

const handleSubCategorySubmit=async()=>{
  setOpen(false)
  var body={'subCategoryId':subCategoryId, 'subCategoryName':subCategory, 'categoryId':categoryId, 'subCategoryDescription':subCategoryDescription}
  var result=await postData("subcategory/updatesubcategorydata",body)

  if(result)
        {
        Swal.fire({
            
            text: 'SubCategory Edited Succesfully',
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
                
                text: 'Fail to Edit SubCategory Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllSubCategory()
}

const handleEditPicture=async()=>{
  setOpen(false)
  var formData=new FormData()
        formData.append('subCategoryId',subCategoryId)
        formData.append('subcategoryicon',subCategoryPicture.bytes)
        formData.append('categoryid',categoryId)
        formData.append('subcategorydescription',subCategoryDescription)

        var result=await postDataAndImage('subcategory/subcategoryeditpicture',formData)

  if(result)
        {
        Swal.fire({
            
            text: 'SubCategory Edited Succesfully',
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
                
                text: 'Fail to Edit SubCategory Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllSubCategory()
}

  const showSubCategoryForm=()=>{
    return(
      <div className={classes.root}>
          <div className={classes.subdiv}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                          <div>
                          <img src="/subcategoryicon.png" width="27"></img>
                          </div>
                          <div style={{fontSize:15,letterSpacing:1,fontWeight:800,color:'black'}}>
                              &nbsp;SubCategory Interface
                          </div>
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
                  <Grid item xs={12}>
                      <TextField value={subCategory} onChange={(event)=>setSubCategory(event.target.value)} fullWidth contained="outlined" label="Subcategory Name"></TextField>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField value={subCategoryDescription} onChange={(event)=>setSubCategoryDescription(event.target.value)} fullWidth contained="outlined" label="Description"></TextField>
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
                    {btnState?<span>
                    <Button onClick={()=>handleEditPicture()}>Save</Button>
                    <Button onClick={()=>handleCancel()}>Cancel</Button>
                    </span>:<></>}
                      <Avatar alt="subCategoryPicture"  src={subCategoryPicture.filename}></Avatar>
                  </Grid>

                  <Grid item xs={6}>
                      <Button onClick={()=>handleSubCategorySubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
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
          <DialogContentText id="alert-dialog-description">
            {showSubCategoryForm()}
          </DialogContentText>
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

    return (
        <div className={classes.root}>
            <div className={classes.subdivtable}>

        <MaterialTable
          title={<div style={{width:600,display:'flex', flexDirection:'row',alignItems:'center'}}>
          <div style={{padding:5}}>
          <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add New SubCategory</Button>
          </div>

          <div style={{marginLeft:80,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
            List Of SubCategories
          </div>
        </div>}
          columns={[
            { title: 'Category ID', render: (rowData) => (<div>{rowData.categoryid},{rowData.categoryname}</div>) },
            { title: 'SubCategory ID', field: 'subcategoryid' },
            { title: 'SubCategory Name', field: 'subcategoryname' },
            { title: 'Description', field: 'subcategorydescription' },
            { title: 'Icon', field: 'subcategoryicon',
            render: rowData =>( <Avatar
            alt="SubCategory"
            variant="rounded"
            src={`${ServerURL}/images/${rowData.subcategoryicon}`}
            sx={{ width: 56, height: 56 }}
            /> )
          },
          ]}

          data={list}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Save User',
              onClick: (event, rowData) => handleClickOpen(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Save User',
                onClick: (event, rowData) => handleDelete(rowData)
              }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
}