import logo from './logo.svg';
import './App.css';
import Categories from './Admin/Categories';
import DisplayAllCategories from './Admin/DisplayAllCategories';
import SubCategories from './Admin/SubCategories';
import DisplayAllSubCategories from './Admin/DisplayAllSubCategories';
import { Route,BrowserRouter as Router } from "react-router-dom"
import Companies from './Admin/Companies';
import DisplayAllCompanies from './Admin/DisplayAllCompanies';
import Product from './Admin/Product';
import DisplayAllProducts from './Admin/DisplayAllProducts';
import Colors from './Admin/Colors';
import DisplayAllColors from './Admin/DisplayAllColors';
import Model from './Admin/Model';
import DisplayAllModels from './Admin/DisplayAllModels';
import FinalProduct from './Admin/FinalProduct';
import DisplayAllFinalProducts from './Admin/DisplayAllFinalProducts';
import AdminLogin from './Admin/AdminLogin';
import Dashboard from './Admin/Dashboard';
import Banners from './Admin/Banners';
import DisplayAllBanners from './Admin/DisplayAllBanners';
import Header from './UserInterface/Header'
import Home from './UserInterface/Home'
import Footer from './UserInterface/Footer';
import Footer1 from './UserInterface/Footer';
import ProductList from './UserInterface/ProductList'
import SignIn from './UserInterface/SignIn';
import SignUp from './UserInterface/SignUp';
import {ShoppingCartComponent, ProductViewCartComponent} from './UserInterface/ShoppingCartComponent';
import SubBanners from './Admin/SubBanners';
import DisplayAllSubBanners from './Admin/DisplayAllSubBanners';
import SideBar from './UserInterface/SideBar';
import OrderSummary from './UserInterface/OrderSummary';
import ProductView from './UserInterface/ProductView';
import PaymentGateway from './UserInterface/PaymentGateway';
import UserProfile from './UserInterface/UserProfile';
import ListSubCategoryFromCategory from './UserInterface/ListSubCategoryFromCategory';
import DisplayAllOrders from './Admin/DisplayAllOrders';
import ShowAllTrendings from './UserInterface/ShowAllTrendings';
import ShowNewArrivals from './UserInterface/ShowNewArrivals';
import SuccessPage from './UserInterface/SuccessPage';
import MyCart from './UserInterface/MyCart';

function App(props) {
  return (
    <div>
      <Router>
        <Route strict props={props.history} component={Categories} path="/categories" />
        <Route strict props={props.history} component={DisplayAllCategories} path="/displayallcategories" />
        <Route strict props={props.history} component={SubCategories} path="/subcategories" />
        <Route strict props={props.history} component={DisplayAllSubCategories} path="/displayallsubcategories" />
        <Route strict props={props.history} component={Companies} path="/companies" />
        <Route strict props={props.history} component={DisplayAllCompanies} path="/displayallcompanies" />
        <Route strict props={props.history} component={Product} path="/products" />
        <Route strict props={props.history} component={DisplayAllProducts} path="/displayallproducts" />
        <Route strict props={props.history} component={Colors} path="/colors" />
        <Route strict props={props.history} component={DisplayAllColors} path="/displayallcolors" />
        <Route strict props={props.history} component={Model} path="/models" />
        <Route strict props={props.history} component={DisplayAllModels} path="/displayallmodels" />
        <Route strict props={props.history} component={FinalProduct} path="/finalproducts" />
        <Route strict props={props.history} component={DisplayAllFinalProducts} path="/displayallfinalproducts" />
        <Route strict props={props.history} component={AdminLogin} path="/adminlogin" />
        <Route strict props={props.history} component={Dashboard} path="/dashboard" />
        <Route strict props={props.history} component={Banners} path="/banners" />
        <Route strict props={props.history} component={DisplayAllBanners} path="/displayallbanners" />
        <Route strict props={props.history} component={Header} path="/header" />
        <Route strict history={props.history} component={Home} path="/home" />
        <Route strict props={props.history} component={Footer} path="/footer" />
        <Route strict props={props.history} component={Footer1} path="/footer1" />
        {/* <Route strict history={props.history} component={ProductList} path="/productlist/:id" /> */}
        <Route strict history={props.history} component={ProductList} path="/productlist" />
        <Route strict history={props.history} component={SignIn} path="/signin" />
        <Route strict history={props.history} component={SignUp} path="/signup" />
        <Route strict history={props.history} component={ShoppingCartComponent} path="/shoppingcartcomponent" />
        <Route strict history={props.history} component={SideBar} path="/sidebar" />
        <Route strict history={props.history} component={SubBanners} path="/subbanner" />
        <Route strict history={props.history} component={DisplayAllSubBanners} path="/displayallsubbanner" />
        <Route strict history={props.history} component={OrderSummary} path="/ordersummary" />
        <Route strict history={props.history} component={ProductView} path="/productview" />
        <Route strict history={props.history} component={PaymentGateway} path="/paymentgateway" />
        <Route strict history={props.history} component={UserProfile} path="/userprofile" />
        <Route strict history={props.history} component={ListSubCategoryFromCategory} path="/listsubcategoryfromcategory" />
        <Route strict history={props.history} component={ProductViewCartComponent} path="/productviewcartcomponent" />
        <Route strict history={props.history} component={DisplayAllOrders} path="/displayallorders" />
        <Route strict history={props.history} component={ShowAllTrendings} path="/showalltrendings" />
        <Route strict history={props.history} component={ShowNewArrivals} path="/shownewarrivals" />
        <Route strict history={props.history} component={SuccessPage} path="/success" />
        <Route strict history={props.history} component={MyCart} path="/mycart" />

      </Router>
    </div>
  );
}

export default App;
