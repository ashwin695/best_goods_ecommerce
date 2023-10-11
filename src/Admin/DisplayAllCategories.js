import { useEffect,useState } from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid,TextField,Button,Avatar } from "@mui/material";
import { Save,ClearAll,List, Edit,AddBox } from "@mui/icons-material";
import { getData,postData,postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2";
import Categories from "./Categories";

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

export default function DisplayAllCategories(props){
  const classes = useStyles();
  const [list,setList]=useState([])
  const [open, setOpen] = useState(false);
  const [category,setCategory]=useState("")
  const [categoryId,setCategoryId]=useState("")
  const [btnState, setBtnState] = useState(false);
  const [picture,setPicture]=useState({filename:"/avatar.png",bytes:""})
  const [oldPicture,setOldPicture]=useState('')
  const fetchAllCategory=async()=>{
    var result=await getData("category/displayallcategory")
    setList(result.data)
  }

  useEffect(function(){
    fetchAllCategory()
  },[])

  const handleClick=()=>{
   // props.history.push({pathname:'/categories'})
   props.setComponent(<Categories setComponent={props.setComponent}/>)
  }

  const handleClickOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategory(rowData.categoryname)
    setOldPicture(rowData.icon)
    setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePicture=(event)=>{
    setPicture({filename:URL.createObjectURL(event.target.files[0]),
      bytes:event.target.files[0]})
      setBtnState(true);
  }

  const handleCancel=()=>{
    setBtnState(false)
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
  }

  const handleDelete=async(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',

      title: `Do you want to Delete ${data.categoryname}?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData("category/deletecategory",{categoryid : data.categoryid})
        if(result)
        {
          Swal.fire('Record Deleted Sucessfully...')
          fetchAllCategory()
        }
        else
        {
          Swal.fire('Fail to Delete Record...')
        }

      } else if (result.isDenied) {
        Swal.fire(`${data.categoryname} is Safe`)
      }
    })
  }

  const handleSubmit=async()=>{
    setOpen(false)
    var body={'categoryId':categoryId, 'categoryName':category}
    var result=await postData('category/updatecategorydata',body)

    if(result)
        {
        Swal.fire({
            
            text: 'Category Edited Succesfully',
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
                
                text: 'Fail to Edit Category Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllCategory()
  }

  const handleEditPicture=async()=>{
    setOpen(false)
    var formData=new FormData()
        formData.append('categoryId', categoryId)
        formData.append('icon', picture.bytes)
        
        var result=await postDataAndImage('category/categoryeditpicture', formData)

    if(result)
        {
        Swal.fire({
             
            text: 'Category Edited Succesfully',
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
                
                text: 'Fail to Edit Category Data',
                imageUrl: '/logo.jpg',
                imageWidth: 400,
                imageHeight: 100,
                imageAlt: 'Custom image',
                icon:'error'
            })
        }
        fetchAllCategory()
  }

  const showCategoryForm=()=>{
    return(
      <div className={classes.root}>
          <div className={classes.subdiv}>
              <Grid container spacing={2}>
               <Grid item xs={12} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                      <div>
                      <img src="/electronic.png" width='25'></img>
                      </div>
                      <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                          &nbsp;Edit Category
                      </div>
                      </Grid>

                  <Grid item xs={12}>
                      <TextField value={category} onChange={(event)=>setCategory(event.target.value)} fullWidth variant="outlined" label="Category Name"></TextField>
                  </Grid>
                  <Grid item xs={6}>
                      <label htmlFor="contained-button-file">
                          <input onChange={(event)=>handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file"></input>
                          <Button fullWidth variant="contained" component="span">Upload</Button>
                      </label>
                  </Grid>
                  <Grid item xs={6} className={classes.center}>
                    {btnState?<span>
                    <Button onClick={()=>handleEditPicture()}>Save</Button>
                    <Button onClick={()=>handleCancel()}>Cancel</Button>
                    </span>:<></>}
                      <Avatar alt="Pictures" src={picture.filename}></Avatar>
                  </Grid>
                  <Grid item xs={6}>
                      <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
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
          {showCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }

    return (
      <div className={classes.root}>
      <div className={classes.subdivtable}>

        <MaterialTable
          title={<div style={{width:600, display:'flex', flexDirection:'row',alignItems:'center'}}>
            <div style={{padding:5}}>
            <Button onClick={()=>handleClick()} startIcon={<AddBox />} variant="contained">Add New Category</Button>
            </div>

            <div style={{marginLeft:120,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>
              List Of Categories
            </div>
          </div>}
          columns={[
            { title: 'Categoryid', field: 'categoryid' },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Icon', field: 'icon', 
            render: rowData =><Avatar
            alt="Category"
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
              tooltip: 'Edit Category',
              onClick: (event, rowData) => handleClickOpen(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'Delete Category',
              onClick: (event, rowData) => handleDelete(rowData)
            }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
}