import AppBar1 from './components/AppBar';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <AppBar1 />
      <Outlet />
    </div>
  );
}

export default App;
