import axios from "axios";
import React from "react";
import './Login.css'
export default function Login() {

    const [formState, setFormState] = React.useState({
        username: '',
        password: '',
    })
    const  [showErrTest, setShowErrTest]  = React.useState(false)
    const inputRef = React.useRef();

    const onChangeForm = (e) => {
        const { value, name } = e.target;
        setFormState(prevFormState => {
            return {
                ...prevFormState,
                [name]: value
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(formState)
        // axios.post('')
        if(!inputRef.current.value){
            setShowErrTest(true)
        }else{
            setShowErrTest(false)
        }
    }
    return (
        <div className="Login container-fluid" style={{ background: '#fafafa' }}>
            <div className="vh-100 justify-content-md-center align-items-center row">
                <div className="col-md-4 col-12">
                    <div className="card-wrapper p-4">
                        <form onSubmit={onSubmit} className="">
                            <h4 className="mb-4">MindX Images</h4>
                            <div className="mb-4">
                                <div className="form-group">
                                    <input
                                        name="username"
                                        placeholder="Enter your email..."
                                        className="form-control"
                                        value={formState.username}
                                        onChange={onChangeForm}
                                    />
                                    {formState.username.length == "" && <div style={{ color: 'red' }}>Username not blank</div>}
                                </div>
                                <div className="form-group">
                                    <input
                                        name="password"
                                        placeholder="Enter your password..."
                                        type="password"
                                        className="form-control"
                                        value={formState.password}
                                        onChange={onChangeForm}
                                    />
                                    {formState.password.length < 6 && <div style={{ color: 'red' }}>Password min length 6</div>}
                                </div>
                                
                                {/* tesst thu */}
                                <div className="form-group">
                                    <input
                                        ref={inputRef}
                                        name="test"
                                        placeholder="Enter your test..."
                                        className="form-control"
                                        // value={formState.password}
                                        onChange={onChangeForm}

                                    />
                                    {showErrTest  && (
                                        <div style={{ color: 'red' }}>Not blank</div>)}
                                            
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                Đăng nhập
                            </button>
                        </form>
                    </div>
                    <div className="card-wrapper mt-4 p-3">
                        <div>
                            No account? <a href="/signup">Sign up here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}