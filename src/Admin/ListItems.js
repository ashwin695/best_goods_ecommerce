import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from '@mui/material/Divider';
import DisplayAllCategories from "./DisplayAllCategories"
import DisplayAllSubCategories from "./DisplayAllSubCategories"
import DisplayAllCompanies from "./DisplayAllCompanies"
import DisplayAllProducts from './DisplayAllProducts'
import { makeStyles } from '@mui/styles';
import DisplayAllModels from './DisplayAllModels'
import DisplayAllColors from './DisplayAllColors'
import DisplayAllFinalProducts from './DisplayAllFinalProducts'
import DisplayAllBanners from './DisplayAllBanners'
import DisplayAllSubBanners from './DisplayAllSubBanners'
import DisplayAllOrders from './DisplayAllOrders'

export default function ListItems(props){
  const handleClick=(view)=>{
    props.setComponent(view)
  } 
  return(
    <div>
      
      <ListSubheader inset>Customer Orders</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" onClick={()=>handleClick(<DisplayAllOrders setComponent={props.setComponent}/>)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>

    <Divider />

    <ListSubheader inset>Data Management</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<DisplayAllCategories setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="SubCategories" onClick={()=>handleClick(<DisplayAllSubCategories setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" onClick={()=>handleClick(<DisplayAllCompanies setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Products" onClick={()=>handleClick(<DisplayAllProducts setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Models" onClick={()=>handleClick(<DisplayAllModels setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Colors" onClick={()=>handleClick(<DisplayAllColors setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Final Products" onClick={()=>handleClick(<DisplayAllFinalProducts setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Banners" onClick={()=>handleClick(<DisplayAllBanners setComponent={props.setComponent}/>)}/>
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="SubBanners" onClick={()=>handleClick(<DisplayAllSubBanners setComponent={props.setComponent}/>)}/>
    </ListItem>

  </div>
);
}