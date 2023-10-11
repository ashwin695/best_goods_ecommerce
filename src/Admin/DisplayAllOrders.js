import React from "react";
import { Grid } from "@mui/material";

export default function DisplayAllOrders(){

    return(
        <Grid container spacing={1} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Grid item xs={12} style={{backgroundColor:'#ecf0f1', display:'flex', justifyContent:'center', alignItems:'center', marginTop:10, padding:10, width:500, borderRadius:5}}>
                <Grid item xs={12} style={{backgroundColor:'#fff', padding:15}}>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
                        <div style={{fontSize:22, fontWeight:600, fontFamily:'sans-serif'}}>List Of Orders</div>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex', justifyContent:'space-between', padding:5}}>
                        <Grid item xs={4} style={{fontSize:16, fontFamily:'sans-serif'}}>Invoice No</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}