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
  const [expenses, setExpenses] = useState(initialExpense)
  return(
    <Fragment>
    <Alert/>
    <h1>budget calculator</h1>
    <main className="App">
    <ExpenseForm/>
    <ExpenseList expenses={expenses}/>
    </main>
    <h1>
      total spending:<span className="total">
        ${expenses.reduce((acc, curr) =>{
          return acc += curr.amount;
        }, 0)}
      </span>
    </h1>
    </Fragment>
  )
}

export default App