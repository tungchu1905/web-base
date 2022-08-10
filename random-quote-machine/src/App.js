import React, { Component } from 'react';
import './App.css';
import QuoteBox from './components/QuoteBox/QuoteBox';
import Clock from './components/Clock/Clock';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Tags from './components/Tags/Tags';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShowClock: false,
      activeColor: 'cornflowerblue',
      activeTags: [],

    }
  }

  //Clock
  toggleShowClock = () => {
    this.setState(preState => ({
      isShowClock: !preState.isShowClock
    }))
  }

  //Tags
  handleChangeTag = (tagName) => {
    this.setState(preState => {
      const { activeTags: oldActiveTags } = preState;

      const isActive = oldActiveTags.includes(tagName);

      if (isActive) {
        const newActiveTags = oldActiveTags.filter(t => t !== tagName)
        return {
          activeTags: newActiveTags
        }
      }

      return {
        activeTags: [...oldActiveTags, tagName]
      }
    })
  }

  //ColorPicker
  onChangeBackgroundColor = (newColor) => {
    this.setState({ activeColor: newColor })
  }

  render() {
    const { isShowClock, activeColor, activeTags } = this.state
    return (
      <div className="App" style={{ background: activeColor }}>
        <div className='App-Header'>
          Random Quote Machine
        </div>

        <div>
          <span>Show Clock</span>
          <input type="checkbox" checked={isShowClock}
            onChange={this.toggleShowClock} />
        </div>
        {isShowClock ? <Clock /> : null}

        <div className='App-content'>
          <QuoteBox
            activeTags={activeTags}
            activeColor={activeColor} />
        </div>
        <div className='App-picker'>
          <ColorPicker 
            onChangeBackgroundColor={this.onChangeBackgroundColor}
            activeColor={activeColor} />
        </div>
        <div className='App-tags'>
          <Tags 
            handleChangeTag={this.handleChangeTag}
            activeTags={activeTags} />
        </div>
      </div>
    );
  }

}

export default App;
