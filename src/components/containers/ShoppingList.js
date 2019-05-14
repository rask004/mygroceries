import React, { Component } from 'react';
import * as DateFns from 'date-fns';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { addShoppingDay, removeShoppingDay, 
    createShoppingLists, removeShoppingItem, addShoppingItem } from '../../store/actions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {FaTrash, FaPlus} from 'react-icons/fa'
import 'typeface-roboto';
import '../../css/shoppinglist.css';