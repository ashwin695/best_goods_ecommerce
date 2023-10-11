import React,{useEffect, useState} from "react"
import { Grid, Button, Divider, Box, TextField } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header"
import Footer from "./Footer";
import { postData, ServerURL } from "../FetchNodeServices";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../bestgoods.css'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const useStyles = makeStyles({
    root:{
        background:'#ecf0f1',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        marginTop:25
    },
    bg:{
        background:'#ecf0f1'
    },
})

export default function OrderSummary(props)
{   const classes = useStyles()
    const [addressStatus,setAddressStatus] = useState({status:false, data:[]})
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [getMobileNo,setMobileNo] = useState('')
    const [addressOne,setAddressOne] = useState('')
    const [addressTwo,setAddressTwo] = useState('')
    const [states,setStates] = useState('')
    const [city,setCity] = useState('')
    const [zipcode,setZipcode] = useState('')
    const [paymentBox, setPaymentBox] = useState(false)
    const [paymentOption, setPaymentOption] = React.useState('payonline');
    const [btnEnabled, setBtnEnabled] = useState(false)
    const [addressOpen, setAddressOpen] = useState(true)
    const [moreAddressBtn, setMoreAddressBtn] = useState(true)
    const [valueAddress, setValueAddress] = React.useState({});
    const handleClick = () => {
      setAddressOpen(!addressOpen);
      setMoreAddressBtn(false)
    };

    const handleAddressChange = (event) => {
      setValueAddress(event.target.value);
      
    };

    var d = new Date()

    var dispatch = useDispatch()
    var user = useSelector(state=>state.user)
    var userData = Object.values(user)[0]
    console.log("userdata", userData)

    var address=useSelector(state=>state.da)
    var deliveryAddress=Object.values(address)

    var cart = useSelector(state=>state.cart)
    var keys = Object.keys(cart)
    var cartItems = Object.values(cart)

    var totalAmount = cartItems.reduce((a,b)=>getTotalAmount(a,b),0)
    function getTotalAmount(p1,p2){
      var price = p2.offerprice>0 ? p2.offerprice*p2.qty : p2.price*p2.qty
      return(price + p1)
    }
    var netAmount = cartItems.reduce((a,b)=>getNetAmount(a,b),0)
    function getNetAmount(p1,p2){
      var price = p2.price*p2.qty
      return(price + p1)
    }

    var savings = cartItems.reduce((a,b)=>getSavings(a,b),0)
    function getSavings(p1,p2){
      var price = p2.offerprice>0 ? (p2.price-p2.offerprice)*p2.qty : 0
      return(price + p1)
    }

  /**********Address Drawer *******************************************************/
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleAddress=async()=>{
    var body={mobileno:getMobileNo, addressone:addressOne, addresstwo:addressTwo, state:states, city:city, zipcode:zipcode, firstname:firstName, lastname:lastName, usermobileno:userData.mobileno}
    var result=await postData("users/addnewaddress", body)
    alert(result)
    toggleDrawer('right',false)
    checkAddress()
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
    >
      <div style={{display:'flex', alignItems:'center', padding:5, width:390, justifyContent:'center' }}>
      <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg" width="100"
          />
      </div>
      <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
        <span style={{fontWeight:'bold', fontSize:18}}>{userData.firstname} {userData.lastname}</span>
      </div>

      <Divider />
      <div style={{padding:10, display:'flex', alignItems:'center', width:380}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth value={firstName} onChange={(event)=>setFirstName(event.target.value)} variant="outlined" label="First Name"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth value={lastName} onChange={(event)=>setLastName(event.target.value)} variant="outlined" label="Last Name"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth value={getMobileNo} onChange={(event)=>setMobileNo(event.target.value)} variant="outlined" label="Mobile No"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth onChange={(event)=>setAddressOne(event.target.value)} variant="outlined" label="Address Line One"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth onChange={(event)=>setAddressTwo(event.target.value)} variant="outlined" label="Address Line Two"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth onChange={(event)=>setStates(event.target.value)} variant="outlined" label="State"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth onChange={(event)=>setCity(event.target.value)} variant="outlined" label="City"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth onChange={(event)=>setZipcode(event.target.value)} variant="outlined" label="Zipcode"></TextField>
          </Grid>
        </Grid>
      </div>
      
      <div style={{display:'flex', alignItems:'center', padding:10, width:380, }}>
        <Button onClick={handleAddress} variant="contained" fullWidth style={{background:'#000', color:'#FFF', fontWeight:'bold', fontSize:18}}>Add Address</Button>
      </div>
    </Box>
  );
    /*****************************************/

    const checkAddress=async()=>{
        var result=await postData("users/checkuseraddress",{mobileno:userData.mobileno})
        setAddressStatus({status:result.result,data:result.data})
        if(!result.result)
        {
          setMobileNo(userData.mobileno)
          setFirstName(userData.firstname)
          setLastName(userData.lastname)
          setMoreAddressBtn(false)
        }
        else
        {
          if(result.result || result.length>2)
          {
            setMoreAddressBtn(true)
          }
          else
          {
            setMoreAddressBtn(false)
          }
        }
    }

    useEffect(function(){
        checkAddress()
    },[])
    //alert(JSON.stringify(cartItems))

    const handleSetAddress=(item)=>{
      dispatch({type:"ADD_DA", payload:[item.mobileno, item]})
      setPaymentBox(true)
      setBtnEnabled(true)
      setValueAddress(item[0]);
    }

    const handleSelectPayment = (event) => {
      setPaymentOption(event.target.value);
    };

    const invoiceGenerator=()=>{
    var v=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var invoice="BG"
    for(var i=1; i<=5; i++)
    {
      invoice+=v[parseInt(Math.random()*9)]
    }
    return invoice
   }

    const handleSubmit=async()=>{
      var body={orderdate:d.getFullYear() + "/" + [d.getMonth()+1] + "/" + d.getDate() + "--" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
                cart:cartItems,
                amount:totalAmount,
                emailid:userData.emailid, 
                mobileno:deliveryAddress[0].mobileno,
                billingname:deliveryAddress[0].firstname + " " + deliveryAddress[0].lastname,
                address:deliveryAddress[0].addressone + ", " + deliveryAddress[0].addresstwo, 
                city:deliveryAddress[0].city, 
                state:deliveryAddress[0].state, 
                zipcode:deliveryAddress[0].zipcode,
                usermobileno:userData.mobileno,
                paymentmode:'Cash On Delivery',
                status:'Active',
                invoiceno:invoiceGenerator()
              };
      var result=await postData('orders/orderdatasubmit',body)
      alert("Order Sucessfully Done")
      alert(result.result)
      alert(JSON.stringify(deliveryAddress))
      alert(JSON.stringify(body.invoiceno))
      props.history.replace({pathname:'/success'}, {invoice:body.invoiceno})
    }

    const handleMakePayment=()=>{
      if(paymentOption === 'payonline')
      {
      props.history.push({pathname:'/paymentgateway'})
      }
      else
      {
        {handleSubmit()}
      }
    }
   /**************Address**********************************/
    const  fetchAddress=()=>{
      return addressStatus.data.map((item, index)=>{
        return( index<2 ?
          <Grid item xs={5.8}>
          <div style={{ display:'flex', flexDirection:'column', margin:10, width:'90%' }}>
              <Grid xs={12} className={classes.bg} style={{ padding:10, display:'flex', cursor:'pointer', flexDirection:'row', width:'100%'}}>
                <Grid item xs={1} style={{ margin:'5px 5px 0px 0px'}}>
                    <Radio
                    checked={valueAddress === {item}}
                    onChange={()=>handleSetAddress(item)}
                    value={item}
                    name="radio-buttons"
                    inputProps={{ 'aria-label': {item} }}
                    size="small"
                  />
                  </Grid>
                  <div style={{margin:5, display:'flex', flexDirection:'row'}}>                  
                      <div style={{margin:5, fontSize:15}}>
                          <div style={{ fontSize:20, fontWeight:500, }}>{item.firstname} {item.lastname}</div>
                          <div style={{marginTop:8}}>
                            <div style={{ fontSize:14, }}>{item.addressone}, {item.addresstwo}</div> 
                            <div style={{ fontSize:14 }}>{item.city} - {item.zipcode}, {item.state}</div>
                            <div style={{ fontSize:14, fontWeight:500 }}>{item.mobileno}</div>
                            </div>
                      </div>
                  </div>
              </Grid>
          </div>
          </Grid>
          /* <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
    </div>*/
        :<></>)
      })
    }
   /****************************************************************************/
   /****************All Address*************************************************/
   const  fetchAllAddress=()=>{
    return addressStatus.data.map((item, index)=>{
      return( index>1 ?
        <Grid item xs={5.5}>
        <div style={{ display:'flex', flexDirection:'column', margin:10, width:'90%' }}>
            <Grid xs={12} className={classes.bg} style={{padding:10, cursor:'pointer', display:'flex', flexDirection:'column', width:'100%'}}>
              <div onClick={()=>handleSetAddress(item)}>
                <div style={{margin:5, display:'flex', flexDirection:'row'}}>                          
                    <div style={{margin:5, fontSize:15}}>
                        <div style={{ fontSize:20, fontWeight:500, }}>{item.firstname} {item.lastname}</div>
                        <div style={{marginTop:8}}>
                            <div style={{ fontSize:14, }}>{item.addressone}, {item.addresstwo}</div> 
                            <div style={{ fontSize:14 }}>{item.city} - {item.zipcode}, {item.state}</div>
                            <div style={{ fontSize:14, fontWeight:500 }}>{item.mobileno}</div>
                        </div>
                    </div>
                </div>
              </div>
            </Grid>
        </div>
        </Grid>
      :<></>)
    })
  }
   /****************************************************************************/
    return(
        <div className={classes.root}>
            <Header history={props.history}/>
            <div style={{margin:10}}>
                <div style={{fontSize:28, fontWeight:600, fontFamily:'sans-serif', marginLeft:130}}>Order Summary</div>
            </div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center' }}>
            <Grid xs={6} style={{padding:5}}>
                <div style={{background:"#FFF", padding:5, margin:10, width:650, display:'flex', flexDirection:'row'}}>
                    <div style={{display:'flex', flexDirection:'column'}}>

                    <Grid item xs={5}>
                        <div style={{margin:5, fontWeight:'bold', fontSize:17}}>Select Delivery Address</div>
                    </Grid>

                    {addressStatus.status ? <>
                        <div style={{display:'flex', flexDirection:'column'}}>
                        <div style={{display:'flex', width:680}}>
                        <Button onClick={toggleDrawer('right',true)} variant="contained" style={{ background:'#000', color:'#FFF', fontWeight:600, marginTop:'auto', fontSize:13, margin:10, width:190 }}>
                          Add New Address
                        </Button>
                        </div>
                          <div style={{display:'flex', flexDirection:'row'}}>
                            {fetchAddress()}
                          </div>
                        </div>

                        {moreAddressBtn ? 
                        <div onClick={handleClick} fullWidth variant="contained" style={{padding:12, background:'#000', cursor: 'pointer', width:620, display:'flex'}}>
                            <span style={{color:'#fff', fontWeight:'bold', fontSize:18}}>More Addresses</span>
                            {addressOpen ? <span style={{ display: 'flex', justifyContent: 'end', width:470 }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(270deg)', color:'#fff' }} /></span>
                                : <span style={{ display: 'flex', justifyContent: 'end', width: 480, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(90deg)', color:'#fff' }} /></span>}
                        </div>
                        : <>
                        {fetchAllAddress()}
                        </>}
                        
                       </>
                    : <>
                      <Button onClick={toggleDrawer('right', true)} variant="contained" fullWidth style={{background:'#000', color:'#FFF', fontWeight:600, fontSize:13, width:'95%', margin:5}}>ADD ADDRESS</Button>
                      </>}
                         
                    </div>
                </div>

                <Grid xs={12} style={{ background:"#FFF", padding:10, margin:10, width:660, }}>
                <div>
                <div style={{display:'flex', alignItems:'center', padding:10 }}>
        <span style={{fontWeight:'bold', fontSize:18,}}>Cart Items({keys.length})</span>
        <span style={{fontWeight:'bold', fontSize:18, marginLeft:'auto'}}>Total: &#8377;{totalAmount}</span>
      </div>
      <List>
        {cartItems.map((item, index) => (
          <ListItem button>
            <ListItemIcon>
              <img src={`${ServerURL}/images/${item.icon}`} style={{width:80, borderRadius:100}}></img>
            </ListItemIcon>

            <div style={{display:'flex', flexDirection:'column', padding:5}}>
            <div style={{fontSize:18, color:'#000', fontWeight:'600'}}>{item.productname}</div>
            <div style={{fontSize:14, color:'grey', fontWeight:'600'}}>{item.modelname}</div>
            <ListItemText primary={item.offerprice > 0 
              ? <div style={{width:530, fontSize:18, fontWeight:'500', letterSpacing:1,}}>
                <s style={{color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:1,}}>
                  &#8377;{item.price}
                </s> &#8377;<span style={{fontSize:16}}>{item.offerprice} x {item.qty}</span>
                <div style={{display:'flex', color:'darkgreen', fontSize:18, fontWeight:'500', letterSpacing:1,}}>
                  You Save &#8377; {(item.price-item.offerprice)*item.qty}
                  <span style={{marginLeft:'auto'}}>
                    &#8377;{item.offerprice*item.qty}
                  </span>
                </div> 
                </div> 
              : <> <div style={{width:530, fontSize:16, fontWeight:500, color:'#222f3e',letterSpacing:1}}>
                  &#8377;{item.price} x {item.qty}
                </div>
                <div style={{display:'flex', color: "darkgreen", fontSize: 18, fontWeight: "500", letterSpacing: 1}}>
                  &nbsp;
                  <span style={{marginLeft:'auto'}}>
                    &#8377;{item.price*item.qty}
                  </span>
                </div>
                </>} />
                </div>
          </ListItem>
        ))}
      </List>
                </div>
                </Grid>
            </Grid>
            
            <Grid xs={4}>
                <Grid xs={12}>
                <div style={{ background:"#FFF", padding:10, margin:10, width:450, }}>
                    <Grid xs={4}>
                        <div style={{fontWeight:'bold', padding:5, fontSize:18}}>Payment Details</div>
                    </Grid>

                    <div style={{display:'flex', alignItems:'center', padding:10, width:380, }}>
        <span style={{fontSize:16}}>Net Amount:</span>
        <span style={{fontWeight:'bold', fontSize:18, marginLeft:'auto'}}>&#8377;{netAmount}</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
        <span style={{ fontSize:16}}>Savings:</span>
        <span style={{fontWeight:'bold', fontSize:18, marginLeft:'auto'}}>&#8377;{savings}</span>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
        <span style={{ fontSize:16}}>Delivery Charges:</span>
        <span style={{fontWeight:'bold', fontSize:18, marginLeft:'auto'}}>&#8377;{0}</span>
      </div>

      <Divider />
      <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
        <span style={{fontWeight:'bold', fontSize:18}}>Final Amount:</span>
        <span style={{fontWeight:'bold', fontSize:18, marginLeft:'auto'}}>&#8377;{netAmount-savings}</span>
      </div>
      
                </div>
                </Grid>
                <Grid xs={12}>
                {paymentBox ? 
                <div className="visible" style={{ background:"#FFF", padding:15, margin:10, width:400 }}>
                <div style={{fontWeight:600, padding:5}}>Choose Payment Option</div>
                <Divider />
                     <RadioGroup
                          aria-label="gender"
                          name="controlled-radio-buttons-group"
                          value={paymentOption}
                          onChange={handleSelectPayment}
                      >
                            <FormControlLabel value="payonline" control={<Radio />} label="Pay Online" />
                            <FormControlLabel value="payondelivery" control={<Radio />} label="Pay On Delivery" />
                     </RadioGroup>
              </div> : <></>}
                {
                  btnEnabled ?
                  <Grid item xs={12} style={{display:'flex', alignItems:'center', padding:10, width:280, }}>
                    <Button onClick={(event)=>handleMakePayment(event.target.value)} variant="contained" fullWidth style={{backgroundColor:'#000', color:'#FFF', fontWeight:'bold', fontSize:16}}>Proceed</Button>
                  </Grid>
                  :
                  <Grid item xs={12} style={{display:'flex', alignItems:'center', padding:10, width:280, }}>
                    <Button disabled variant="contained" fullWidth style={{background:'grey', color:'#FFF', fontWeight:'bold', fontSize:16}}>Proceed</Button>
                  </Grid>
                }
                
                </Grid>
            </Grid>
            </div>
            <Footer />
            <React.Fragment key={'right'}>
          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableDrawer>
        </React.Fragment>
        </div>
    )
}