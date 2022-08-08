import React from 'react';
import './App.css';
import Logo from './Logo'
import Button from './Button'
import Welcome from './Welcome';
import Clock from './Clock';

const number = 10

function App() {
  const [names, setNames] = React.useState(['Tung', 'A', 'OK', ' KHONG DUOC'])
  React.useEffect(() => {
    setTimeout(() => {
      setNames(['Tung', 'ALo', 'OK', 'DUOC KHONG'])
    }, 10000)
  }, []);

  const [colors] = React.useState(['red', 'green', 'blue', 'black'])

  return (
    <div className="App">
      <Button />
      {/* <Welcome message="Welcome1" color = "red"  isHidden={true}/>
      <Welcome message="Welcome2" color = "green" handleClick={() => console.log('hi')}/> */}
      {/* <Welcome message="Welcome3" names={names} isHidden={false} /> */}
      <Welcome message=""  color = {colors} />
      <Clock />
      {/*<header className="App-header">
        <Logo/>
        
        <p className='App-p'>
          {1+1+1}
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
      </header>*/}
      {/* <img src={logo} className="App-logo" alt="logo" /> (Dong 11) */}
    </div>
  );
}

export default App;
