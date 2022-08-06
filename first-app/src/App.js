
import './App.css';
import Logo from './Logo'

const number = 10
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo/>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p className='App-p'>
          {1+1}
          Edit <code>src/App.js</code> and save to reload. Tungchu
          {number}
        </p>
        <Logo/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
