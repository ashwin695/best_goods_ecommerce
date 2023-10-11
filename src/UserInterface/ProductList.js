import React,{useEffect,useState} from "react";
import Header from "./Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getData, postData, postDataAndImage,ServerURL } from "../FetchNodeServices";
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper'
import {ShoppingCartComponent} from "./ShoppingCartComponent";
import { useDispatch } from "react-redux";
import SideBar from "./SideBar";
import Footer from "./Footer";

const useStyles = makeStyles({
    root:
    {
        background:'#ecf0f1',
    },
})

var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed:3000,
};

export default function ProductList(props){
    console.log(props)
    const classes = useStyles(props);
    const [listProducts,setListProducts]=useState([])
    const [qty,setQty] = useState(0)
    const [refresh,setRefresh] = useState(false)
    const [subCategoryBannerList,setSubCategoryBannerList] = useState([])

    var dispatch = useDispatch()

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

    const handleForView = (fpid) => {
        props.history.push({pathname:"/productview"}, {finalproductid:fpid})
    }
    
    const fetchAllProductList=async()=>{
        //var body={subcategoryid: props.match.params.id}
        var body={subcategoryid:props.location.state.subcategoryid}
        var result=await postData("finalproduct/displayallfinalproductsbysubcategoryid", body)
        setListProducts(result.data)
    }

    const fetchAllProductByPrice=async(min, max)=>{
        //var body={min:min, max:max, subcategoryid: props.match.params.id}
        var body={min:min, max:max, subcategoryid:props.location.state.subcategoryid}
        var result=await postData("finalproduct/displayallfinalproductsbyprice", body)
        setListProducts(result.data)
    }

    const fetchAllSubCategoryBannerById=async()=>{
        //var body={subcategoryid: props.match.params.id}
        var body={subcategoryid:props.location.state.subcategoryid}
        var result=await postData("subbanner/displayallsubbannerbyid", body)
        setSubCategoryBannerList(result.data)
    }

    const showProducts=()=>{
        return listProducts.map((item)=>{
            return <div style={{fontSize:36, fontWeight:'600', letterSpacing:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:5, }}>
            <Paper style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:320, height:380, background:'#FFF', margin:10, padding:8, }} elevation={2}>
                <div onClick={()=>handleForView(item.finalproductid)} style={{textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:16, fontWeight:'600', letterSpacing:1,}}>
                     {item.companyname} {item.productname} 
                </div>
                <div onClick={()=>handleForView(item.finalproductid)} style={{padding:5, display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', width:320}}>
                    <img src={`${ServerURL}/images/${item.icon}`} style={{width:150, height:150}} />
                </div>
            
            <div onClick={()=>handleForView(item.finalproductid)} style={{textAlign:'center', cursor:'pointer', width:300, padding:10, fontSize:16, fontWeight:'400', letterSpacing:1,}}>
                
                <div> {item.modelname} </div>
                </div>
            <div onClick={()=>handleForView(item.finalproductid)} style={{textAlign:'center', cursor:'pointer', width:300,}}>
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
        fetchAllProductList()
        fetchAllSubCategoryBannerById()
    },[])

    return(
        <div className={classes.root}>
            <Header history={props.history}/>

            {/* <Slider {...settings} style={{marginTop:67}}>
                  {showSlider()}
              </Slider> */}

            <div style={{display:'flex', flexDirection:'row', marginTop:10}}>
            <div>
                <SideBar fetchAllProductByPrice={fetchAllProductByPrice}/>
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:10, flexWrap:'wrap'}}>
            {showProducts()}
            </div>
            </div>
            <Footer />
        </div>
    )
}