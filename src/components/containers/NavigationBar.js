import React, { Component } from 'react';
import {FaHome, FaUtensils, FaDrumstickBite} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import '../../css/navbar.css';
import Button from '@material-ui/core/Button';


class NavigationBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <Button color="primary" size="small" variant="contained" href="/">
                    <IconContext.Provider value={{size: "1.5em"}}>
                        <FaHome/>
                    </IconContext.Provider>
                </Button>
                <Button color="primary" size="small" variant="contained" href="/recipe/">
                    <IconContext.Provider value={{size: "1.5em"}}>
                        <FaUtensils/>
                    </IconContext.Provider>
                </Button>
                <Button color="primary" size="small" variant="contained" href="/ingredient/">
                    <IconContext.Provider value={{size: "1.5em"}}>
                        <FaDrumstickBite/>
                    </IconContext.Provider>
                </Button>
            </nav>
        )
    }
}


export default NavigationBar;