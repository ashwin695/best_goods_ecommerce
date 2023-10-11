import React,{useEffect,useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { ShoppingCart, Close } from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { getData, postData, ServerURL } from "../FetchNodeServices";
import { useSelector } from 'react-redux';
import '../bestgoods.css'
import SwipeableLeftDrawer from '@mui/material/SwipeableDrawer';
import SwipeableRightDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'
import { Grid } from '@mui/material';
import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Header(props) {
  const theme  = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  //console.log("RESPONSIVE",matches)

  var user = useSelector(state=>state.user)
  var userData = Object.values(user)[0]

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
  console.log("KEYS",keys)
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [categoryList,setCategoryList]=useState([])
  const [categoryId,setCategoryId]=useState("")
  const [listSubCategory,setListSubCategory]=useState([])
  const [leftState, setLeftState] = React.useState({left: false})

  const [value, setValue] = useState("")

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

/**********Left Toggle Drawer*************************/
  const toggleDrawerLeft = (anchorLeft, open) => (event) => {
    setLeftState({ ...leftState, [anchorLeft]: open });
  };

  const leftList = (anchorLeft) => (
    <Box
      sx={{ width: anchorLeft === 'top' || anchorLeft === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onKeyDown={toggleDrawerLeft(anchorLeft, false)}
    >
      <div style={{display:'flex', alignItems:'center', padding:5, justifyContent:'center' }}>
      <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            src="/logo.jpg" width="40%"
          />
      </div>
      <List>
        {categoryList.map((item,index)=>{
          return(<>
            <ListItem button>
                <div value={item.categoryid}>
                    {item.categoryname}
                </div>
            </ListItem>
            <Divider />
            </>
          )
        })}
      </List>
      
    </Box>
  );
/*****************************************************/

/**********Cart Drawer *************************************/
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  function handleProceed(){
    props.history.push({pathname:"/signin"})
  }

  const list = (anchor) => (
    <>
        {
            keys.length > 0 ?
            <>
                <Box
                  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                >
                  <div style={{display:'flex', alignItems:'center', padding:8,  }}>
                      <Close style={{fontSize:30}} onClick={toggleDrawer(anchor, false)}></Close>
                      <div style={{display:'flex', justifyContent:'center', width:250, marginLeft:40}}>
                          <img sx={{ display: { xs: 'none', sm: 'block' } }} src="/logo.jpg" width="60%" />
                      </div>
                  </div>
                  <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
                    <span style={{fontWeight:'bold', fontSize:18}}>Cart Items({keys.length})</span>
                    <span style={{fontWeight:'bold', fontSize:18, marginLeft:'auto'}}>Total: &#8377;{totalAmount}</span>
                  </div>
                  <Divider style={{backgroundColor:'lightgrey', height:2}} />
                  <List>
                    {cartItems.map((item, index) => (
                      <ListItem button>
                        <ListItemIcon>
                          <img src={`${ServerURL}/images/${item.icon}`} style={{width:80, borderRadius:100}}></img>
                        </ListItemIcon>

                        <div style={{display:'flex', flexDirection:'column', padding:5}}>
                        <ListItemText primary={item.productname} style={{fontWeight:'bold'}} />
                        <ListItemText primary={item.offerprice > 0 
                          ? <div style={{width:280, fontSize:18, fontWeight:'500', letterSpacing:1,}}>
                            <s style={{color:'#353b48', fontSize:14, fontWeight:'500', letterSpacing:1,}}>
                              &#8377;{item.price}
                            </s> &#8377;{item.offerprice}x{item.qty}
                            <div style={{display:'flex', color:'darkgreen', fontSize:18, fontWeight:'500', letterSpacing:1,}}>
                              You Save &#8377; {(item.price-item.offerprice)*item.qty}
                              <span style={{marginLeft:'auto'}}>
                                &#8377;{item.offerprice*item.qty}
                              </span>
                            </div> 
                            </div> 
                          : <> <div style={{width:280, fontSize:18, fontWeight:600, color:'#222f3e',letterSpacing:1}}>
                              &#8377; {item.price}x{item.qty}
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

                  <Divider />

                  <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
                    <span style={{fontWeight:'bold', fontSize:17}}>Net Amount:</span>
                    <span style={{fontWeight:'bold', fontSize:17, marginLeft:'auto'}}>&#8377;{netAmount}</span>
                  </div>

                  <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
                    <span style={{fontWeight:'bold', fontSize:17}}>Savings:</span>
                    <span style={{fontWeight:'bold', fontSize:17, marginLeft:'auto'}}>&#8377;{savings}</span>
                  </div>

                  <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
                    <span style={{fontWeight:'bold', fontSize:17}}>Delivery Charges:</span>
                    <span style={{fontWeight:'bold', fontSize:17, marginLeft:'auto'}}>&#8377;{0}</span>
                  </div>

                  <Divider />
                  <div style={{display:'flex', alignItems:'center', padding:10, width:380 }}>
                    <span style={{fontWeight:'bold', fontSize:17}}>Final Amount:</span>
                    <span style={{fontWeight:'bold', fontSize:17, marginLeft:'auto'}}>&#8377;{netAmount-savings}</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', padding:10, width:380, }}>
                    <Button onClick={handleProceed} variant="contained" fullWidth style={{display:'flex', alignItems:'center', justifyContent:'center',background:'#000', color:'#FFF', fontWeight:'bold', fontSize:18}}>Proceed</Button>
                  </div>
                </Box>
            </>
            :
            <>
               <Box
                  sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
                  role="presentation"
                  onClick={toggleDrawer(anchor, false)}
                  onKeyDown={toggleDrawer(anchor, false)}
                >
                  <div style={{display:'flex', alignItems:'center', padding:8,  }}>
                      <Close style={{fontSize:30}} onClick={toggleDrawer(anchor, false)}></Close>
                      <div style={{display:'flex', justifyContent:'center', width:250, marginLeft:40}}>
                          <img sx={{ display: { xs: 'none', sm: 'block' } }} src="/logo.jpg" width="60%" />
                      </div>
                  </div>
                  <Divider style={{backgroundColor:'lightgrey', height:2, marginTop:5}} />
                  <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'15rem'}}>
                      <ProductionQuantityLimits style={{fontSize:160, color:'grey'}}></ProductionQuantityLimits>
                  </div>
                  <div style={{display:'flex', justifyContent:'center', fontSize:20, fontWeight:600, margin:2, }}>OOPS..!! Your Shopping Cart is Empty</div>
                  <div style={{display:'flex', justifyContent:'center', fontSize:17, fontWeight:400, margin:2, }}>I think you wanna go and add some </div>
                  <div style={{display:'flex', justifyContent:'center', fontSize:17, fontWeight:400, margin:2, }}>favorites.</div>

                  <Grid item xs={12} style={{display:'flex', justifyContent:'center', padding:40}}>
                      <div style={{display:'flex', justifyContent:'center', backgroundColor:'#000', color:'#fff', padding:10, fontSize:18, fontWeight:600, borderRadius:5, width:200, cursor:'pointer' }}>Start Shopping</div>
                  </Grid>
                </Box>
            </>
        }
    </>
  );
  /*****************************************/

  ///////My DropDown of Categories///////////////////////////////
  const [anchorElM, setAnchorElM] = React.useState(null);
  const mopen = Boolean(anchorElM);
  const handlemClick = (event) => {
    //alert(event.currentTarget.value)
    setCategoryId(event.currentTarget.value)
    setAnchorElM(event.currentTarget);
    fetchAllSubCategories(event.currentTarget.value)
  };

  const fetchAllSubCategories=async(cid)=>{
    var body={categoryid:cid}
    var result=await postData('subcategory/displayallsubcategorybycategory',body)
    setListSubCategory(result.data)
  }

  const handlemClose = () => {
    setAnchorElM(null);
  };

  const handleMenuClick=(sid)=>{
    props.history.push({pathname:"/productlist"}, {subcategoryid:sid})
  }

  function subMenu() {
    return (
      <div>
        <Menu
          anchorEl={anchorElM}
          open={mopen}
          onClose={handlemClose}
          onClick={handlemClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >

          { listSubCategory.map((item)=>{
             return(
              <MenuItem onClick={()=>handleMenuClick(item.subcategoryid)}>
              <img src={`${ServerURL}/images/${item.subcategoryicon}`} width="20" style={{marginRight:10}} />
              {item.subcategoryname}
            </MenuItem>
             )
          })}

        </Menu>
      </div>
    );
  }
  ////////////////////////////////////////////

  const handleProfileMenuOpen = () => {
    props.history.push('/userprofile')
  };

  const fetchAllCategory=async()=>{
    var result=await getData("category/displayallcategory")
    setCategoryList(result.data)
  }

  useEffect(function(){
    fetchAllCategory()
  },[])

  const mainMenu=()=>{
    return categoryList.map((item,index)=>{
        return(index<=3? <Grid spacing={2}>
         <Grid item xs={12}>
            <Button value={item.categoryid} onClick={handlemClick} style={{color:'#000', marginLeft:15, fontWeight:'600',fontSize:16}}>
                {item.categoryname}
            </Button>
         </Grid>
        </Grid>
        :<></>)
    })
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={toggleDrawer('right', true)}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={keys.length} color="error">
            <ShoppingCart onClick={toggleDrawer('right', true)} />
          </Badge>
        </IconButton>
        <p>Shopping Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle style={{color:'black'}}/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom:8 }}>
      <AppBar style={{background:'#FFF'}} position="fixed">
        <Toolbar>
          {matches?
          <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={toggleDrawerLeft('left', true)} />
          </IconButton>
          :<></>}
          <img
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            style={{cursor:'pointer', marginRight:30}}
            src="/logo.jpg" width="150"
            onClick={()=>props.history.push({pathname:"/home"})}
          />
          
          {matches?<div></div>:
          <div style={{width:1100, display:'flex', }}>
          {mainMenu()}
          {subMenu()}
          </div>}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onInput={(e) => {
                setValue(e.target.value);
              }}
            />
          </Search>

          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="default"
            >
              <AccountCircle style={{padding:4, fontSize:26}} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="default"
            >
              <Badge /* badgeContent={17} */ color="error">
                <NotificationsIcon style={{padding:4, fontSize:26}} />
              </Badge>
            </IconButton>
            <IconButton size="large" color="default">
              <Badge badgeContent={keys.length} color="error">
                <ShoppingCart style={{padding:4, fontSize:26}} onClick={toggleDrawer('right', true)} />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="default"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <React.Fragment key={'right'}>
          <SwipeableRightDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('right')}
          </SwipeableRightDrawer>
        </React.Fragment>
      </div>
      <div>
        <React.Fragment key={'left'}>
        <SwipeableLeftDrawer
          anchorLeft={'left'}
          open={leftState['left']}
          onClose={toggleDrawerLeft('left', false)}
          onOpen={toggleDrawerLeft('left', true)}
        >
          {leftList('left')}
        </SwipeableLeftDrawer>
        </React.Fragment>
      </div>
    </Box>
  );
}
