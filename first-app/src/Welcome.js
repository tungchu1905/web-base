import React from "react"

class Welcome extends React.Component {

    // renderWelcome = () =>{
    //     const {isHidden} = this.props;
    //     if(isHidden){
    //         return <div style={{display: 'none'}} ></div>
    //     }
    //     return <div >{this.props.message? this.props.message.toUpperCase():''}</div>
    // }
    state = {
        color: 'white'
    }

    render() {
        const isShow = !this.props.isHidden
        console.log(this.props)
        return (
            <div style={{
                color: this.props.color || 'blue',
                textAlign: 'center',
                backgroundColor: this.state.color
            }}
            >
            {/* {this.renderWelcome()} */}
                {isShow ? (
                    <div >
                        {this.props.message ? this.props.message.toUpperCase() : ''}
                    </div>
                ) : null}

                
                {/* {this.props.names.map((name, idx)=><input key={idx} value={name}/>)} */}
                
                {this.props.color.map((color, idx) =>
                    <button onClick={this.onChange = () => {
                        this.setState({ color: this.props.color[idx] });
                    }}
                        style={{
                            backgroundColor: this.props.color[idx],
                            padding: '10px',
                            margin: '10px'
                        }} key={idx}>{color}
                    </button>)
                }

            </div>
        )
    }

}
export default Welcome