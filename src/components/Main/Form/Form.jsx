import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { ExpenseTrackerContext } from '../../../context/context'
import { TextField ,Typography,Grid ,Button,FormControl,InputLabel,SelectAll,MenuItem, Select} from '@material-ui/core'
import useStyles from './styles'
import {v4 as uuidv4} from 'uuid';
import { incomeCategories,expenseCategories } from '../../../constants/categories'
import formatDate from '../../../utils/formatDate'
import { useSpeechContext } from '@speechly/react-client'
import CustomisedSnackbar from '../../../SnackBar/Snackbar'

const initialState={
    amount:'',
    category:'',
    type:'Income',
    date:formatDate(new Date()),
}

const Form = () => {
    const classes=useStyles();
    const [formData,setFormData]=useState(initialState);
    console.log(formData);
    const {addTransaction}=useContext(ExpenseTrackerContext);//to destructure an object use {}
    const {segment}=useSpeechContext();
    const [open,setOpen]=useState(false);//snackbar state
    const createTransaction=()=>{
        //segment.isFinal && formData.amount && formData.date && formData.category && formData.type
        if(formData.amount && formData.date && formData.category && formData.type){
            const transaction={...formData,amount:Number(formData.amount),id:uuidv4()};
            setOpen(true);
            addTransaction(transaction);
            setFormData(initialState);
        }else return;
        
    }
    useEffect(()=>{
        if(segment){
            if(segment.intent.intent=='add_expense'){
                setFormData({...formData,type:'Expense'})
            }else if(segment.intent.intent=='add_income'){
                setFormData({...formData,type:'Income'})
            }else if(segment.isFinal && segment.intent.intent=="create_transaction"){
                return createTransaction();
            }else if(segment.isFinal && segment.intent.intent=="cancel_transaction"){
                setFormData(initialState)
            }
            segment.entities.forEach((e)=>{
                const category=`${e.value.charAt(0)}${e.value.slice(1).toLocaleLowerCase()}` //this is how its defind in categories.js
                switch(e.type){
                    case 'amount':
                        setFormData({...formData,amount:e.value});
                        break;
                    case 'category':
                        if(incomeCategories.map((ic)=>ic.type).includes(category)){
                            setFormData({...formData,type:"Income",category:category});
                        }else if(expenseCategories.map((ec)=>ec.type).includes(category)){
                            setFormData({...formData,type:"Expense",category:category});
                        }                  
                        break;
                    case 'date':
                        setFormData({...formData,date:e.value});
                        break;
                    default: break;
                }
            });
            //segment.isfinal: means we stop talking
            if(segment.isFinal && formData.amount && formData.date && formData.category && formData.type){
                createTransaction();
            }
        }

    },[segment])
    const selectedCategory=formData.type=="Income"?incomeCategories:expenseCategories;
    
    
  return (
    <Grid container spacing={2}>
        <CustomisedSnackbar open={open} setOpen={setOpen}/>
        <Grid item xs={12}>
            <Typography align="center" variant="subtitle2" gutterBottom>
                {segment?(
                    <>
                    {segment.words.map((w)=>w.value).join(" ")}
                    </>
                ):null                
                }
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value="Expense">Expense</MenuItem>
                </Select>

            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                {selectedCategory.map((c)=>(
                    <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>
                ))}
                </Select>

            </FormControl>

        </Grid>
        <Grid item xs={6}>
            <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})}/>

        </Grid>
        <Grid item xs={6}>
            <TextField type="date" label="date" fullWidth value={formData.date} onChange={(e)=>setFormData({...formData,date:formatDate(e.target.value)})}/>

        </Grid>
        <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
      
    </Grid >
  )
}

export default Form
