import {setWorkerTypes} from "./slices/workerSlice";
import {setCropTypes} from "./slices/cropSlice";

export const url = 'http://localhost:5000/';

export const postNewWorker = async (data) => {
    await fetch(`${url}workers/createWorker`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export const postNewCut = async (data) => {
    await fetch(`${url}cuts/createCut`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export const postNewSell = async (data) => {
    await fetch(`${url}sells/createSell`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

 export const getCutWorkersList = (setCutWorkersList) => {
    fetch(`${url}workers/getCutWorkers`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
    })
        .then(response => response.json())
        .then((data) => setCutWorkersList(data))
        .catch(() => [])
}

export const getSupervisorWorkersList = (setSupervisorWorkersList) => {
    fetch(`${url}workers/getSupervisorWorkers`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
    })
        .then(response => response.json())
        .then((data) => setSupervisorWorkersList(data))
        .catch(() => [])

}

export const getWorkerTypes = (dispatch) => {
    fetch(`${url}workers/getWorkerTypes`)
        .then(response => response.json())
        .then(data => dispatch(setWorkerTypes(data)))
}

export const getCropTypes = (dispatch) => {
    fetch(`${url}crops/getCropTypes`)
        .then(response => response.json())
        .then(data => dispatch(setCropTypes(data)))
}
