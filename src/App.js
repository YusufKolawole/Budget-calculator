import React, {Fragment, useState} from "react"
import "./App.css"
import ExpenseList from "./components/expenseList"
import Alert from "./components/alert"
import ExpenseForm from "./components/expenseForm"
import {v4 as uuidv4} from "uuid"
//localStorage.getItem('item name')
//localStorage.setItem('item name')
// const initialExpense = [
//   {id:uuidv4(), charge: 'rent', amount:1600},
//   {id:uuidv4(), charge: 'car payment', amount:400},
//   {id:uuidv4(), charge: 'credit card bill', amount:1200},
//   {id:uuidv4(), charge: "Macbook pro", amount: 2000},
// ]

function App() {
  //******************* states values *************** */
  // all expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpense)
  // single expense
  const [charge, setCharge] = useState('');

   // single amount
   const [amount, setAmount] = useState('');

   const [alert, setAlert] = useState({show:false})

   //edit
  const [edit, setEdit] = useState(false)
   //edit item
   const [id, setId] = useState(0)
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
      if(edit){
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item;
        });
        setExpenses(tempExpenses)
        setEdit(false);
        handleAlert({type:'success', text:"item edited"})
      }else{
        const singleExpense = {id:uuidv4(), charge, amount};
        setExpenses([...expenses, singleExpense])
        handleAlert({type: 'success', text: 'item added'});
      }
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
  //clear all items

    const clearItems = () => {
      setExpenses([])
      handleAlert({type: "danger", text:"All items deleted!"})
    }

    //handle delete

    const handleDelete = (id) => {
      let tempExpenses = expenses.filter((item)=>item.id !== id);
      setExpenses(tempExpenses)
      handleAlert({type:'danger', text: "item deleted"})
    }

    ///edit

    const handleEdit = id => {
      let expense = expenses.find(item => item.id === id)
      let {charge, amount} = expense
      setCharge(charge);
      setAmount(amount);
      setEdit(true);
      setId(id)
      
    }
  return(
    <Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
    <h1>Daily/Weekly budget calculator for Beginners</h1>
    <main className="App">
    <ExpenseForm charge={charge} amount={amount}
    handleAmount={handleAmount} handleCharge={handleCharge}
    handleSubmit={handleSubmit}
    edit={edit}
    />
    <ExpenseList expenses={expenses} handleDelete={handleDelete} 
    handleEdit={handleEdit}
    clearItems={clearItems}
    />
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