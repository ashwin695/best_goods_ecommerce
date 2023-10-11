import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Divider, Grid, Paper, Modal, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { postData, ServerURL } from "../FetchNodeServices";
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UserProfileOrder from "./UserProfileOrder";

const useStyles = makeStyles({
    function:{
        margin:10,
        padding:15,
        width:'100%',
    },
    fnhd:{
        fontWeight:700,
        fontSize:18,
        margin:10
    },
    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
    },
    divider:{
        backgroundColor:'#f39c12',
        height:2
    },
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 340,
    bgcolor: 'background.paper',
    border: '2px solid darkgrey',
    boxShadow: 24,
    p: 4,
};

export default function UserProfileBillProduct(props){
    const classes = useStyles()
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]
    const [billProduct, setBillProduct] = useState('')
    const [productByInvoice, setProductByInvoice] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [cancel, setCancel] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const handleClick=(view)=>{
        props.setComponent(view)
    }

    const fetchAllOrderData=async()=>{
        var result = await postData("orders/displayallorders", {orderid:props.orderId})
        setBillProduct(result.result)
    }
    const fetchBillDatabyInvoice=async()=>{
        var result = await postData("orders/displayproductsbyinvoiceno", {invoiceno:props.invoiceNo})
        setProductByInvoice(result.data)
    }

    useEffect(function(){
        fetchAllOrderData()
        fetchBillDatabyInvoice()
    },[])
    console.log(billProduct)
    console.log("PRODUCT BILL",productByInvoice)
    console.log(billProduct.invoiceno)

    const handleCancelOrder=async(invoice)=>{
        var result=await postData("orders/cancelorder", {invoiceno:invoice})
            fetchAllOrderData()
            fetchBillDatabyInvoice()
            setOpen(false)
            setCancel(true)
            setModalVisible(true)
            handleOpen2()
    }
    const handleOrderNotCancel = () => {
        setOpen(false)
        setCancel(false)
        setModalVisible(true)
        handleOpen2()
    }

    const fetchOrderBill = () => {
        return(
            productByInvoice.map(function(item){
                return(
                    <Grid item xs={12} style={{margin:10, display:'flex', flexDirection:'row'}}>
                        <Grid item xs={3} style={{ display:'flex', justifyContent:'start' }}>
                            <img src={`${ServerURL}/images/${item.productimage}`} style={{ width:'95%', height:150 }}  />
                        </Grid>
                        <Grid item xs={9}>
                            <Grid item xs={12}>
                                <div style={{fontSize:18, fontWeight:'700', color:'#57606f'}}>{item.productname} - {item.modelname}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>Color -</div>
                                <div style={{color:'#000', fontSize:14, display:'flex', alignItems:'center'}}>&nbsp;{item.colorname}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>Price -</div>
                                <div>
                                    &nbsp;{
                                        item.offerprice > 0 ?
                                        <span>
                                            <span style={{fontSize:14}}>&#8377;{item.offerprice} &nbsp;</span>
                                            <s style={{fontSize:14}}>&#8377;{item.price}</s>
                                            <div style={{fontSize:14, color:'green', fontWeight:'600'}}>You Saved &#8377;{item.price - item.offerprice}</div>
                                        </span>
                                        :
                                        <span style={{fontSize:14}}>{item.price}</span>
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>Quantity -</div>
                                <div style={{color:'#000', fontSize:14, display:'flex', alignItems:'center'}}>&nbsp;{item.qty}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                                <div style={{color:'#000', fontWeight:700, fontSize:16}}>{item.paymentmode}</div>
                            </Grid>
                            <Grid item xs={6} style={{display:'flex'}}>
                            <div style={{color:'#000', fontWeight:700, fontSize:16}}>Status -</div>
                                <div style={{color:'#000', fontSize:14, display:'flex', alignItems:'center'}}>&nbsp;{item.status}</div>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    return(
        <Grid item xs={12}>
            <Paper className={classes.function}>
                <Grid item xs={12} className={classes.root}>
                    <div className={classes.fnhd}>All Bill Products</div>
                    <div className={classes.fnhd}>Total Amount Paid &#8377;{billProduct.amount}</div>
                </Grid>
                <Grid item xs={12} style={{marginTop:5}}>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid item xs={12} style={{display:'flex', justifyContent:'end', padding:5}}>
                    <Button onClick={()=>handleOpen()} variant="contained" style={{backgroundColor:'#000'}} startIcon={<CancelIcon />}>
                        Cancel Order
                    </Button>
                </Grid>
                <Grid item xs={12} style={{display:'flex', flexDirection:'column'}}>
                   {fetchOrderBill()}
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} style={{display:'flex', flexDirection:'column', paddingTop:10}}>
                   <Button variant="contained" onClick={()=>handleClick(<UserProfileOrder setComponent={props.setComponent}/>)} style={{backgroundColor:'#000', color:'#fff'}} startIcon={<VisibilityIcon />}>Show All Orders</Button>
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Cancel Order
                    </Typography>
                    <p id="modal-modal-description" style={{ fontFamily:'sans-serif', color:'grey', paddingTop:10  }}>
                        Are you sure you want to cancel this order ?
                    </p>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'end'}}>
                        <Button onClick={()=>handleOrderNotCancel()} style={{ color:'grey', marginTop:10 }}>No</Button>
                        <Button onClick={()=>handleCancelOrder(billProduct.invoiceno)} style={{ color:'grey', marginTop:10 }}>Yes</Button>
                    </Grid>
                    </Box>
                </Modal>
                {
                    modalVisible ?
                        <Modal
                            open={open2}
                            onClose={handleClose2}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                {
                                    cancel ? 
                                    <div>Cancel Order</div>
                                    :
                                    <div>Order Not Cancelled</div>
                                }
                            </Typography>
                            <p id="modal-modal-description" style={{ fontFamily:'sans-serif', color:'grey', paddingTop:10  }}>
                                {
                                    cancel ? 
                                    <div>Your order has been cancelled now</div>
                                    :
                                    <div>Your order has not been cancelled</div>
                                }
                            </p>
                            <Grid item xs={12} style={{display:'flex', justifyContent:'end'}}>
                                <Button onClick={handleClose2} style={{ color:'grey', marginTop:10 }}>OK</Button>
                            </Grid>
                            </Box>
                        </Modal>
                    :
                    <></>
                }
            </Paper>
        </Grid>
    )
}