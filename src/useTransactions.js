import { useContext } from "react";
import { ExpenseTrackerContext } from "./context/context";
import { incomeCategories,expenseCategories,resetCategories } from "./constants/categories";

//CUSTOM HOOK

const useTransactions=(title)=>{
    
    const {transactions}=useContext(ExpenseTrackerContext);
    const transactionsPerType=transactions.filter((t)=>t.type==title)
    const total=transactionsPerType.reduce((acc,curr)=>acc+=curr.amount,0);
    const categories=title=="Income"?incomeCategories:expenseCategories;
    transactionsPerType.forEach(t => {
        const category=categories.find((c)=>c.type==t.category) //revise this
        if(category){
            category.amount+=t.amount;
        }
    });
    const reqCategories=categories.filter((t)=>t.amount>0);
        //make the chart data
    const chartData={
        datasets:[{
            data:reqCategories.map((c)=>c.amount),
            backgroundColor:reqCategories.map((c)=>c.color)
        }],
        labels:reqCategories.map((c)=>c.type),
    }
    resetCategories();
    return {reqCategories,total,chartData};
}
export default useTransactions