import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from '../actions/dPlayer';
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        },

        smMargin: {
            margin: theme.spacing(1)
        }

    }
})

const intitialFieldValues = {
    forename: '',
    surname: '',
    age: '',
    email: ''
}


const DPlayersForm = ({ classes, ...props }) => {

    //Toast message
    const { addToast } = useToasts()


    //validate() - validate entire form
    //validate({forename}) - validate field
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('forename' in fieldValues)
            temp.forename = fieldValues.forename ? "" : "This field is required."
        if ('surname' in fieldValues)
            temp.surname = fieldValues.surname ? "" : "This field is required."
        if ('age' in fieldValues)
            temp.age = fieldValues.age ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Invalid email format."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(intitialFieldValues, validate, props.setCurrentID)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted Succesfully.", { appearance: 'success' })
            }

            if (props.currentID == 0)
                props.createPlayer(values, onSuccess)
            else
                props.updatePlayer(props.currentID, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentID != 0) {
            setValues({
                ...props.dPlayerList.find(x => x.playerID == props.currentID)
            })
            setErrors({})
        }
    }, [props.currentID])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField name="forename" variant="outlined" label="Forename" value={values.forename} onChange={handleInputChange} {...(errors.forename && { error: true, helperText: errors.forename })}></TextField>
                    <TextField name="surname" variant="outlined" label="Surname" value={values.surname} onChange={handleInputChange} {...(errors.surname && { error: true, helperText: errors.surname })}></TextField>
                    <Button variant="contained" color="primary" type="submit" className={classes.smMargin}>Submit</Button>
                </Grid>

                <Grid item xs={6}>
                    <TextField name="age" variant="outlined" label="Age" value={values.age} onChange={handleInputChange} {...(errors.age && { error: true, helperText: errors.age })}></TextField>
                    <TextField name="email" variant="outlined" label="Email" value={values.email} onChange={handleInputChange} {...(errors.email && { error: true, helperText: errors.email })}></TextField>
                    <Button variant="contained" className={classes.smMargin} onClick={resetForm}>Reset</Button>
                </Grid>
            </Grid>

        </form >);

}

const mapStateToProps = state => ({
    dPlayerList: state.dPlayer.list
})


const mapActionToProps = {
    createPlayer: actions.create,
    updatePlayer: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DPlayersForm));