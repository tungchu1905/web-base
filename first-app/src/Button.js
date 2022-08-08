import React from 'react';

class Button extends React.Component{
    state = { color: 'red' }

    handleChange = (option) => {
      if(option == "toggle"){
        const color = this.state.color === 'red' ? 'blue' : 'red';
        this.setState({ color });
      }else{
        alert("Hoooo")
      }
    }

    render() {
      return (<div>
        <input onChange={e => console.log(e.target.value)} />
        <button 
            style={{color: this.state.color}}
           //className={`btn ${this.state.color}`}
           onClick={() => this.handleChange("toggle")}
           >
            Toogle
        </button>
        <button 
           onClick={() => this.handleChange("notify")}
           >
            Notify
        </button>
      </div>);
    }
  }
  export default Button
  // Declarative programming: để đổi màu của button, 
  //ta chỉ cần đổi state (what) tượng trưng cho màu, máy tính tự tính toán để ra kết quả 