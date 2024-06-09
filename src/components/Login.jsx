import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({ email: "", phone: "" });
  const [data, setData] = useState([]);
  let redirect = useNavigate;
  let login = false;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = (e) => {
    data.map((d) => {
      if (values.email === d.email && values.phone === d.phone) {
        login = true;
        localStorage.setItem("Name", d.name);
      }
    });
    if (login === true) {
      localStorage.setItem("Email", values.email);
      localStorage.setItem("Phone", values.phone);
      redirect("/");
    } else {
      alert("Oops! Wrong credential");
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center">Login User</h1>
        <form>
          <div className="mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone :</label>
            <input
              type="number"
              placeholder="Enter Phone"
              className="form-control"
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
              required
            />
          </div>
          <div className="text-end mb-2">
            <Link to={"/create"}>New user registration</Link>
          </div>
          <div className="text-center">
            <button className="btn btn-success" onClick={handleLogin}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
