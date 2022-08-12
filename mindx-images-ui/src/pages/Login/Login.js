import React from "react";
import axios from "axios";
import { useForm, useWatch, useFormState } from 'react-hook-form';
import "./Login.css";
import { Link, useNavigate, NavLink } from 'react-router-dom';

function SubmitButtonWithListenError({ isDirty, isValid, touchedFields }) {
  const touched = Object.keys(touchedFields).length > 0;
  const disabled = !isValid || !touched

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block" disabled={disabled}>
      Đăng nhập
    </button>
  )
}
export default function Login() {
  const {
    register,
    formState: { errors, isDirty, isValid, touchedFields },
    control,
    handleSubmit } = useForm(
      {
        defaultValues: {
          username: '',
          password: '',
        },
        mode: 'onChange'
      },
    );
  const navigate = useNavigate();


  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const res = await axios({
        url: 'http://localhost:8080/api/auth/login',
        method: 'post',
        data: {
          username,
          password
        }
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login container-fluid" style={{ background: "#fafafa" }}>
      <div className="vh-100 justify-content-md-center align-items-center row">
        <div className="col-md-4 col-12">
          <div className="card-wrapper p-4">
            <form className=""
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <h4 className="mb-4">MindX Images</h4>
              <div className="mb-4">
                <div className="form-group">
                  <input
                    placeholder="Enter your email..."
                    className="form-control"
                    autoComplete="off"
                    {...register('username', { required: true })}
                  />
                  {errors?.username?.type === 'required' && <p>Username không được để trống</p>}
                </div>
                <div className="form-group">
                  <input
                    placeholder="Enter your password..."
                    type="password"
                    className="form-control"
                    autoComplete="off"
                    {...register('password', { required: true, minLength: 6 })}
                  />
                  {errors?.password?.type === 'required' && <p>Password không được để trống</p>}
                  {errors?.password?.type === 'minLength' && <p>Password phải lớn hơn 6 kí tự</p>}
                </div>

              </div>
              <SubmitButtonWithListenError isDirty={isDirty} isValid={isValid} touchedFields={touchedFields} />
            </form>
          </div>
          <div className="card-wrapper mt-4 p-3">
            <div>
              Test <NavLink to="/login">Login here</NavLink>
            </div>
            <div>
              No account? <Link to="/signup">Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}