import React from "react";
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import useStyles from './styles';


const CustomisedSnackbar = ({open,setOpen}) => {
    const classes=useStyles();
    const handleclose=(event,reason)=>{
        if(reason=="clickaway") return;
        setOpen(false);
    }
    return (
        <div className={classes.root}>
            <Snackbar
            anchorOrigin={{vertical:"bottom",horizontal:"right"}}
            open={open}
            autoHideDuration={3000}
            onClose={handleclose}
            >
                <MuiAlert onClose={handleclose} severity="success" elevation={6} variant="filled" >
                    Succesfull Transaction!!
                </MuiAlert>

            </Snackbar>        
        </div>
    )
}

export default CustomisedSnackbar
