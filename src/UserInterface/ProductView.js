import React, { useEffect, useState } from "react"
import { makeStyles } from '@mui/styles';
import { Button, Avatar, Grid, Paper } from '@mui/material'
import Header from "./Header";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Footer from "./Footer";
import { postData, ServerURL } from "../FetchNodeServices";
import { useDispatch } from "react-redux";
import { ProductViewCartComponent, ShoppingCartComponent } from "./ShoppingCartComponent";

const useStyles = makeStyles({
    root:{
        background:"#FFF"
    }
})

export default function ProductView(props)
{
    const classes = useStyles()
    const [value, setValue] = React.useState(2);
    const [product, setProduct] = useState([])
    const [qty,setQty] = useState(0)
    const [refresh,setRefresh] = useState(false)

    var dispatch = useDispatch()

    const fetchProduct = async () => {
        var body = {finalproductid:props.location.state.finalproductid}
        var result = await postData("finalproduct/displayallfinalproductsbyproductid", body)
        setProduct(result.data)
    }

    useEffect(function(){
        window.scrollTo(0,0)
        fetchProduct()
    },[])
    console.log(product)

    const handleQtyChange=(value,product)=>{
        if(value>0)
        {
        product['qty'] = value
        setQty(value)
        dispatch({type:'ADD_ITEM', payload:[product.finalproductid,product]})
        }
        else
        {
        dispatch({type:'REMOVE_ITEM', payload:[product.finalproductid,product]})
        }
        setRefresh(!refresh)
    }

    return(
        <div className={classes.root}>
            <Header history={props.history}/>
            <Grid container spacing={1}>
                <Grid xs={12} style={{display:'flex', justifyContent:'center', marginTop:10}}>
                    <Grid xs={4} style={{ padding:50, margin:10, display:'flex', justifyContent:'center', }}>
                        <img src={`${ServerURL}/images/${product.icon}`} width="350" height="350"></img>
                    </Grid>


                    <Grid xs={6} style={{padding:50, margin:10,}}>
                        <Grid xs={12} style={{ padding:5 }}>
                            <div style={{ fontSize:20, fontWeight:600, fontFamily:'sans-serif', color:'#7f8c8d' }}>{product.companyname}</div>
                            <div style={{ fontSize:27, fontWeight:600, fontFamily:'sans-serif' }}>{product.productname} {product.modelname}</div>
                        </Grid>
                        <Grid xs={6} style={{display:'flex', flexDirection:'row'}}>
                            <Rating name="read-only" value={value} readOnly />
                            <span>
                                <Typography component="legend" style={{fontSize:15}}>Ratings</Typography>
                            </span>
                        </Grid>
                        <Grid xs={7} style={{ padding:15 }}>
                            <div style={{ fontSize:27, fontWeight:600, display:'flex', fontFamily:'sans-serif'}}>
                                {/* &#8377; 36000 */}
                                {product.offerprice > 0 ? 
                                    <div style={{fontSize:27, fontWeight:600, fontFamily:'sans-serif'}}>
                                        &#8377; {product.offerprice} &nbsp;
                                        <s style={{color:'#353b48', fontSize:18, fontWeight:600, letterSpacing:1,}}>
                                            &#8377;{product.price}
                                        </s>
                                        <span style={{color:'darkgreen', fontSize:18, fontWeight:600, letterSpacing:1,}}>
                                            &nbsp; You Save &#8377;{product.price-product.offerprice}
                                        </span>
                                    </div> : 
                                    <>
                                    <div style={{fontSize:27, fontWeight:600, fontFamily:'sans-serif'}}>
                                        &#8377; {product.price}
                                    </div>
                                    </>
                                }
                            </div>
                            <div style={{ color:'grey', fontSize:13, marginTop:10}}>Tax Included.</div>
                            <div style={{ color:'grey', fontSize:13, marginTop:10}}>or 3 interest free payments of &#8377;200 wifth ZEST</div>
                        </Grid>
                        <Grid xs={6} style={{display:'flex', flexDirection:'row',}}>
                            <div style={{margin:5}}>
                                <Avatar alt="Remy Sharp" src="grey.jpg" />
                            </div>
                            <div style={{margin:5}}>
                                <Avatar alt="Remy Sharp" src="black.jpg"  />
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div style={{padding:5, fontSize:14, fontWeight:500, color:'grey'}}>Colors</div>
                        </Grid>
                        
                        <Grid xs={12} style={{display:'flex', flexDirection:'row', padding:15}}>
                            {/* <div onChange={(value)=>handleQtyChange(value,product)} style={{borderRadius:30, border:'2px solid black', padding:15, width:280, margin:10, cursor:'pointer'}}>
                                <div style={{display:'flex', justifyContent:'center'}}>ADD TO CART</div>
                            </div> */}
                            <div>
                                <ProductViewCartComponent value={qty} onChange={(value)=>handleQtyChange(value, product)} />
                            </div>
                            <div style={{borderRadius:30, border:'2px solid black', padding:15, width:280, margin:10, background:'#000', cursor:'pointer'}}>
                                <div style={{display:'flex', justifyContent:'center', color:'#FFF',}}>BUY NOW</div>
                            </div>
                        </Grid>
                        <Grid xs={6} style={{ display:'flex', flexDirection:'row', padding:10 }}>
                            <img src="tag.png"width="20" style={{transform: 'rotate(270deg)',margin:5}}></img>
                            <div style={{padding:5, fontSize:15, fontWeight:700}}>Offers Available</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}