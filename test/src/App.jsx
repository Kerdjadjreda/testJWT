import './App.css';
import axios from "axios";
import { useState } from "react";
import NavBar from './components/NavBar';


function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, seSuccess] = useState(false);

  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        
        <p>
          Lets perform JWT !
        </p>
        <h2 className="text-emerald-600">
          Reda test
        </h2>
      </header>
    </div>
  );
}

export default App;
