import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL } from '../FetchNodeServices';
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import { postData } from "../FetchNodeServices";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36D7B7");
  var d = new Date()
 
  var user=useSelector(state=>state.user)
  var userData=Object.values(user)[0]

  var address=useSelector(state=>state.da)
  var deliveryAddress=Object.values(address)

  var cart=useSelector(state=>state.cart)
  var keys=Object.keys(cart)
  var cartitems=Object.values(cart)

   var totalamount=cartitems.reduce((a,b)=>getTotalAmount(a,b),0)
   function getTotalAmount(p1,p2){
    var price=p2.offerprice>0?p2.offerprice*p2.qty:p2.price*p2.qty
    return(price+p1)
   }

   var netamount=cartitems.reduce((a,b)=>getNetAmount(a,b),0)
   function getNetAmount(p1,p2){
    var price=p2.price*p2.qty
    return(price+p1)
   }

   var savings=cartitems.reduce((a,b)=>getSavings(a,b),0)
   function getSavings(p1,p2){
    var price=p2.offerprice>0?(p2.price-p2.offerprice)*p2.qty:0
    return(price+p1)
   }

   const invoiceGenerator=()=>{
    var v=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var invoice="BG"
    for(var i=1; i<=5; i++)
    {
      invoice+=v[parseInt(Math.random()*9)]
    }
    return invoice
   }
   
   const handleSubmit=async(response)=>{
    var body={orderdate:d.getFullYear() + "/" + [d.getMonth()+1] + "/" + d.getDate() + "--" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
              cart:cartitems,
              amount:totalamount,
              emailid:userData.emailid, 
              mobileno:deliveryAddress[0].mobileno,
              billingname:deliveryAddress[0].firstname + " " + deliveryAddress[0].lastname,
              address:deliveryAddress[0].addressone + ", " + deliveryAddress[0].addresstwo, 
              city:deliveryAddress[0].city, 
              state:deliveryAddress[0].state, 
              zipcode:deliveryAddress[0].zipcode,
              transactionid:response.razorpay_payment_id,
              usermobileno:userData.mobileno,
              paymentmode:'Online Payment',
              status:'Active',
              invoiceno:invoiceGenerator()
            };
    var result=await postData('orders/orderdatasubmit',body)
    alert(result.result)
    alert(JSON.stringify(body.invoiceno))
    props.history.replace({pathname:'/success'}, {invoice:body.invoiceno})
  }



  const options = {
    key: "rzp_test_N2OV8JJIw2gh8i",
    amount: totalamount*100, //  = INR 1
    name: "Game Zone.com",
    // description: 'some description',
    image:
      `${ServerURL}/images/logo.jpg`,
    handler: function (response) {
      // handleRazorpay(response.razorpay_payment_id)
      // props.addnewrecord()
      alert(response.razorpay_payment_id);
      alert(JSON.stringify(cartitems))
      alert(cartitems[0].productname)
      {handleSubmit(response)}
    },
    prefill: {
      name: userData.firstname + " " + userData.lastname,
      contact: userData.mobileno,
      email: userData.emailid
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const gotoRazorpay=()=>{
    return(
        <div style={{display:'flex', justifyContet:'center', alignItems:'center', flexDirection:'column'}}>
          <div style={{fontSize:30, fontWeight:700, color:'GrayText', padding:20}}>Redirecting To Razorpay pls wait....</div>
          <div className="sweet-loading">
            <SyncLoader color={color} loading={loading} css={override} size={30} />
            {openPayModal()}
          </div>
        </div>
    ) 
  }

  const openPayModal = async() => {
    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
    setLoading(!loading)
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const { classes } = props;

  return (
    <>
      <center>
        
        {gotoRazorpay()}
        
      </center>
    </>
  );
};

export default withStyles(styles)(PaymentGateway);
