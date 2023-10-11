import React, {useState, useEffect} from "react";
import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { Grid } from "@mui/material";
import '../bestgoods.css'
import UserProfileList from "./UserProfileList";

const useStyles = makeStyles({
    root:{
        background:'whitesmoke',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        padding:19
    },
    center:{
        display:'flex',
        justifyContent:'center', 
        alignItems:'center'
    }
})

export default function UserProfile(props){
    const classes = useStyles()
    const [view, setView] = React.useState("");
    const setComponent=(v)=>{
        setView(v)
    }

    return(
        <div className={classes.root}>
            <Header />
            <div style={{display:'flex'}}>
                <UserProfileList setComponent={setComponent} />
                <div style={{ width:"60%" }}>
                    {view}
                </div>
            </div>
            <Grid item xs={12} style={{margin:40, fontSize:14, letterSpacing:1}}>
                <div className={classes.center}>
                    <span>By continuing you agree to our</span>
                    <span style={{color:'red', cursor:'pointer'}}>&nbsp;Terms of service</span>
                </div>
                <div className={classes.center}>
                    <span>and</span>
                    <span style={{color:'red', cursor:'pointer'}}>&nbsp;Privacy & Legal Policy.</span>
                </div>
            </Grid>
        </div>
    )
}