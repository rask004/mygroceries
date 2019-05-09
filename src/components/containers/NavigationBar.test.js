import React from 'react';
import {create} from 'react-test-renderer';

import NavigationBar from './NavigationBar';


const navbar = <NavigationBar
        />  


describe('MealPlanner Component rendering tests', () => {
    test('rendering snapshot', () => {
        const component = create(navbar);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
