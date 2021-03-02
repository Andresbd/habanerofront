import React, {useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import { HabaneroAppBar } from '../../components/HabaneroAppBar';
import { Home } from '../Home/Home';
import Login from '../Login/Login';
import {FormWorker} from "../../components/FormWorker";
import {useDispatch} from "react-redux";
import {FormCut} from "../../components/FormCut";
import {getCropTypes, getWorkerTypes} from "../../utils";
import {FormSell} from "../../components/FormSell";



export const Routes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        getWorkerTypes(dispatch)
        getCropTypes(dispatch)
    }, [dispatch])

    return (
        <>
            <HabaneroAppBar />
            <Switch>
                    <Route 
                        exact
                        path="/Login"
                        component={Login}
                    />
                    <Route
                        exact
                        path="/Worker"
                        component={FormWorker}
                    />
                    <Route
                        exact
                        path="/Cut"
                        component={FormCut}
                    />
                    <Route
                        exact
                        path="/Sell"
                        component={FormSell}
                    />
                    <Route
                        exact
                        path="/"
                        component={Home}
                    />
            </Switch>
        </>
    )
}
