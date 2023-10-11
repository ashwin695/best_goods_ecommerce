import React,{useEffect,useState,createRef} from "react";
import Header from "./Header";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";

export default function MyCart(props)
{
    var cart = useSelector(state=>state.cart)
    var keys = Object.keys(cart)
    var cartItems = Object.values(cart)

    var totalAmount = cartItems.reduce((a,b)=>getTotalAmount(a,b),0)
    function getTotalAmount(p1,p2){
        var price = p2.offerprice>0 ? p2.offerprice*p2.qty : p2.price*p2.qty
        return(price + p1)
    }

    var netAmount = cartItems.reduce((a,b)=>getNetAmount(a,b),0)
    function getNetAmount(p1,p2){
        var price = p2.price*p2.qty
        return(price + p1)
    }

    var savings = cartItems.reduce((a,b)=>getSavings(a,b),0)
    function getSavings(p1,p2){
        var price = p2.offerprice>0 ? (p2.price-p2.offerprice)*p2.qty : 0
        return(price + p1)
    }

    const handleClick = () => {
        props.history.push({pathname:'/home'})
    }

    return(
        <div>
            <Header history={props.history}/>
            <Grid container spacing={1}>
                {
                    keys.length > 0 ?
                    <></>
                    :
                    <Grid item xs={12} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:'80px 0px 0px 0px'}}>
                        <div style={{display:'flex', justifyContent:"center"}}>
                            <img src="emptycart.png" alt="empty cart" width="70%" />
                        </div>
                        <div style={{display:'flex', justifyContent:'center', fontSize:20, fontWeight:600, margin:2, }}>OOPS..!! Your Shopping Cart is Empty</div>
                        <div style={{display:'flex', justifyContent:'center', fontSize:17, fontWeight:400, margin:2, }}>I think you wanna go and add some </div>
                        <div style={{display:'flex', justifyContent:'center', fontSize:17, fontWeight:400, margin:2, }}>favorites.</div>

                        <Grid item xs={12} onClick={()=>handleClick()} style={{ padding:20 }}>
                            <Button variant="contained" style={{ backgroundColor:'#000', padding:10, fontSize:14, borderRadius:5, width:300 }}>Start Shopping</Button>
                        </Grid>
                    </Grid>
                }
            </Grid>
        </div>
    )
}