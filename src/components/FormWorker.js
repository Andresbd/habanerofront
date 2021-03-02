import React, {useEffect, useState} from "react";
import moment from "moment";
import {Button, Container, Grid, makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {DatePicker} from '@material-ui/pickers';
import {habaneroColors} from "../classes/colorClasses";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {postNewWorker} from "../utils";

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

export const FormWorker = () => {
    const wrapper = React.createRef();
    const classes = useStyles();
    const color = habaneroColors();
    const workers = useSelector(state => state.worker.workerTypes)
    const [registerDate, setRegisterDate] = useState(moment(new Date()));
    const [workerName, setWorkerName] = useState("");
    const [workerLastName, setWorkerLasyName] = useState("");
    const [workerSecondLastName, setWorkerSecondLastName] = useState("");
    const [workerType, setWorkerType] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        setIsDisabled(!(workerName !== '' && workerLastName !== '' && workerSecondLastName !== '' && workerType !== ''))
    }, [workerName, workerLastName, workerSecondLastName, workerType])

    const handleDateChange = (date) => {
        setRegisterDate(date)
    }
    const handleNameChange = (event) => {
        setWorkerName(event.target.value)
    }
    const handleLastNameChange = (event) => {
        setWorkerLasyName(event.target.value)
    }
    const handleSecondLastNameChange = (event) => {
        setWorkerSecondLastName(event.target.value)
    }
    const handleWorkerTypeChange = (event) => {
        setWorkerType(event.target.value)
    }
    const minLengthError = (word) => {
        return word.length > 0 && word.length < 3
    }

    const submitForm = (event) => {

        const data = {
            hireDate: registerDate.format(),
            name: workerName,
            lastName: workerLastName,
            secondLastName: workerSecondLastName,
            rol: workerType
        }
        const createWorker = postNewWorker(data);

        createWorker.then((res) => {
            console.log('Creation successfully')
        }).catch((error) => {
            console.log('Error in creation', error)
        })
        event.preventDefault()
    }

    return (
        <Container ref={wrapper} maxWidth={"md"} style={{marginTop: "20vh"}} className={"fullWidth"}>
            <Button component={Link} to="/" classes={{root: color.root}} startIcon={<ArrowBackIcon />}>
                Regresar
            </Button>
            <form onSubmit={submitForm} className={classes.container} autoComplete={"off"} noValidate>
                <Grid container direction={"column"} spacing={4}>
                   <Grid item xs>
                       <Typography variant={"h5"}>
                           Datos del trabajador
                       </Typography>
                   </Grid>
                    <Grid item xs>
                        <DatePicker
                            label="Fecha de contratación"
                            value={registerDate}
                            onChange={handleDateChange}
                            animateYearScrolling
                            disableFuture={true}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField error={minLengthError(workerName)} id="standard-basic" label="Nombre" value={workerName} onChange={handleNameChange} />
                        <TextField error={minLengthError(workerName)} id="standard-basic" label="Apellido Paterno" value={workerLastName} onChange={handleLastNameChange} />
                        <TextField error={minLengthError(workerName)} id="standard-basic" label="Apellido Materno" value={workerSecondLastName} onChange={handleSecondLastNameChange} />
                    </Grid>
                    <Grid item xs>
                        <Select
                            style={{
                                minWidth: 120
                            }}
                            labelId={"worker-type"}
                            value={workerType}
                            onChange={handleWorkerTypeChange}
                        >
                            {
                                workers.map((type, key) => (
                                    <MenuItem key={key} value={type.title}>{type.title}</MenuItem>
                                ))
                            }
                        </Select>
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
