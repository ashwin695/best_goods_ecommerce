import { Paper, Grid } from "@mui/material";
import Footer from "./Footer";
import { getData, ServerURL, postData } from '../FetchNodeServices';
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Header from "./Header";

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

export default function ListSubCategoryFromCategory(props) {
    const classes = useStyles()
    const [listAllSubCategory, setListAllSubCategory] = useState([])

    const fetchAllSubCategory=async()=>{
        var body={categoryid:props.location.state.categoryid}
        var result=await postData("subcategory/displayallsubcategorybycategory", body)
        setListAllSubCategory(result.data)
    }

    useEffect(function(){
        fetchAllSubCategory()
    },[])

    const handleForProducts=(sid)=>{
        props.history.push({pathname:"/productlist"}, {subcategoryid:sid})
    }

    const showAllPersonalised=()=>{
        return listAllSubCategory.map((item)=>{
            return(
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10 }}>
                    <Paper elevation={5} onClick={()=>handleForProducts(item.subcategoryid)} style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:350, height:250, cursor:'pointer'}}>
                        <Grid item xs={12} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <img src={`${ServerURL}/images/${item.subcategoryicon}`} width="200" height="190"></img>
                        </Grid>
                        <Grid item xs={12} style={{ display:'flex', color:'#000', padding:15 }}>
                            <span style={{ fontSize:20, fontWeight:500, }}>{item.subcategoryname}</span>
                        </Grid>
                    </Paper>
                </div>
            )
        })
    }

    return(
        <div className={classes.root}>
            <Grid item xs={12}>
                <Header history={props.history} />
            </Grid>
            <Grid item xs={12} style={{display:'flex', flexDirection:'row', padding:15, justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
                {showAllPersonalised()}
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </div>
    )
}