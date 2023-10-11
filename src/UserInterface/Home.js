import React,{useEffect,useState,createRef} from "react";
import Header from "./Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getData, ServerURL } from "../FetchNodeServices";
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Footer from "./Footer";
import '../bestgoods.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'

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
    arrows:false,
};

export default function Home(props){
    const theme  = useTheme()
    const matchesmd = useMediaQuery(theme.breakpoints.down('md'));
    const matchessm = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesxs = useMediaQuery(theme.breakpoints.up('sm'));
    const matcheslg = useMediaQuery(theme.breakpoints.down('lg'));
    //console.log("LARGE",matcheslg)
    var csettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        arrows:false,
        autoplay:false,
        slidesToShow: matcheslg ? matchesmd ? matchessm ? matchesxs ? 1 : 2 : 3 : 4 : 6,
        slidesToScroll: 1,
        autoplaySpeed:3000,
    };

    //console.log("Home",props)
    const classes = useStyles(props);
    var cSlider = createRef()
    const [listBanner,setListBanner]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [trendingList,setTrendingList]=useState([])
    const [newArrivalList,setNewArrivalList]=useState([])

    const handleForSubCategory = (cid) => {
        props.history.push({pathname: "/listsubcategoryfromcategory"}, {categoryid:cid})
    }
    /* const handleForProducts=(sid)=>{
        props.history.push({pathname:`/productlist/${sid}`}, {subcategoryid:sid})
    } */
    const handleForProducts=(sid)=>{
        props.history.push({pathname:"/productlist"}, {subcategoryid:sid})
    }

    const showSliderLarge=()=>{
        return listBanner.map((item)=>{
            return <div><img src={`${ServerURL}/images/${item.image}`} style={{width:'100%'}} /></div>
        }) 
    }

    const showCategoriesLarge=()=>{
        return categoryList.map((item)=>{
            return <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div onClick={()=>handleForSubCategory(item.categoryid)} style={{cursor:'pointer', display:'flex', justifyContent:'center', alignItems:'center', padding:10, width:'80%', height:170, borderRadius:'50%', background:'#FFF', margin:10}}>
                    <img className="categoryzoomout" src={`${ServerURL}/images/${item.icon}`} width="60%" />
                </div>
            <div onClick={()=>handleForSubCategory(item.categoryid)} style={{cursor:'pointer', textAlign:'center', fontSize:18, fontWeight:'bold'}}>{item.categoryname}</div>
            </div>
        }) 
    }

    const showSubCategories=()=>{
        return subCategoryList.map((item, index)=>{
            return(index<=8 ?
            <Paper onClick={()=>handleForProducts(item.subcategoryid)} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:350, height:350, background:'#FFF', margin:8, padding:8}} elevation={2}>

                <div style={{cursor:'pointer', display:'flex', alignItems:'center', padding:5, fontSize:22, fontWeight:'bold',letterSpacing:1}}>{item.subcategoryname}</div>
                <div style={{display:'flex', textAlign:'center', padding:10, fontSize:14, fontWeight:600, color:'#222f3e',letterSpacing:1}}>{item.subcategorydescription}</div>
                <div style={{cursor:'pointer', fontSize:16, fontWeight:'bold', color:'red', padding:8, display:'flex', alignItems:'center'}}>View All&nbsp;{<ArrowForwardIosIcon style={{fontSize:16}} />}</div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:25}}>
                    <img src={`${ServerURL}/images/${item.subcategoryicon}`} style={{width:150, height:150}} />
                </div>
            </Paper>
            :<></>
            )
        }) 
    }

    const showTrendings=()=>{
        return trendingList.map((item, index)=>{
            return(index<=4 ?
            <div onClick={()=>handleForProducts(item.subcategoryid)} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10,}}>
            <Paper style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:230, height:230, background:'#FFF', margin:5, padding:5, borderRadius:18}} elevation={5}>

                <div style={{padding:5, display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img src={`${ServerURL}/images/${item.icon}`} style={{width:150, height:150}} />
                </div>
            </Paper>
            <div style={{padding:10, fontSize:16, fontWeight:'500'}}>{item.productname}</div>
            {item.offerprice>0?<div style={{fontSize:20, fontWeight:'500', letterSpacing:1,}}>&#8377;{item.offerprice} <s style={{color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:2,}}>&#8377;{item.price}</s></div> : <div style={{fontSize:20, fontWeight:600, color:'#222f3e',letterSpacing:1}}>&#8377;{item.price}</div>}
            </div>
            :<></>
            )
        }) 
    }

    const showNewArrivals=()=>{
        return newArrivalList.map((item, index)=>{
            return(index<=4 ?
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10,}}>
            <Paper style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:230, height:230, background:'#FFF', margin:5, padding:5, borderRadius:18}} elevation={5}>

                <div style={{padding:5, display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img src={`${ServerURL}/images/${item.icon}`} style={{width:150, height:150}} />
                </div>
            </Paper>
            <div style={{padding:10, fontSize:16, fontWeight:'500'}}>{item.productname}</div>
            {item.offerprice>0?<div style={{fontSize:20, fontWeight:'500', letterSpacing:1,}}>&#8377;{item.offerprice} <s style={{color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:2,}}>&#8377;{item.price}</s></div> : <div style={{fontSize:20, fontWeight:600, color:'#222f3e',letterSpacing:1}}>&#8377;{item.price}</div>}
            </div>
            :<></>
            )
        }) 
    }

    useEffect(function(){
        fetchAllBanners()
        fetchAllCategory()
        fetchAllSubCategory()
        fetchAllTrendings()
        fetchAllNewArrivals()
    },[])

    const fetchAllCategory=async()=>{
        var result=await getData("category/displayallcategory")
        setCategoryList(result.data)
    }

    const fetchAllSubCategory=async()=>{
        var result=await getData("subcategory/displayallsubcategory")
        setSubCategoryList(result.data)
    }

    const fetchAllBanners=async()=>{
        var result=await getData("banner/displayallbanner")
        setListBanner(result.data)
    }

    const fetchAllTrendings=async()=>{
        var result=await getData("finalproduct/displayallfinalproductstrending")
        setTrendingList(result.data)
    }

    const fetchAllNewArrivals=async()=>{
        var result=await getData("finalproduct/displayallfinalproductsnewarrival")
        setNewArrivalList(result.data)
    }

    const handleForward=()=>{
        cSlider.current.slickNext()
    }

    const handleBack=()=>{
        cSlider.current.slickPrev()
    }

    return(
        <div className={classes.root}>
            <Header history={props.history}/>
            <div style={{marginTop:65}}>
              <Slider {...settings}>
                  {showSliderLarge()}
              </Slider>
              
              
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:"row"}}> 
              <ArrowBackIosNewIcon onClick={()=>handleBack()} style={{padding:20, backgroundColor:'#FFF', height:'1.5rem', borderRadius:50}} />
                   <div style={{width:'80%', padding:10}}>
                      <Slider ref={cSlider} {...csettings}>
                          {showCategoriesLarge()}
                     </Slider>
                  </div>
              <ArrowForwardIosIcon onClick={()=>handleForward()} style={{padding:20, backgroundColor:'#FFF', height:'1.5rem', borderRadius:50}} />
              </div>
              

              <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:10, flexWrap:'wrap'}}>
              {showSubCategories()}
              </div>
              
              {/* <div style={{marginTop:40, fontSize:35, fontWeight:'600', letterSpacing:1, display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:10, flexWrap:'wrap', fontFamily:'sans-serif'}}>
                  Trending Products
              </div> */}
              <div style={{margin:'40px 0px 0px 70px', display:'flex', flexDirection:'row', justifyContent:'space-between', padding:8}}>
                <div style={{fontSize:32, fontWeight:'600', fontFamily:'sans-serif'}}>Trending Products</div>
                <div onClick={()=>props.history.push({pathname:"/showalltrendings"})} style={{margin:'0px 80px 0px 0px',background:'#000', color:'#FFF', padding:8, width:110, borderRadius:20, textAlign:'center', cursor:'pointer'}}>
                    {"View All"}
                </div>
              </div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:3, flexWrap:'wrap'}}>
              {showTrendings()}
              </div>
              {/* <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:10, flexWrap:'wrap'}}>
                  <div style={{background:'#000', color:'#FFF', padding:12, width:110, borderRadius:20, textAlign:'center', cursor:'pointer'}}>
                      {"View All"}
                  </div>
              </div> */}

            
              <div style={{margin:'40px 0px 0px 70px', display:'flex', flexDirection:'row', justifyContent:'space-between', padding:8}}>
                <div style={{fontSize:32, fontWeight:'600', fontFamily:'sans-serif'}}>New Arrivals</div>
                <div onClick={()=>props.history.push({pathname:"/shownewarrivals"})} style={{margin:'0px 80px 0px 0px',background:'#000', color:'#FFF', padding:8, width:110, borderRadius:20, textAlign:'center', cursor:'pointer'}}>
                    {"View All"}
                </div>
              </div>
              
              <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', padding:3, flexWrap:'wrap'}}>
                {showNewArrivals()}
              </div>
              
            </div>
            
            <Footer />
            
        </div>
    )
}