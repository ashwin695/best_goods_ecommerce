import React, {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { Divider, Grid, ListItem, ListItemText, MenuItem, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { postData } from "../FetchNodeServices";
import '../bestgoods.css'
import moment from "moment";
import ReceiptIcon from '@mui/icons-material/Receipt';
import UserProfileBillProduct from "./UserProfileBillProduct";

const useStyles = makeStyles({
    function:{
        margin:10,
        padding:15,
        width:'100%',
    },
    fnhd:{
        fontWeight:700,
        fontSize:23
    },
    divider:{
        backgroundColor:'#f39c12',
        height:2
    },
    root:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    lnth:{
        fontSize:17,
        fontWeight:600
    },
    row:{
        margin:4,
        fontSize:15,
    },
    center:{
        display:'flex',
        justifyContent:'center'
    },
    btn:{
        border:'none',
        backgroundColor:'transparent',
        height:30,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default function UserProfileOrder(props){
    const classes = useStyles()
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]
    const [orderStatus, setOrderStatus] = useState({status:false, data:[]})
    const [orderLength, setOrderLength] = useState('')
    const [myOrder, setMyOrder] = useState(true)

    var mobileNo = localStorage.getItem('mobileno')

    const checkOrder=async()=>{
        //var result=await postData("orders/checkuserorder",{mobileno:userData.mobileno})
        var result=await postData("orders/checkuserorder",{mobileno:mobileNo})
        setOrderStatus({status:result.result,data:result.data})
        if(result.result)
        {
            setOrderLength(result.data.length)
        }
        
    }
    useEffect(function(){
        checkOrder()
    },[])
    console.log("Order",orderStatus)

    const handleShowBill = (view) => {
        //alert(event.currentTarget.value)
        props.setComponent(view)
        //props.history.push({pathname:"/productlist"}, {orderid:oid})
    }

    const fetchOrders = () => {
        return orderStatus.data.map((item) => {
            return(
                <>
                <MenuItem className={classes.btn} value={item.orderid} onClick={()=>handleShowBill(<UserProfileBillProduct setComponent={props.setComponent} orderId={item.orderid} invoiceNo={item.invoiceno}/>)}>
                <Grid item xs={12} className={classes.root}>
                    <Grid item xs={4} className={classes.row}>
                        <div>{moment(item.orderdate).format("YYYY/MM/DD")}</div>
                    </Grid>
                    <Grid item xs={4} style={{margin:4, fontSize:14}} className={classes.row}>
                        <div>{item.amount}</div>
                    </Grid>
                    <Grid item xs={4} style={{margin:4, fontSize:14}} className={classes.row}>
                        <div>{item.invoiceno}</div>
                    </Grid>
                    <Grid item xs={4} style={{margin:4, fontSize:14}} className={classes.row}>
                        <ReceiptIcon style={{cursor:'pointer', display:'flex', alignItems:'center'}} />
                    </Grid>
                    <Grid item xs={4} style={{margin:4, fontSize:14}} className={classes.row}>
                        <div>{item.status}</div>
                    </Grid>
                </Grid>
                </MenuItem>
                <Divider />
                </>
            )
        })
    }

    return(
        <Grid item xs={12}>
            <Paper className={classes.function}>
                <Grid item xs={12} style={{margin:12}}>
                    {
                        orderStatus.status ?
                        <Grid item xs={12}>
                            <Grid item xs={12} className={classes.root}>
                                <div className={classes.fnhd}>MY ORDER</div>
                                <div className={classes.lnth}>{orderLength} order had placed from your Account</div>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:5}}>
                                <Divider className={classes.divider}/>
                            </Grid>
                            <Grid item xs={12} style={{marginTop:5, fontWeight:600}} className={classes.root}>
                                <Grid item xs={4}>
                                    <div>Order Placed</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>Total Amount Paid</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>Order No.</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>Show Bill</div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div>Status</div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {fetchOrders()}
                            </Grid>
                        </Grid>
                        :
                        <div style={{fontSize:26, fontWeight:700}}>No Order has Placed from your Account</div>
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}