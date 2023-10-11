import React,{ useEffect, useState, createRef } from "react";
import { Grid, AppBar, Box, Toolbar, Paper, Divider, Button, Modal, Typography } from "@mui/material";
import { getData, postData, ServerURL } from "../FetchNodeServices";
import { FormatListBulleted, LocalShipping, Cancel, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid darkgrey',
    boxShadow: 24,
    padding:2
};

var csettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    arrows:false,
    autoplay:false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed:3000,
};

export default function SuccessPage(props)
{   
    const [orderDetail, setOrderDetail] = useState([])
    const [orderLength, setOrderLength] = useState('')
    const [orderProductDetails, setOrderProductDetails] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [cancel, setCancel] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    var cSlider = createRef()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    var d = new Date()
    var day=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var month=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    d.setDate(d.getDate()+10)

    useEffect(function(){
        //window.scrollTo(0,0)
        fetchOrderDetail()
        fetchOrderProductDetails()
        fetchAllProducts()
        console.log("Success",orderDetail)
        console.log(props)
        console.log("Success",orderDetail)
    },[])

    const fetchOrderDetail=async()=> {
        var body={invoiceno:props.location.state.invoice}
        var result = await postData("orders/displaybyinvoiceno", body)
        setOrderDetail(result.data[0])
        if(result.result)
        {
            setOrderLength(result.data.length)
        }
    }
    const fetchOrderProductDetails=async()=>{
        var body={invoiceno:props.location.state.invoice}
        var result = await postData("orders/displayproductsbyinvoiceno", body)
        setOrderProductDetails(result.data)
    }
    const fetchAllProducts=async()=>{
        var result = await getData("finalproduct/displayallfinalproducts")
        setAllProducts(result.data)
    }
    const handleClick=()=>{
        props.history.push({pathname:'/userprofile'})
    }
    const handleForward=()=>{
        cSlider.current.slickNext()
    }
    const handleBack=()=>{
        cSlider.current.slickPrev()
    }
    const handleCancelOrder=async(invoice)=>{
        var result=await postData("orders/cancelorder", {invoiceno:invoice})
            fetchOrderDetail()
            fetchOrderProductDetails()
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
    const handleForView = (fpid) => {
        props.history.push({pathname:"/productview"}, {finalproductid:fpid})
    }

    const ShowAllProducts = () => {
        return(
            allProducts.map(function(item){
                return(
                    <div style={{ fontSize:36, fontWeight:'600', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5 }}>
                        <Paper style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:220, height:300, background:'#FFF', margin:10, padding:15 }} elevation={2}>
                            <div onClick={()=>handleForView(item.finalproductid)} style={{ textAlign:'center', cursor:'pointer', width:200, padding:10, fontSize:16, fontWeight:'600' }}>
                                {item.companyname} {item.productname} 
                            </div>
                            <div onClick={()=>handleForView(item.finalproductid)} style={{ padding:5, display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', width:320 }}>
                                <img src={`${ServerURL}/images/${item.icon}`} style={{width:150, height:150}} />
                            </div>
                        
                            <div onClick={()=>handleForView(item.finalproductid)} style={{ textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:15, fontWeight:'400' }}>
                                <div> {item.modelname} </div>
                            </div>
                            <div onClick={()=>handleForView(item.finalproductid)} style={{ textAlign:'center', cursor:'pointer', width:300 }}>
                                {item.offerprice>0?<div style={{ fontSize:16, fontWeight:'500', letterSpacing:1 }}>&#8377;{item.offerprice} <s style={{ color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:1 }}>&#8377;{item.price}</s> <div style={{ color:'darkgreen', fontSize:17, fontWeight:'500' }}>You Save &#8377; {item.price-item.offerprice}</div> </div> : <><div style={{ padding:12, fontSize:16, fontWeight:600, color:'#222f3e', letterSpacing:1 }}>&#8377; {item.price}</div></>}
                            </div>
                        </Paper>
                    </div>
                )
            })
        )
    }

    const fetchOrders = () => {
        return(
            orderProductDetails.map(function(item){
                return(
                    <Grid item xs={12} style={{ display:'flex' }}>
                        <Grid item xs={1.2}>
                            <img src={`${ServerURL}/images/${item.productimage}`} width="100%" />
                        </Grid>
                        
                        <Grid item xs={3.4} style={{ padding:5 }}>
                            <div style={{ fontSize:17, fontWeight:500 }}>{item.productname}</div>
                            <div style={{ fontSize:14, margin:'10px 0px 0px 0px', color:'grey' }}>Color : {item.colorname}</div>
                        </Grid>

                        <Grid item xs={3.8}>
                            <div style={{ display:'flex' }}>
                                <div style={{ padding:3 }}><LocalShipping /></div>
                                <div style={{ padding:3, fontSize:15 }}>Delivery expected by {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+"."}</div>
                            </div>
                            <div>
                                <div style={{ padding:3, fontSize:14, color:'grey' }}>Order Status : {item.status}</div>
                            </div>
                        </Grid>
                        
                        <Grid item xs={3}>
                            <div style={{ fontSize:17, fontWeight:500 }}>
                                {
                                    item.offerprice > 0 
                                    ?
                                    <span>
                                        <span>&#8377;{item.offerprice} &nbsp;</span>
                                        <s style={{ fontSize:15 }}>&#8377;{item.price}</s>
                                        <div style={{ fontSize:15, color:'green', fontWeight:'600' }}>You Saved &#8377;{item.price - item.offerprice}</div>
                                    </span>
                                    :
                                    <span>{item.price}</span>
                                }
                            </div>
                            <Button onClick={()=>handleOpen()} variant="outlined" size="small" startIcon={<Cancel />} style={{ display:'flex', margin:'15px 0px 0px 0px', cursor:'pointer', color:'#000', borderColor:'#000' }}>
                                Cancel Order
                            </Button>
                        </Grid>
                    </Grid>
                )
            })
        )
    }

    return(
        <Grid container spacing={1} style={{ display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#ecf0f1' }}>
            {/* <Header history={props.history}/> */}
            <Grid item xs={12}>
                <Box sx={{ flexGrow: 1 }} style={{ display:'flex' }}>
                    <AppBar position="static" style={{ height:80, background:'#fff' }}>
                        <Toolbar variant="dense">
                        <img
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            style={{cursor:'pointer', margin:'16px 0px 0px 50px'}}
                            src="/logo.jpg" width="190"
                            onClick={()=>props.history.push({pathname:"/home"})}
                        />
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>

            <Grid item xs={10} style={{ marginTop:10 }}>
                <Paper style={{ display:'flex', borderRadius:0 }}>
                    <Grid item xs={1.3} style={{ padding:25, display:'flex', justifyContent:'center', alignItems:'center' }}>
                        <img src="parcel2.png" width="90%" />
                    </Grid>
                    <Grid item xs={5} style={{ padding:15, display:'flex', flexDirection:'column', justifyContent:'center', margin:'0px 0px 0px 0px' }}>
                        <div style={{ fontSize:25, fontWeight:600, }}>Order Placed for &#8377;{orderDetail.amount}!</div>
                        {
                            orderLength>1
                            ?
                            <div>
                                Your {orderLength} items will be delivered by
                                <span style={{ fontWeight:600 }}> {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()}.</span>
                            </div>
                            :
                            <div>
                                Your {orderLength} item will be delivered by
                                <span style={{ fontWeight:600 }}> {day[d.getDay()]+", "+month[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()}.</span>
                            </div>
                        }
                    <div style={{ fontWeight:600, margin:'25px 0px 0px 0px', fontSize:16 }}>Order No : <span style={{fontWeight:400}}>{orderDetail.invoiceno}</span></div>
                    </Grid>
                    <Grid item xs={1.2} style={{ transform:'rotate(90deg)' }}>
                        <Divider style={{ width:130, color:'grey' }} />
                    </Grid>
                    <Grid item xs={3} style={{ padding:15, display:'flex', flexDirection:'column', justifyContent:'center', margin:'0px 0px 0px 0px' }}>
                        <div style={{ fontSize:20, fontWeight:600, }}>Easily check all your orders!</div>
                        <Button variant="contained" onClick={()=>handleClick()} style={{ width:200, marginTop:20, background:'#000' }} startIcon={<FormatListBulleted />}>My Orders</Button>
                    </Grid>
                    <Grid item xs={1} style={{ padding:0, display:'flex', justifyContent:'end', alignItems:'center' }}>
                        <img src="cart.png" width="70%" />
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={10} style={{ marginTop:15 }}>
                <Paper style={{ borderRadius:0, padding:20 }}>
                    <Grid item xs={6}>
                        <div style={{ padding:'5px 0px 10px 13px', fontWeight:600, fontSize:20 }}>Delivery Address</div>
                        <div style={{ padding:'5px 0px 0px 15px', fontSize:18, fontWeight:600 }}>{orderDetail.billingname}</div>
                        <div style={{ padding:'3px 0px 0px 15px', fontSize:15 }}>{orderDetail.address}</div>
                        <div style={{ padding:'0px 0px 0px 15px', fontSize:15 }}>{orderDetail.city} - {orderDetail.zipcode}, {orderDetail.state}</div>
                        <div style={{ padding:'8px 0px 0px 15px', fontSize:15, fontWeight:600 }}>{orderDetail.mobileno}</div>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={10} style={{ marginTop:15 }}>
                <Paper style={{ borderRadius:0, padding:10 }}>
                    <Grid item xs={12} style={{padding:10}}>
                        <div style={{ fontSize:18, fontWeight:600 }}>{orderLength} Ordered Items</div>
                    </Grid>
                    <Grid item xs={12} style={{ padding:5 }}>
                        <Divider style={{ color:'grey', height:0, width:'100%' }} />
                    </Grid>
                    <Grid item xs={12} style={{padding:10}}>
                        {fetchOrders()}
                    </Grid>
                    <Grid item xs={12} style={{ padding:5 }}>
                        <Divider style={{ color:'grey', height:0, width:'100%' }} />
                    </Grid>
                    <Grid item xs={12} style={{ display:'flex', }}>
                        <Grid item xs={7.5} style={{ display:'flex', flexDirection:'column', alignItems:'end' }}>
                            <div style={{ margin:8, fontWeight:600, fontSize:18 }}>Payable Amount</div>
                        </Grid>
                        <Grid item xs={1.5} style={{ display:'flex', flexDirection:'column' }}>
                            <div style={{ margin:8, fontWeight:600, fontSize:18 }}>:</div>
                        </Grid>
                        <Grid item xs={4} style={{ display:'flex', flexDirection:'column' }}>
                            <div style={{ margin:8, fontWeight:600, fontSize:18 }}>&#8377;{orderDetail.amount}</div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"row"}}> 
                <ArrowBackIosNew onClick={()=>handleBack()} style={{padding:20, backgroundColor:'#FFF', height:'1.5rem', borderRadius:50}} />
                    <div style={{width:'85%', padding:10}}>
                        <Slider ref={cSlider} {...csettings}>
                            {ShowAllProducts()}
                        </Slider>
                    </div>
                <ArrowForwardIos onClick={()=>handleForward()} style={{padding:20, backgroundColor:'#FFF', height:'1.5rem', borderRadius:50}} />
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ fontSize:20 }}>Confirm Cancel Order</div>
                    {/* <Typography id="modal-modal-title" variant="h5" component="h2">
                        Confirm Cancel Order
                    </Typography> */}
                    <p id="modal-modal-description" style={{ fontFamily:'sans-serif', color:'grey', paddingTop:10  }}>
                        <Grid item xs={12} style={{ margin:5 }}>
                            <Divider />
                        </Grid>
                        {
                            orderProductDetails.map(function(item){
                                return(
                                    <>
                                        <Grid item xs={12} style={{ display:'flex' }}>
                                            <Grid item xs={2.5} style={{ padding:5 }}>
                                                <img src={`${ServerURL}/images/${item.productimage}`} width="100%" />
                                            </Grid>
                                            
                                            <Grid item xs={9} style={{ display:'flex', flexDirection:'column', padding:10 }}>
                                                <div style={{ fontSize:15, fontWeight:500 }}>{item.productname}</div>
                                                <div style={{ fontSize:14, margin:'10px 0px 0px 0px', color:'grey' }}>Color : {item.colorname}</div>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} style={{ margin:10 }}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <span style={{ margin:10 }}>Are you sure you want to cancel this order ?</span>
                                        </Grid>
                                        <Grid item xs={12} style={{display:'flex', justifyContent:'end'}}>
                                            <Button variant="text" onClick={()=>handleOrderNotCancel()} style={{ color:'grey', marginTop:10 }}>No</Button>
                                            <Button variant="text" onClick={()=>handleCancelOrder(item.invoiceno)} style={{ color:'grey', marginTop:10 }}>Yes</Button>
                                        </Grid>
                                    </>
                                )
                            })
                        } 
                    </p>
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
                                <div style={{ fontSize:20 }}>Cancel Order</div>
                                :
                                <div style={{ fontSize:20 }}>Order Not Cancelled</div>
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
                            {
                                cancel ?
                                <Button variant="contained" onClick={handleClose2} style={{ color:'#fff', background:'#000', marginTop:10 }}>OK</Button>
                                :
                                <Button variant="contained" onClick={handleClose2} style={{ color:'#fff', background:'#000', marginTop:10 }}>OK</Button>
                            }
                        </Grid>
                        </Box>
                    </Modal>
                :
                <></>
            }
            <Grid item xs={12} style={{margin:'10% 0px 0px 0px'}}>
                <Footer />
            </Grid>
        </Grid>
    )
}