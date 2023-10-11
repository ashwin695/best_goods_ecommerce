import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  List,
  Modal,
  Typography,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { postData } from "../FetchNodeServices";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Call, Home, Edit, DeleteOutline, Close } from "@mui/icons-material";
import "../bestgoods.css";

const useStyles = makeStyles({
  rightside: {
    display: "flex",
    flexDirection: "row",
  },
  function: {
    margin: 10,
    padding: 15,
    width: "100%",
  },
  fnhd: {
    fontWeight: 700,
    fontSize: 24,
  },
  blankaddress: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    border: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    margin: 10,
  },
  address: {
    display: "flex",
    flexDirection: "column",
    border: "solid",
    borderColor: "#ecf0f1",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid darkgrey",
  boxShadow: 24,
  p: 4,
};

export default function UserProfileAddress(props) {
  const classes = useStyles();
  var user = useSelector((state) => state.user);
  var userData = Object.values(user)[0];
  const [state, setState] = React.useState({ bottom: false });
  const [editDrawer, setEditDrawer] = React.useState({ bottom: false });
  const [addressStatus, setAddressStatus] = useState({
    status: false,
    data: [],
  });
  const [addressIdData, setAddressIdData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [getMobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editGetMobileNo, setEditMobileNo] = useState("");
  const [editAddressOne, setEditAddressOne] = useState("");
  const [editAddressTwo, setEditAddressTwo] = useState("");
  const [editStates, setEditStates] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editZipcode, setEditZipcode] = useState("");
  const [open, setOpen] = React.useState(false);

  var mobileNo = localStorage.getItem('mobileno')

  const checkAddress = async () => {
    //var result = await postData("users/checkuseraddress", {mobileno: userData.mobileno});
    var result = await postData("users/checkuseraddress", {mobileno: mobileNo});
    setAddressStatus({ status: result.result, data: result.data });
    if (!result.result) {
      setMobileNo(userData.mobileno);
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      setEmailId(userData.emailId);
    }
  };
  useEffect(function () {
    checkAddress();
  }, []);
  //console.log("Address",addressStatus)
  //console.log("Data",addressStatus.data)
  //console.log("addressid", addressStatus.data.addressid)

  const handleOpen = async (aid) => {
    alert(JSON.stringify(aid))
    setOpen(true);
    setEditFirstName(aid.firstname);
    setEditLastName(aid.lastname);
    setEditMobileNo(aid.mobileno);
    setEditAddressOne(aid.addressone);
    setEditAddressTwo(aid.addresstwo);
    setEditStates(aid.state);
    setEditCity(aid.city);
    setEditZipcode(aid.zipcode);
    console.log(addressIdData);
    var result = await postData("users/fetchaddressbyid", { addressid: aid });
    setAddressIdData(result.result);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteAddress = async (aid) => {
    var result = await postData("users/deleteaddress", { addressid: aid });
    checkAddress();
  };
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  /* const editToggleDrawer = (anchor, open, aid) => (event) => {
        setEditDrawer({ ...editDrawer, [anchor]: open, addressid:aid });
    }; */
  const handleAddress = async () => {
    var body = {
      mobileno: getMobileNo,
      addressone: addressOne,
      addresstwo: addressTwo,
      state: states,
      city: city,
      zipcode: zipcode,
      firstname: firstName,
      lastname: lastName,
      usermobileno: userData.mobileno,
    };
    var result = await postData("users/addnewaddress", body);
    checkAddress();
    toggleDrawer("bottom", false);
  };
  const handleEditAddress = async () => {
    var body = {
      mobileno: editGetMobileNo,
      addressone: editAddressOne,
      addresstwo: editAddressTwo,
      state: editStates,
      city: editCity,
      zipcode: editZipcode,
      firstname: editFirstName,
      lastname: editLastName,
    };
    var result = await postData("users/editaddress", body);
    alert(result);
  };

  const fetchAddress = () => {
    return addressStatus.data.map((item, index) => {
      return index < 4 ? (
        <Grid item xs={5}>
          <div className={classes.address}>
            <div className={classes.rightside}>
              <AccountCircle style={{ fontSize: 18, margin: 5 }} />
              <div style={{ margin: 4, fontSize: 14 }}>
                {item.firstname} {item.lastname}
              </div>
            </div>
            <div className={classes.rightside}>
              <Call style={{ fontSize: 18, margin: 5 }} />
              <div style={{ margin: 4, fontSize: 13 }}>{item.mobileno}</div>
            </div>
            <div className={classes.rightside}>
              <Home style={{ fontSize: 18, margin: 5 }} />
              <div
                style={{ display: "flex", flexDirection: "column", margin: 4 }}
              >
                <div style={{ fontSize: 13 }}>
                  {item.addressone}, {item.addresstwo}
                </div>
                <div style={{ fontSize: 13 }}>
                  {item.city}-{item.zipcode}, {item.state}
                </div>
              </div>
            </div>
            <div className={classes.rightside}>
              {/* <Button value={item.addressid} onClick={editToggleDrawer('bottom', true, item.addressid)} variant="contained" style={{margin:5, background:'#000', fontSize:13}} startIcon={<Edit />} fullWidth>Edit</Button> */}
              <Button
                onClick={() => handleOpen(item)}
                variant="contained"
                style={{ margin: 5, background: "#000", fontSize: 13 }}
                startIcon={<Edit />}
                fullWidth
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteAddress(item.addressid)}
                variant="outlined"
                style={{ margin: 5, color: "#000", borderColor: "#000" }}
                startIcon={<DeleteOutline />}
                fullWidth
              >
                Delete
              </Button>
            </div>
          </div>
        </Grid>
      ) : (
        <></>
      );
    });
  };

  const bottomList = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 400 }}
      role="presentation"
    >
      <List>
        <div className={classes.rightside}>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/logo.jpg" width="30%" style={{ margin: 5 }}></img>
            <img src="/delivery 2.jpg" width="65%" style={{ margin: 5 }}></img>
          </Grid>
          <Grid
            item
            xs={7}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className={classes.rightside}>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
            </div>
            <div className={classes.rightside}>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  value={getMobileNo}
                  onChange={(event) => setMobileNo(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="Mobile No"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  onChange={(event) => setZipcode(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="Zipcode"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
            </div>
            <div className={classes.rightside}>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  onChange={(event) => setStates(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="State"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  onChange={(event) => setCity(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="City"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
            </div>
            <div className={classes.rightside}>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  onChange={(event) => setAddressOne(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="Address 1"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
              <Grid item xs={6} style={{ margin: 7 }}>
                <TextField
                  size="small"
                  onChange={(event) => setAddressTwo(event.target.value)}
                  fullWidth
                  variant="outlined"
                  label="Address 2"
                  style={{ background: "whitesmoke" }}
                ></TextField>
              </Grid>
            </div>
            <div className={classes.rightside}>
              <Grid item xs={12} style={{ margin: 7 }}>
                <Button
                  onClick={handleAddress}
                  variant="outlined"
                  fullWidth
                  style={{ color: "#000", borderColor: "#000", fontSize: 14 }}
                >
                  Add Address
                </Button>
              </Grid>
            </div>
          </Grid>
        </div>
      </List>
    </Box>
  );

  const editAddress = () => {
    return (
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className={classes.rightside}>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editFirstName}
              onChange={(event) => setFirstName(event.target.value)}
              fullWidth
              variant="outlined"
              label="First Name"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editLastName}
              onChange={(event) => setLastName(event.target.value)}
              fullWidth
              variant="outlined"
              label="Last Name"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
        </div>
        <div className={classes.rightside}>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editGetMobileNo}
              onChange={(event) => setMobileNo(event.target.value)}
              fullWidth
              variant="outlined"
              label="Mobile No"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editZipcode}
              onChange={(event) => setZipcode(event.target.value)}
              fullWidth
              variant="outlined"
              label="Zipcode"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
        </div>
        <div className={classes.rightside}>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editStates}
              onChange={(event) => setStates(event.target.value)}
              fullWidth
              variant="outlined"
              label="State"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editCity}
              onChange={(event) => setCity(event.target.value)}
              fullWidth
              variant="outlined"
              label="City"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
        </div>
        <div className={classes.rightside}>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editAddressOne}
              onChange={(event) => setAddressOne(event.target.value)}
              fullWidth
              variant="outlined"
              label="Address 1"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
          <Grid item xs={6} style={{ margin: 7 }}>
            <TextField
              size="small"
              value={editAddressTwo}
              onChange={(event) => setAddressTwo(event.target.value)}
              fullWidth
              variant="outlined"
              label="Address 2"
              style={{ background: "whitesmoke" }}
            ></TextField>
          </Grid>
        </div>
        <div className={classes.rightside} style={{ paddingTop: 10 }}>
          <Grid item xs={6} style={{ margin: 7 }}>
            <Button
              onClick={handleEditAddress}
              variant="outlined"
              fullWidth
              startIcon={<Edit />}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                borderColor: "#000",
                fontSize: 14,
              }}
            >
              Edit Address
            </Button>
          </Grid>
          <Grid item xs={6} style={{ margin: 7 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              fullWidth
              startIcon={<Close />}
              style={{ color: "#000", borderColor: "#000", fontSize: 14 }}
            >
              Cancel
            </Button>
          </Grid>
        </div>
      </Grid>
    );
  };

  /* const editBottomList = (anchor,addressid) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
          role="presentation"
        >
          <List>
            {console.log(addressid)}
            <div className={classes.rightside}>
                <Grid item xs={4} style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <img src="/logo.jpg" width="30%" style={{margin:5}}></img>
                    <img src="/delivery 2.jpg" width="65%" style={{margin:5}}></img>
                </Grid>
                <Grid item xs={7} style={{ display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={addressid.firstname} fullWidth variant="outlined" label="First Name" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={lastName} onChange={(event)=>setLastName(event.target.value)} fullWidth variant="outlined" label="Last Name" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={getMobileNo} onChange={(event)=>setMobileNo(event.target.value)} fullWidth variant="outlined" label="Mobile No" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={zipcode} onChange={(event)=>setZipcode(event.target.value)} fullWidth variant="outlined" label="Zipcode" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={states} onChange={(event)=>setStates(event.target.value)} fullWidth variant="outlined" label="State" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={city} onChange={(event)=>setCity(event.target.value)} fullWidth variant="outlined" label="City" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={addressOne} onChange={(event)=>setAddressOne(event.target.value)} fullWidth variant="outlined" label="Address 1" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                        <Grid item xs={6} style={{margin:7}}>
                            <TextField size="small" value={addressTwo} onChange={(event)=>setAddressTwo(event.target.value)} fullWidth variant="outlined" label="Address 2" style={{background:'whitesmoke'}}></TextField>
                        </Grid>
                    </div>
                    <div className={classes.rightside}>
                        <Grid item xs={12} style={{margin:7}}>
                            <Button onClick={handleEditAddress} variant="outlined" fullWidth style={{color:'#000', borderColor:'#000', fontSize:14}}>Edit Address</Button>
                        </Grid>
                    </div>
                </Grid>
            </div>
          </List>
        </Box>
    ); */

  return (
    <Grid item xs={12}>
      <Paper className={classes.function}>
        <Grid item xs={6} style={{ margin: 12 }}>
          <div className={classes.fnhd}>Your Address</div>
        </Grid>
        <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap" }}>
          {addressStatus.status ? <>{fetchAddress()}</> : <></>}
          <Grid item xs={4}>
            <div
              className={classes.blankaddress}
              onClick={toggleDrawer("bottom", true)}
            >
              <img src="/plussign.png" width="50"></img>
              <div style={{ margin: 20, fontSize: 18, fontWeight: 700 }}>
                Add Address
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div>
        <React.Fragment key={"bottom"}>
          <SwipeableDrawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
            onOpen={toggleDrawer("bottom", true)}
          >
            {bottomList("bottom")}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
      {/* <div>
                <React.Fragment key={'bottom'}>
                    <Drawer
                        anchor={'bottom'}
                        open={editDrawer['bottom']}
                        addressid={'aid'}
                        onClose={editToggleDrawer('bottom', false)}
                        onOpen={editToggleDrawer('bottom', true)}
                    >
                        {editBottomList('bottom', 'aid')}
                    </Drawer>
                </React.Fragment>
            </div> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit Address
          </Typography>
          <p
            id="modal-modal-description"
            style={{ fontFamily: "sans-serif", color: "grey" }}
          >
            Edit your Correct Address here
          </p>
          {editAddress()}
        </Box>
      </Modal>
    </Grid>
  );
}
