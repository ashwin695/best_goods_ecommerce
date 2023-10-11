import React,{useEffect,useState,createRef} from "react";
import { makeStyles } from '@mui/styles';
import { Button, Avatar, Grid } from '@mui/material'
import ShoppingCart from "@mui/icons-material/ShoppingCart";

const useStyles = makeStyles({
    rounddiv:
    {
        border:'2px solid #000',
        width:30,
        height:30,
        borderRadius:15,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:18
    },
})

export function ShoppingCartComponent(props){
    const classes = useStyles(props);
    const [value,setValue] = useState(props.value)

    const handleMinus=()=>{
        var c=value-1
        if(c>=0)
        {setValue(c)}
        props.onChange(c)
    }

    const handlePlus=()=>{
        var c=value+1
        setValue(c)
        props.onChange(c)
    }

    const handleClick=()=>{
        var c=value+1
        setValue(c)
        props.onChange(c)
    }

    return(
        <div>
        {value==0?<div><Button onClick={()=>handleClick()} sx={{margin:3, width:250, background:'#000', color:'#FFF'}} variant="contained" endIcon={<ShoppingCart />}>
        Add to Cart
      </Button></div>:
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Avatar onClick={()=>handleMinus()} sx={{cursor:'pointer', bgcolor: '#000', color:'#FFF', fontSize:24, fontWeight:'bold', margin:3 }} variant="square">
                    -
                </Avatar>
                <div sx={{display:'flex', fontSize:18, fontWeight:'bold', marginTop:2}}>{value}</div>
                <Avatar onClick={()=>handlePlus()} sx={{cursor:'pointer', bgcolor: '#000', color:'#FFF', fontSize:24, fontWeight:'bold', margin:3 }} variant="square">
                    +
                </Avatar>
            </div>
        }
        </div>
    )
}

export function ProductViewCartComponent(props){
    const classes = useStyles(props);
    const [value,setValue] = useState(props.value)

    const handleMinus=()=>{
        var c=value-1
        if(c>=0)
        {setValue(c)}
        props.onChange(c)
    }

    const handlePlus=()=>{
        var c=value+1
        setValue(c)
        props.onChange(c)
    }

    const handleClick=()=>{
        var c=value+1
        setValue(c)
        props.onChange(c)
    }

    return(
        <div>
            {
                value==0 ? 
                    <Grid>
                        <div onClick={()=>handleClick()} style={{borderRadius:30, border:'2px solid black', padding:15, width:260, margin:10, cursor:'pointer'}}>
                            <div style={{display:'flex', justifyContent:'center'}}>ADD TO CART</div>
                        </div>
                    </Grid>
                    :
                    <Grid style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>
                        <Avatar onClick={()=>handleMinus()} sx={{cursor:'pointer', border:'2px solid black', bgcolor: '#fff', color:'#000', fontSize:24, padding:0.8, fontWeight:'bold', margin:1.1 }} variant="circle">
                            -
                        </Avatar>
                        <div sx={{display:'flex', fontSize:22, fontWeight:'bold', marginTop:2}}>{value}</div>
                        <Avatar onClick={()=>handlePlus()} sx={{cursor:'pointer', border:'2px solid black', bgcolor: '#fff', color:'#000', fontSize:24, padding:0.8, fontWeight:'bold', margin:1.1 }} variant="circle">
                            +
                        </Avatar>
                    </Grid>
            }
        </div>
    )
}