import React from 'react';
import {create}  from 'react-test-renderer';

import Navbar from './NavigationBar';


describe('Navbar render tests' , () => {
    test('Navbar renders correctly', () => {
        const tree = create(<Navbar/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
