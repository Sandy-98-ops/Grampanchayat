import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    

    setValidated(true);
  };

  return (
    <div className="container-1">
      <div className="login">
        <h1>Login</h1>
        <form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" name="login" placeholder="Username or Email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" required />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" name="remember_me" />
            <label className="form-check-label">Remember me on this computer</label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="login-help">
          <p><a href="#">Forgot your password? Click here to reset it.</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login
