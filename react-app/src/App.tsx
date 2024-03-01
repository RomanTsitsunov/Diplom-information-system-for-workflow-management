import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link
          className="App-link"
          to="login"
        >
          Login
        </Link>
        <br/>
        <Link
          className="App-link"
          to="registration"
        >
          Registration
        </Link>
      </header>
    </div>
  );
}

export default App;
