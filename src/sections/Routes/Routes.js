import React, {useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import { HabaneroAppBar } from '../../components/HabaneroAppBar';
import { Home } from '../Home/Home';
import Login from '../Login/Login';
import {FormWorker} from "../../components/FormWorker";
import {setWorkerTypes} from "../../slices/workerSlice";
import {useDispatch} from "react-redux";

const getWorkers = (dispatch) => {
    fetch('http://localhost:5000/workers/getWorkers')
        .then(response => response.json())
        .then(data => dispatch(setWorkerTypes(data)))
}

export const Routes = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        getWorkers(dispatch)
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
                        path="/"
                        component={Home}
                    />
            </Switch>
        </>
    )
}
