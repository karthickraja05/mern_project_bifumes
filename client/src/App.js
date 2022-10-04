import AppBar1 from './components/AppBar';
import FormCard1 from './components/formCard';
import ReactTable from './components/transactionTable';
import {useState,useEffect} from 'react';
import Container from '@mui/material/Container';




function App() {

  const [transactions,setTransaction] = useState([]);
  const [editTransaction,setEditTransaction] = useState({});
  
  useEffect(()=>{
    getAllData();
  },[])

  async function getAllData(){
    let res = await fetch('http://localhost:4000/transaction');
    let data = await res.json();
    setTransaction(data.data);
    setEditTransaction({});
  }

  return (
    <div className="App">
      <AppBar1 />
      <Container sx={{marginTop:5}}>
        <FormCard1 
          getAllData={getAllData}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <ReactTable 
          rows={transactions}
          getAllData={getAllData}
          setEditTransaction={setEditTransaction}
        />
      </Container>
    </div>
  );
}

export default App;
