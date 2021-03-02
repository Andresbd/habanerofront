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
import {habaneroColors} from "../classes/colorClasses";
import {useSelector} from "react-redux";
import moment from "moment";
import {getSupervisorWorkersList, postNewSell} from "../utils";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {DatePicker} from "@material-ui/pickers";

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

export const FormSell = () => {
    const classes = useStyles();
    const color = habaneroColors();

    const crops = useSelector(state => state.crops.cropTypes);
    const [isDisabled, setIsDisabled] = useState(true);
    const [registerDate, setRegisterDate] = useState(moment(new Date()));
    const [supervisorWorkersList, setSupervisorWorkersList] = useState([]);
    const [supervisorSelected, setSupervisorSelected] = useState('');
    const [cropSelected, setCropSelected] = useState('');
    const [arpiesCount, setArpiesCount] = useState(0);
    const [arpiesWeight, setArpiesWheight] = useState(0);
    const [firstGreen, setFirstGreen] = useState(0);
    const [firstGrown, setFirstGrown] = useState(0);
    const [secondGrown, setsecondGrown] = useState(0);
    const [secondGreen, setSecondGreen] = useState(0);
    const [residue, setResidue] = useState(0);

    const handleSupervisorSelected = (event) => {
        setSupervisorSelected(event.target.value)
    }
    const handleDateChange = (date) => {
        setRegisterDate(date)
    }
    const handleCropSelected = (event) => {
        setCropSelected(event.target.value)
    }
    const handleArpiesCountChange = (event) => {
        setArpiesCount(event.target.value)
    }
    const handleArpiesWeightChange = (event) => {
        setArpiesWheight(event.target.value)
    }
    const handleFirstGreenChange = (event) => {
        setFirstGreen(event.target.value)
    }
    const handleFirstGrownChange = (event) => {
        setFirstGrown(event.target.value)
    }
    const handleSecondGreenChange = (event) => {
        setSecondGreen(event.target.value)
    }
    const handleSecondGrownChange = (event) => {
        setsecondGrown(event.target.value)
    }
    const handleResidueChange = (event) => {
        setResidue(event.target.value)
    }

    const submitForm = (event) => {
        const data = {
            sellDate: registerDate.format(),
            supervisorId: supervisorSelected,
            cropType: cropSelected,
            arpies: {
                count: arpiesCount,
                weight: arpiesWeight
            },
            crop: {
                first: {
                    green: firstGreen,
                    grown: firstGrown
                },
                second: {
                    green: secondGreen,
                    grown: secondGrown
                },
                residue: residue
            }
        }

        const createSell = postNewSell(data);
        createSell.then((res) => {
            console.log('Creation successfully')
        }).catch((error) => {
            console.log('Error in creation', error)
        })

        event.preventDefault()
    }

    useEffect(() => {
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
                            Registro de venta
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
                                    <MenuItem key={key} value={type._id}>{type.name}</MenuItem>
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
                    <Grid item xs>
                        <TextField
                            label="Cantidad de arpillas"
                            id="total-arpillas"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Arpillas</InputAdornment>,
                            }}
                            value={arpiesCount}
                            onChange={handleArpiesCountChange}
                        />
                        <TextField
                            label="Peso de arpillas"
                            id="peso-arpillas"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            value={arpiesWeight}
                            onChange={handleArpiesWeightChange}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"body2"}>Primera:</Typography>
                        <TextField
                            label="Primera verde"
                            id="first-green"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            value={firstGreen}
                            onChange={handleFirstGreenChange}
                        />
                        <TextField
                            label="Primera maduro"
                            id="first-grown"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            value={firstGrown}
                            onChange={handleFirstGrownChange}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"body2"}>Segunda:</Typography>
                        <TextField
                            label="Segunda verde"
                            id="second-green"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            value={secondGreen}
                            onChange={handleSecondGreenChange}
                        />
                        <TextField
                            label="Segunda maduro"
                            id="second-grown"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            value={secondGrown}
                            onChange={handleSecondGrownChange}
                        />
                    </Grid>
                    <Grid item xs>
                        <Typography variant={"body2"}>Merma:</Typography>
                        <TextField
                            label="Merma"
                            id="residue"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                            }}
                            value={residue}
                            onChange={handleResidueChange}
                        />
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
