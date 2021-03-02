import React from "react";
import {Button, Container, Grid} from "@material-ui/core";
import {habaneroColors} from "../../classes/colorClasses";
import { Link } from 'react-router-dom';

export const Home = () => {
    const color = habaneroColors();
    return (
        <Container maxWidth={"sm"} className={"fullWidth centerVertical"}>
            <Grid container spacing={6}>
                <Grid item xs style={{textAlign: "center"}}>
                    <Button component={Link} to="/Cut" variant="contained" classes={{root: color.root}} size={"large"}>
                        Registro de corte
                    </Button>
                </Grid>
                <Grid item xs style={{textAlign: "center"}}>
                    <Button component={Link} to="/Sell" variant="contained" classes={{root: color.root}} size={"large"}>
                        Registro de venta
                    </Button>
                </Grid>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Button component={Link} to="/Worker" variant="contained" classes={{root: color.root}} size={"large"}>
                        Registro de trabajador
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}
