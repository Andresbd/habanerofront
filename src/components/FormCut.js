import React, {useEffect, useState} from "react";
import {
    Button,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {getCutWorkersList, getSupervisorWorkersList, postNewCut} from "../utils";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {habaneroColors} from "../classes/colorClasses";
import {DatePicker} from "@material-ui/pickers";
import moment from "moment";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '5vh',
        paddingLeft: '15vh'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export const FormCut = () => {
    const classes = useStyles();
    const color = habaneroColors();

    const crops = useSelector(state => state.crops.cropTypes);
    const [isDisabled, setIsDisabled] = useState(true);
    const [workerCut, setWorkerCut] = useState([{cortadorID: '', taras: 0}]);
    const [registerDate, setRegisterDate] = useState(moment(new Date()));
    const [cutWorkersList, setCutWorkersList] = useState([]);
    const [supervisorWorkersList, setSupervisorWorkersList] = useState([]);
    const [supervisorSelected, setSupervisorSelected] = useState('');
    const [cropSelected, setCropSelected] = useState('');
    const [cutterSelected, setCutterSelected] = useState('');
    const [tare, setTare] = useState(0);

    const handleSupervisorSelected = (event) => {
        setSupervisorSelected(event.target.value)
    }
    const handleDateChange = (date) => {
        setRegisterDate(date)
    }
    const handleCutterSelected = (event, key) => {
        setCutterSelected(event.target.value)
        workerCut[key]['cortadorID'] = event.target.value
    }
    const handleTareSelected = (event, key) => {
        setTare(event.target.value)
        workerCut[key]['taras'] = Number(event.target.value)
    }
    const handleAddCutter = () => {
        setWorkerCut([...workerCut, {cortadorID: '', taras: 0}])
    }
    const handleCropSelected = (event) => {
        setCropSelected(event.target.value)
    }

    const submitForm = (event) => {
        const data = {
            cutDate: registerDate.format(),
            supervisorId: supervisorSelected,
            cutWorkers: workerCut,
            cropType: cropSelected,
            totalTares: workerCut.reduce((acc, cur) => acc + cur['taras'], 0)
        }
        const createCut = postNewCut(data);
        createCut.then((res) => {
            console.log('Creation successfully')
        }).catch((error) => {
            console.log('Error in creation', error)
        })
        event.preventDefault()
    }

    useEffect(() => {
        getCutWorkersList(setCutWorkersList)
        getSupervisorWorkersList(setSupervisorWorkersList)
    }, [])

    useEffect(() => {
        setIsDisabled(!(supervisorSelected !== ''))
    }, [supervisorSelected])

    return (
        <Container maxWidth={"md"} style={{marginTop: "20vh"}} className={"fullWidth"}>
            <Button component={Link} to="/" classes={{root: color.root}} startIcon={<ArrowBackIcon />}>
                Regresar
            </Button>
            <form onSubmit={submitForm} className={classes.container} autoComplete={"off"} noValidate>
                <Grid container direction={"column"} spacing={4}>
                    <Grid item xs>
                        <Typography variant={"h5"}>
                            Registro de corte
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <DatePicker
                            label="Fecha de corte"
                            value={registerDate}
                            onChange={handleDateChange}
                            disableFuture={true}
                            animateYearScrolling
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"body2"}>Supervisor: </Typography>
                        <Select
                            style={{
                                minWidth: 120
                            }}
                            labelId={"worker-supervisor"}
                            label={"Supervisor"}
                            value={supervisorSelected}
                            onChange={handleSupervisorSelected}
                        >
                            {
                                supervisorWorkersList && supervisorWorkersList.length > 0 && supervisorWorkersList.map((type, key) => (
                                    <MenuItem key={key} value={type._id}>{`${type.name} ${type.lastName}`}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"body2"}>Cultivo: </Typography>
                        <Select
                            style={{minWidth: 120}}
                            labelId={"crop-select"}
                            label={"Cultivo"}
                            value={cropSelected}
                            onChange={handleCropSelected}
                        >
                            {
                                crops && crops.length > 0 && crops.map((crop, key) => (
                                    <MenuItem key={key} value={crop._id}>{crop.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    {
                        workerCut.map((worker, key) => (
                            <Grid container direction={"column"} spacing={4} key={key} style={{marginLeft: "16px", marginBottom: "8px"}}>
                                <Grid item xs>
                                    <Typography variant={"body2"}>Cortador: </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Select
                                        style={{
                                            minWidth: 120
                                        }}
                                        labelId={"worker-cut"}
                                        label={"Cortador"}
                                        value={worker['cortadorID']}
                                        onChange={(event) => handleCutterSelected(event, key)}
                                    >
                                        {
                                            cutWorkersList && cutWorkersList.length > 0 && cutWorkersList.map((type, key) => (
                                                <MenuItem key={key} value={type._id}>{`${type.name} ${type.lastName}`}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        label="Cantidad de taras"
                                        id="taras por cortador"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Taras</InputAdornment>,
                                        }}
                                        value={worker['taras']}
                                        onChange={(event) => handleTareSelected(event, key)}
                                    />
                                </Grid>
                            </Grid>
                        ))
                    }
                    <Grid item xs>
                        <Button onClick={handleAddCutter}>Registrar trabajador</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button disabled={isDisabled} type="submit" classes={{root: color.root}}>
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}
