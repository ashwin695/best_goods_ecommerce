import { Paper, Grid } from "@mui/material";
import React,{useEffect,useState} from "react";
import Header from "./Header";
import { makeStyles } from '@mui/styles';
import { ServerURL, getData, postData } from "../FetchNodeServices";
import SideBar from "./SideBar";
import { ShoppingCartComponent } from "./ShoppingCartComponent";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

const useStyles = makeStyles({
    root:
    {
        background:'#ecf0f1',
    },
})

export default function ShowAllTrendings(props){
    const classes = useStyles(props);
    var dispatch = useDispatch()

    const [trendingList,setTrendingList]=useState([])
    const [listProducts,setListProducts]=useState([])
    const [qty,setQty] = useState(0)
    const [refresh,setRefresh] = useState(false)
    const [allProducts, setAllProducts] = useState([])

    const handleQtyChange=(value,item)=>{
        if(value>0)
        {
        item['qty'] = value
        setQty(value)
        dispatch({type:'ADD_ITEM', payload:[item.finalproductid,item]})
        }
        else
        {
        dispatch({type:'REMOVE_ITEM', payload:[item.finalproductid,item]})
        }
        setRefresh(!refresh)
    }

    const showTrendings=()=>{
        return trendingList.map((item)=>{
            return <div style={{fontSize:36, fontWeight:'600', letterSpacing:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5, }}>
            <Paper style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:320, height:380, background:'#FFF', margin:10, padding:8, }} elevation={2}>
                <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:16, fontWeight:'600', letterSpacing:1,}}>
                     {item.companyname} {item.productname} 
                </div>
                <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{padding:5, display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', width:320}}>
                    <img src={`${ServerURL}/images/${item.icon}`} style={{width:150, height:150}} />
                </div>
            
            <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:16, fontWeight:'400', letterSpacing:1,}}>
                
                <div> {item.modelname} </div>
                </div>
            <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{textAlign:'center', cursor:'pointer', width:300,}}>
                {item.offerprice>0?<div style={{fontSize:18, fontWeight:'500', letterSpacing:1,}}>&#8377; {item.offerprice} <s style={{color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:2,}}>&#8377;{item.price}</s> <div style={{color:'darkgreen', fontSize:18, fontWeight:'500', letterSpacing:1,}}>You Save &#8377; {item.price-item.offerprice}</div> </div> : <><div style={{padding:12, fontSize:18, fontWeight:600, color:'#222f3e',letterSpacing:1}}>&#8377; {item.price}</div></>}
            </div>
            <div sx={{padding:5}}>
            <ShoppingCartComponent value={qty} onChange={(value)=>handleQtyChange(value,item)} />
            </div>
            </Paper>
            </div>
        })
    }
    const showAllProducts=()=>{
        return allProducts.map((item)=>{
            return <div style={{fontSize:36, fontWeight:'600', letterSpacing:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5, }}>
            <Paper style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:320, height:380, background:'#FFF', margin:10, padding:8, }} elevation={2}>
                <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:16, fontWeight:'600', letterSpacing:1,}}>
                     {item.companyname} {item.productname} 
                </div>
                <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{padding:5, display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', width:320}}>
                    <img src={`${ServerURL}/images/${item.icon}`} style={{width:150, height:150}} />
                </div>
            
            <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:16, fontWeight:'400', letterSpacing:1,}}>
                
                <div> {item.modelname} </div>
                </div>
            <div /* onClick={()=>handleForView(item.finalproductid)} */ style={{textAlign:'center', cursor:'pointer', width:300,}}>
                {item.offerprice>0?<div style={{fontSize:18, fontWeight:'500', letterSpacing:1,}}>&#8377; {item.offerprice} <s style={{color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:2,}}>&#8377;{item.price}</s> <div style={{color:'darkgreen', fontSize:18, fontWeight:'500', letterSpacing:1,}}>You Save &#8377; {item.price-item.offerprice}</div> </div> : <><div style={{padding:12, fontSize:18, fontWeight:600, color:'#222f3e',letterSpacing:1}}>&#8377; {item.price}</div></>}
            </div>
            <div sx={{padding:5}}>
            <ShoppingCartComponent value={qty} onChange={(value)=>handleQtyChange(value,item)} />
            </div>
            </Paper>
            </div>
        })
    }

    useEffect(function(){
        window.scrollTo(0,0)
        fetchAllTrendings()
        fetchAllProductsexcepttrending()
    },[])

    const fetchAllTrendings=async()=>{
        var result=await getData("finalproduct/displayallfinalproductstrending")
        setTrendingList(result.data)
    }
    const fetchAllProductByPrice=async(min, max)=>{
        var body={min:min, max:max, subcategoryid:props.location.state.subcategoryid}
        var result=await postData("finalproduct/displayallfinalproductsbyprice", body)
        setListProducts(result.data)
    }
    const fetchAllProductsexcepttrending=async()=>{
        var result=await getData("finalproduct/displayallfinalproductsexcepttrending")
        setAllProducts(result.data)
    }

    return(
        <div className={classes.root}>
            <Header history={props.history}/>

            <div style={{display:'flex', flexDirection:'row', marginTop:10}}>
                <div>
                    <SideBar fetchAllProductByPrice={fetchAllProductByPrice}/>
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:10, flexWrap:'wrap'}}>
                    {showTrendings()}
                    {showAllProducts()}
                </div>
            </div>
            <Footer />
        </div>
    )
}