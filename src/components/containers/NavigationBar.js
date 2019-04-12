import React, { Component } from 'react';
import {FaHome, FaUtensils, FaDrumstickBite} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import '../../css/navbar.css';
import Button from '@material-ui/core/Button';


const navLinks = [
    {
        href: "/",
        icon: <FaHome/>
    },
    {
        href: "/recipe/",
        icon: <FaUtensils/>
    },
    {
        href: "/ingredient/",
        icon: <FaDrumstickBite/>
    },
];


class NavigationBar extends Component {
    render() {
        const navButtons = navLinks.map( (item, step) => (
            <Button color="primary" size="small" variant="contained" href={item.href}
                key={step}>
                <IconContext.Provider value={{size: "1.5em"}}>
                    {item.icon}
                </IconContext.Provider>
            </Button>
        ));

        return (
            <nav className="navbar">
                {navButtons}
            </nav>
        )
    }
}


export default NavigationBar;