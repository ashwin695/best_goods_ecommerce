import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { postData } from "../FetchNodeServices";
import '../bestgoods.css'
import UserProfilePersonalInformation from "./UserProfilePersonalInformation";
import UserProfileAddress from "./UserProfileAddress";
import UserProfileOrder from "./UserProfileOrder";

const useStyles = makeStyles({
    image:{
        padding:20
    },
    margin:{
        margin:10,
        marginLeft:30
    },
    row:{
        display:'flex',
        flexDirection:'row',
        cursor:'pointer'
    },
    fldtxt:{
        display:'flex',
        padding:5,
        fontSize:15,
        letterSpacing:1
    },
    fldtxt2:{
        display:'flex',
        alignItems:'center',
        fontSize:16,
        letterSpacing:1,
        height:80,
    }
})

export default function UserProfileList(props) {
    const classes = useStyles()
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]
    const [view, setView] = React.useState("");

    var firstName = localStorage.getItem('firstname')
    var lastName = localStorage.getItem('lastname')
    var history = useHistory()

    const handleClick=(view)=>{
        props.setComponent(view)
    }
    const handleLogout=()=>{
        localStorage.clear()
        history.push("/home")
        //props.history.push({pathname:"/home"})
    }

    const name = () => {
        return(
            <Grid item xs={11.5}>
                <Paper className={classes.row}>
                    <Grid item xs={2.7}>
                        <img className={classes.image} src="/userprofile.jpg" width="45%"></img>
                    </Grid>
                    <Grid item xs={9} style={{margin:15}}>
                        <div className={classes.fldtxt} style={{fontWeight:'bold'}}>Hello,</div>
                        {/* <div className={classes.fldtxt}>{userData.firstname} {userData.lastname}</div> */}
                        <div className={classes.fldtxt}>{firstName} {lastName}</div>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
    const orderHistory = () => {
        return(
            <Grid item xs={11.5}>
                <Paper className={classes.row} onClick={()=>handleClick(<UserProfileOrder setComponent={props.setComponent}/>)}>
                    <Grid item xs={3.1}>
                        <img className={classes.image} src="/cart.png" width="34%"></img>
                    </Grid>
                    <Grid item xs={8.5} style={{}}>
                        <div className={classes.fldtxt2}>Orders History</div>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
    const myProfile = () => {
        return(
            <Grid item xs={11.5}>
                <Paper className={classes.row} onClick={()=>handleClick(<UserProfilePersonalInformation setComponent={props.setComponent}/>)}>
                    <Grid item xs={3.1}>
                        <img className={classes.image} src="/myprofile.jpg" width="36%"></img>
                    </Grid>
                    <Grid item xs={8.5} style={{}}>
                        <div className={classes.fldtxt2}>My Profile</div>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
    const address = () => {
        return(
            <Grid item xs={11.5}>
                <Paper className={classes.row} onClick={()=>handleClick(<UserProfileAddress setComponent={props.setComponent}/>)}>
                    <Grid item xs={3.1}>
                        <img className={classes.image} src="/address.png" width="40%"></img>
                    </Grid>
                    <Grid item xs={8.5} style={{}}>
                        <div className={classes.fldtxt2}>Address</div>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
    const logout = () => {
        return(
            <Grid item xs={11.5}>
                <Paper className={classes.row} onClick={()=>handleLogout()}>
                    <Grid item xs={3.1}>
                        <img className={classes.image} src="/logout.png" width="40%"></img>
                    </Grid>
                    <Grid item xs={8.5} style={{}}>
                        <div className={classes.fldtxt2}>Logout</div>
                    </Grid>
                </Paper>
            </Grid>
        )
    }

    return(
        <div style={{ width:"35%" }}>
            <div className={classes.margin}>
                {
                    firstName ?
                    name()
                    :
                    history.push("/signin")
                }
            </div>
            <div className={classes.margin}>
                {orderHistory()}
            </div>
            <div className={classes.margin}>
                {myProfile()}
            </div>
            <div className={classes.margin}>
                {address()}
            </div>
            <div className={classes.margin}>
                {logout()}
            </div>
        </div>
    )
}