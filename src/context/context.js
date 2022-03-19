import React, {useReducer,createContext} from "react";
import contextReducer from "./contextReducer";

const initialState=JSON.parse(localStorage.getItem('transactions')) || [];


export const ExpenseTrackerContext=createContext();

export const Provider=(props)=>{
    
    const [transactions,dispatch]=useReducer(contextReducer,initialState);
    console.log(transactions);

    //dispatch means changing state
    const deleteTransaction=(id)=>{
        dispatch({type:"DELETE_TRANSACTION",payload:id});
    }
    const addTransaction=(transaction)=>{
        dispatch({type:"ADD_TRANSACTION",payload:transaction});
    }
    const balance=transactions.reduce((acc,curr)=>{
        return (curr.type=="Expense"?acc-curr.amount:acc+curr.amount);
    },0)
    
    return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,addTransaction,transactions,balance
        }}>
            {props.children}
        </ExpenseTrackerContext.Provider>

    )
}