import React,{useState} from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Grid } from "@mui/material";
import Input from '@mui/material/Input';
import { FacebookIcon, Twitter, Instagram, Pinterest, Youtube} from '@mui/icons-material/Facebook';


const useStyles=makeStyles({
    footer:{
        width:'100%',
        background:'#222f3e',
        marginTop:10,
        //padding:30,
        //position:"fixed",
        //bottom:0,
        display:'flex',
        flexDirection:'row',
    },
    font:{
        color:'#FFF',
        fontSize:30,
        marginTop:40,
    },
    subFont:{
        display:'flex',
        flexDirection:'column', 
        color:'#bdc3c7', 
        fontSize:15,
        letterSpacing:1,
        wordSpacing:2,
    },
    style:{
        color:'#000',
        backgroundColor:'#FFF'
    },
    placeholder:{
        color:"white"
    }
})         

export default function Footer(props)
{
    const classes=useStyles(props)

    return(
        <div>
        <div style={{width:'100%',background:'#FFF',marginTop:10,}}>
            <div style={{display:'flex', justifyContent:'center', fontSize:40, fontWeight:'bold', color:'#000'}}>CONTACT US</div>
            <Grid container spacing={2}>
            <Grid item xs={6} style={{marginBottom:10}}>
            <p style={{fontSize:17, fontWeight:700, display:'flex', justifyContent:'center', color:'#000'}}>For Complaints</p>
            <div style={{fontSize:17, display:'flex', justifyContent:'center', color:'#000'}}>E-Mail : {<u>bestgoods123@gmail.com</u>}</div>
            <div style={{fontSize:17, display:'flex', justifyContent:'center', color:'#000'}}>Mobile No : {<u>1234567890</u>}</div>
            <div style={{fontSize:17, display:'flex', justifyContent:'center', color:'#000'}}>Need Help : {<u>Click Here</u>}</div>
            </Grid>
            <Grid item xs={6} style={{marginBottom:10}}>
            <p style={{fontSize:17, fontWeight:600, display:'flex', justifyContent:'center', color:'#000'}}>For Business Queries</p>
            <div style={{fontSize:17, display:'flex', justifyContent:'center', color:'#000'}}>www.bestgoods.com</div>
            <div style={{fontSize:17, display:'flex', justifyContent:'center', color:'#000'}}>Track Order : {<u>Click Here</u>}</div>
            </Grid>
            </Grid>
        </div>

        <div style={{width:'100%',background:'#222f3e',}}>
        <br></br>
        <p style={{display:'flex', justifyContent:'center', fontSize:30, color:'#FFF', fontFamily:'-moz-initial', letterSpacing:1, marginTop:30}}>Join the Club</p> 
        <div style={{display:'flex', justifyContent:'center', fontSize:13, color:'#FFF', marginBottom:20}}>Subscribe today to hear about our newest offers, new products, collaborations, everything Portronics - Directly to your inbox.</div>
        <div style={{color:'#FFF', display:'flex', justifyContent:'center', padding:20, position:'relative', maxWidth:400, margin:'0 auto'}}>
            <input type="email" id="email" placeholder="Enter Your Email" style={{backgroundColor:'transparent', color:'inherit', border:0, borderBottom:'2px solid', borderBottomColor:'#000000', borderBottomColor:'var(--colorTextBody)', width:'100%', padding:'8px 0', borderRadius:0}}></input>
        </div>
        </div>

        <div style={{width:'100%',background:'#FFF',}}>
            <br></br>
        <span style={{display:'flex', justifyContent:'center',padding:10,margin:20}}>
            <img style={{margin:5}} src="/instagram.png" width="55"></img>
            <img style={{margin:5}} src="/facebook.png" width="55"></img>
            <img style={{margin:5}} src="/youtube.png" width="55"></img>
        </span>
        <div style={{display:'flex', justifyContent:'center',}}>
            <span href="#" style={{margin:10,fontSize:12}}>Blogs</span>
            <span href="#" style={{margin:10,fontSize:12}}>Support</span>
            <span href="#" style={{margin:10,fontSize:12}}>Privacy Policy</span>
            <span href="#" style={{margin:10,fontSize:12}}>E-Waste Management</span>
            <span href="#" style={{margin:10,fontSize:12}}>Terms and Conditions</span>
            <span href="#" style={{margin:10,fontSize:12}}>CSR Policy</span>
            <span href="#" style={{margin:10,fontSize:12}}>Warranty,Return & Refund</span>
            <span href="#" style={{margin:10,fontSize:12}}>Track</span>
            <span href="#" style={{margin:10,fontSize:12}}>About Us</span>
            <span href="#" style={{margin:10,fontSize:12}}>Become Partner</span>
            <span href="#" style={{margin:10,fontSize:12}}>Brochure</span>
        </div>
        </div>
        </div>
    )
}