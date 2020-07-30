import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/dPlayer';
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DPlayersForm from "./DPlayersForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from 'react-toast-notifications';

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },

    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }

})

//prop
const DPlayers = ({ classes, ...props }) => {

    const [currentID, setCurrentID] = useState(0)


    useEffect(() => {
        props.fetchAllDPlayers()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure you want to delete this record?'))
            props.deletePlayer(id, () => addToast("Deleted successfully", { appearance: 'info' }))
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DPlayersForm {...({ currentID, setCurrentID })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Forename</TableCell>
                                    <TableCell>Surname</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dPlayerList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.forename}</TableCell>
                                            <TableCell>{record.surname}</TableCell>
                                            <TableCell>{record.age}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary" onClick={() => { setCurrentID(record.playerID) }}></EditIcon></Button>
                                                    <Button><DeleteIcon color="secondary" onClick={() => onDelete(record.playerID)}></DeleteIcon></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
        </Paper>
    );

}

const mapStateToProps = state => ({
    dPlayerList: state.dPlayer.list
})


const mapActionToProps = {
    fetchAllDPlayers: actions.fetchAll,
    deletePlayer: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DPlayers)); 