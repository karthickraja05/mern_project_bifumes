import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useState,useEffect} from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';


const initStateVal = {
  amount : 0,
  description: '',
  date: new Date()
};

let edit = false;

export default function BasicCard({getAllData,editTransaction,setEditTransaction}) {
  const [form,setForm] = useState(initStateVal);
  
  
  useEffect(()=>{
    if(Object.keys(editTransaction).length !== 0){
      edit = true;
      setForm(editTransaction);
    }else{
      edit = false;
    }
    console.log(editTransaction);
  },[editTransaction])

  function handleInput(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  function handleDate(newValue){
    moment(newValue).format('MM/DD/YYYY');
    setForm({...form,date: newValue});
  }

  async function handleSubmit(e){
    e.preventDefault();
    await updateData();
    console.log("Working");
  }

  async function updateData(){
    let method = Object.keys(editTransaction).length ? 'PATCH' : 'POST';
    let res = await fetch('http://localhost:4000/transaction',{
      method,
      body: JSON.stringify(form),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    // let data = await res.json();
    if(res.ok){
      setForm(initStateVal);
      await getAllData();
    }
  }

  function setNew(){
    setEditTransaction({});
    setForm(initStateVal);
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6">
          Add New Transaction
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField sx={{ marginRight: 5 }} size="small" id="amount_id" label="Amount" variant="outlined" onChange={handleInput} value={form.amount} name="amount"  />
        <TextField sx={{ marginRight: 5 }} size="small" id="description_id" label="Description" variant="outlined" onChange={handleInput} value={form.description} name="description" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Transaction Date"
            inputFormat="MM/DD/YYYY"
            value={form.date}
            onChange={handleDate}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" sx={{ marginLeft: 5 }}>
          { Object.keys(editTransaction).length > 0 ? 'Update' : 'Submit'}
        </Button>
        { Object.keys(editTransaction).length > 0 && 
        <Button type="button" variant="contained" sx={{ marginLeft: 5 }} onClick={() => setNew() }>
          Add New
        </Button>
        }
        </form>
      </CardContent>
    </Card>
  );
}
