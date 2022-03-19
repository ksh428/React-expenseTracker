import { makeStyles } from "@material-ui/core";
import { BorderBottom } from "@material-ui/icons";

export default makeStyles(()=>({
    income:{
        BorderBottom:'10px solid rgba(0,255,0,0.5)',
    },
    expense:{
        BorderBottom:'10px solid rgba(255,0,0,0.5)',
    },
}));