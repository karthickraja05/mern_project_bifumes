import AppBar1 from './components/AppBar';
import FormCard1 from './components/formCard';
import ReactTable from './components/transactionTable';
import {useState,useEffect} from 'react';
import Container from '@mui/material/Container';




function App() {

  const [transactions,setTrasaction] = useState([]);
  
  useEffect(()=>{
    getAllData();
  },[])

  async function getAllData(){
    let res = await fetch('http://localhost:4000/transaction');
    let data = await res.json();
    setTrasaction(data.data);
  }

  return (
    <div className="App">
      <AppBar1 />
      <Container sx={{marginTop:5}}>
        <FormCard1 
          getAllData={getAllData}
        />
        <ReactTable 
          rows={transactions}
          getAllData={getAllData}
        />
      </Container>
    </div>
  );
}

export default App;
