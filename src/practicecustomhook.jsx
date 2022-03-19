import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import { incomeCategories,expenseCategories,resetCategories } from "./constants/categories";

const usePractice=(title)=>{
    const {transactions}=useContext(ExpenseTrackerContext);
    const trpertype=transactions.filter((t)=>t.type==title);
    const tot=trpertype.reduce((acc,curr)=>acc+=curr.value,0);

}