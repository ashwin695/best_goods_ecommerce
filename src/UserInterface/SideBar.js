import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import Slider from '@mui/material/Slider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Radio from '@mui/material/Radio';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import { getData } from "../FetchNodeServices";
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles({
    componentbg: {
        background: '#ecf0f1',
        width: 250,
        display: 'flex',
        justifyContent: 'center',
        padding: 22
    },
    subdiv: {
        background: '#FFF',
        width: 230,
    }
})

export default function SideBar(props) {
    const classes = useStyles(props)
    const [value, setValue] = useState([999, 30000]);
    const [sortOpen, setSortOpen] = useState(false)
    const [sortSelectedValue, setSortSelectedValue] = React.useState('');
    const [discOpen, setDiscOpen] = useState(false)
    const [discSelectedValue, setDiscSelectedValue] = React.useState('');
    const [comOpen, setComOpen] = useState(false)
    const [comChecked, setComChecked] = React.useState();
    const [stock, setStock] = React.useState(false);
    const [listCompany, setListCompany] = useState([])
    const [minPrice, setMinPrice] = useState(999)
    const [maxPrice, setMaxPrice] = useState(99999)

    const minDistance = 10;

    useEffect(function () {
        fetchAllCompanies()
    }, [])

    const fetchAllCompanies = async () => {
        var result = await getData('company/displayallcompany')
        setListCompany(result.data)
    }

    const handleSliderChange = async(event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
          setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
          setMinPrice(value[0])
          await props.fetchAllProductByPrice(value[0], value[1])
        } else {
          setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
          setMaxPrice(value[1])
          await props.fetchAllProductByPrice(value[0], value[1])
        }
    };

    const handleSortClick = () => {
        setSortOpen(!sortOpen);
    };

    const handleSortChange = (event) => {
        setSortSelectedValue(event.target.value);
    }

    const handleDiscountClick = () => {
        setDiscOpen(!discOpen);
    };

    const handleDiscountChange = (event) => {
        setDiscSelectedValue(event.target.value);
    }

    const handleComClick = () => {
        setComOpen(!comOpen);
    };

    const handleComChange = (event) => {
        setComChecked(event.target.checked);
    }

    const handleStock = (event) => {
        setStock(event.target.checked);
    }

    return (
        <div className={classes.componentbg} style={{ position: '-webkit-sticky', position: 'sticky', top: 50, zIndex: 5 }}>
            <div className={classes.subdiv}>
                <div style={{ margin: 10, fontWeight: 'bold', fontSize: 17 }}>Filters</div>
                <hr style={{ border: '#bdc3c7', background: '#bdc3c7', height: 2 }}></hr>

                <div style={{ margin: 10 }}>
                    <div style={{ fontWeight: 'bold' }}>
                        Price
                    </div>
                    <div style={{ margin: 10 }}>
                        <Slider fullWidth
                            getAriaLabel={() => 'Minimum Distance'}
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            disableSwap
                            min={1}
                            max={100000}
                            
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <div style={{fontSize:12}}>Min<br />{minPrice}</div>
                        <div style={{ marginLeft: 'auto',fontSize:12}}>Max<br />{maxPrice}</div>
                    </div>
                </div>

                <hr style={{ border: '#bdc3c7', background: '#bdc3c7', height: 2 }}></hr>

                <div>
                    <ListItemButton onClick={handleSortClick}>
                        <div style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>
                            Sort By

                            {sortOpen ? <div style={{ display: 'flex', justifyContent: 'end', width: 140, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(90deg)' }} /></div>
                                : <div style={{ display: 'flex', justifyContent: 'end', width: 140, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(270deg)' }} /></div>}
                        </div>
                    </ListItemButton>

                    <Collapse in={sortOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2, }}>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={sortSelectedValue === 'lowtohigh'}
                                            onChange={handleSortChange}
                                            value="lowtohigh"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'low to high' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>Low to High</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={sortSelectedValue === 'hightolow'}
                                            onChange={handleSortChange}
                                            value="hightolow"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'high to low' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>High to Low</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={sortSelectedValue === 'oldesttonewest'}
                                            onChange={handleSortChange}
                                            value="oldesttonewest"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'oldest to newest' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>Oldest to Newest</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={sortSelectedValue === 'newesttooldest'}
                                            onChange={handleSortChange}
                                            value="newesttooldest"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'newest to oldest' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>Newest to Oldest</div>
                                    </div>
                                </div>

                            </ListItemButton>
                        </List>
                    </Collapse>
                </div>

                <hr style={{ border: '#bdc3c7', background: '#bdc3c7', height: 1.5 }}></hr>

                <div>
                    <ListItemButton onClick={handleDiscountClick}>
                        <div style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>
                            Discount

                            {discOpen ? <div style={{ display: 'flex', justifyContent: 'end', width: 130, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(90deg)' }} /></div>
                                : <div style={{ display: 'flex', justifyContent: 'end', width: 130, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(270deg)' }} /></div>}
                        </div>
                    </ListItemButton>

                    <Collapse in={discOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2, }}>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={discSelectedValue === '40%ormore'}
                                            onChange={handleDiscountChange}
                                            value="40%ormore"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': '40% or more' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>40% or more</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={discSelectedValue === '30%ormore'}
                                            onChange={handleDiscountChange}
                                            value="30%ormore"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': '30% or more' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>30% or more</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={discSelectedValue === '20%ormore'}
                                            onChange={handleDiscountChange}
                                            value="20%ormore"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': '20% or more' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>20% or more</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            checked={discSelectedValue === '10%ormore'}
                                            onChange={handleDiscountChange}
                                            value="10%ormore"
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': '10% or more' }}
                                            size='very small'
                                        />
                                        <div style={{ fontSize: 13 }}>10% or more</div>
                                    </div>
                                </div>

                            </ListItemButton>
                        </List>
                    </Collapse>
                </div>

                <hr style={{ border: '#bdc3c7', background: '#bdc3c7', height: 2 }}></hr>

                <div>
                    <ListItemButton onClick={handleComClick}>
                        <div style={{ fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>
                            Companies

                            {comOpen ? <div style={{ display: 'flex', justifyContent: 'end', width: 115, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(90deg)' }} /></div>
                                : <div style={{ display: 'flex', justifyContent: 'end', width: 115, }}><ArrowBackIosNewIcon style={{ cursor: 'pointer', transform: 'rotate(270deg)' }} /></div>}
                        </div>
                    </ListItemButton>

                    <Collapse in={comOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2, }}>
                                
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Samsung</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Boat</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': 'realme' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Realme</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': 'sony' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Sony</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': 'noise' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Noise</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': '' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Apple</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': '' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>OnePlus</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': '' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>JBL</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': '' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>MI</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            checked={comChecked}
                                            onChange={handleComChange}
                                            inputProps={{ 'aria-label': '' }}
                                            size='small'
                                        />
                                        <div style={{ fontSize: 13 }}>Portronics</div>
                                    </div>
                                </div>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </div>

                <hr style={{ border: '#bdc3c7', background: '#bdc3c7', height: 1 }}></hr>

                <div style={{ display: 'flex', flexDirection: 'column', margin: 15 }}>
                    <span style={{ fontWeight: 'bold' }}>
                        Availability
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            checked={stock}
                            onChange={handleStock}
                            inputProps={{ 'aria-label': '' }}
                        />
                        <div style={{ fontSize: 15 }}>In Stock</div>
                    </div>
                </div>
            </div>

        </div>
    )
}