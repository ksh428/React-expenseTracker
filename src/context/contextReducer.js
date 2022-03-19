//reducer is a function that takes in a new state and a action and return s new state
let transactions;
const contextReducer=(state,action)=>{
    if(action.type=="DELETE_TRANSACTION"){
         transactions=state.filter((t)=>t.id!=action.payload);
         localStorage.setItem('transactions',JSON.stringify(transactions));
        return transactions;

    }else if(action.type=="ADD_TRANSACTION"){
         transactions=[action.payload,...state];
         localStorage.setItem('transactions',JSON.stringify(transactions));
        return transactions;
    }else return state;

}
export default contextReducer;