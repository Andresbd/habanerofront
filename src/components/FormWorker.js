import React, {useState} from "react";
import moment from "moment";
import {Button, Container, Grid, makeStyles, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {DatePicker} from '@material-ui/pickers';
import {habaneroColors} from "../classes/colorClasses";
import {Link} from "react-router-dom";
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
        console.log(data)
        event.preventDefault()
    }

    return (
        <Container ref={wrapper} maxWidth={"md"} style={{marginTop: "20vh"}} className={"fullWidth"}>
            <Button component={Link} to="/" classes={{root: color.root}} startIcon={<ArrowBackIcon />}>
                Regresar
            </Button>
            <form onSubmit={submitForm} className={classes.container} autoComplete={"off"} noValidate>
                <Grid container direction={"column"} spacing={4}>
                   <Grid item xs={12}>
                       <Typography variant={"h5"}>
                           Datos del cortador
                       </Typography>
                   </Grid>
                    <Grid item xs={12}>
                        <DatePicker
                            label="Fecha de contratación"
                            value={registerDate}
                            onChange={handleDateChange}
                            animateYearScrolling
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={minLengthError(workerName)} id="standard-basic" label="Nombre" value={workerName} onChange={handleNameChange} />
                        <TextField id="standard-basic" label="Apellido Paterno" value={workerLastName} onChange={handleLastNameChange} />
                        <TextField id="standard-basic" label="Apellido Materno" value={workerSecondLastName} onChange={handleSecondLastNameChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" classes={{root: color.root}}>
                            Registrar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
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
                </Grid>
            </form>
        </Container>
    )
}
