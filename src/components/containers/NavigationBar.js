import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/navbar.css';


class NavigationBar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/recipe/">Recipes</Link>
                    </li>
                    <li>
                        <Link to="/ingredient/">Ingredients</Link>
                    </li>
                </ul>
                <hr/>
            </div>
        )
    }
}


export default NavigationBar;