import React, {Fragment, useState} from "react"
import "./App.css"
import ExpenseList from "./components/expenseList"
import Alert from "./components/alert"
import ExpenseForm from "./components/expenseForm"
import {v4 as uuidv4} from "uuid"
const initialExpense = [
  {id:uuidv4(), charge: 'rent', amount:1600},
  {id:uuidv4(), charge: 'car payment', amount:400},
  {id:uuidv4(), charge: 'credit card bill', amount:1200},
  {id:uuidv4(), charge: "Macbook pro", amount: 2000},
]

function App() {
  //******************* states values *************** */
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpense)
  // single expense
  const [charge, setCharge] = useState('');

   // single amount
   const [amount, setAmount] = useState('');

   const [alert, setAlert] = useState({show:false})
  //************functionality*********** */
  //handlecharge
  const handleCharge = e => {
    setCharge(e.target.value)
  }
 // handle amount
  const handleAmount = e => {
      setAmount(e.target.value)
  }

  ////handle our alert
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text})
    setTimeout(()=>{
      setAlert({show:false})
    }, 3000)
  }

  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      const singleExpense = {id:uuidv4(), charge, amount};
      setExpenses([...expenses, singleExpense])
      handleAlert({type: 'success', text: 'item added'});
      setCharge("");
      setAmount("");
    }else{
      //handleAlert called
      handleAlert({
        type: "danger",
        text: `Charge can't be empty value and amount value 
        has to be bigger than zero
        `
      });
    } 
  };
  return(
    <Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
    <h1>budget calculator</h1>
    <main className="App">
    <ExpenseForm charge={charge} amount={amount}
    handleAmount={handleAmount} handleCharge={handleCharge}
    handleSubmit={handleSubmit}
    />
    <ExpenseList expenses={expenses}/>
    </main>
    <h1>
      total spending:<span className="total">
        ${expenses.reduce((acc, curr) =>{
          return (acc += parseInt(curr.amount));
        }, 0)}
      </span>
    </h1>
    </Fragment>
  )
}

export default App