import {useState} from 'react';

const initStateVal = {
  amount : 0,
  description: '',
  date: ''
};

function App() {

  const [form,setForm] = useState(initStateVal);

  function handleInput(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  async function updateData(){
    let res = await fetch('http://localhost:4000/transaction',{
      method: "POST",
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

  async function getAllData(){
    let res = await fetch('http://localhost:4000/transaction');
    let data = await res.json();
    console.log(data);
  }

  async function handleSubmit(e){
    e.preventDefault();
    await updateData();
    console.log("Working");
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="number" name="amount" onChange={handleInput} value={form.amount} />
        <input type="text" name="description" onChange={handleInput} value={form.description} />
        <input type="date" name="date" onChange={handleInput} value={form.date}/>
        <input type="submit" name="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
