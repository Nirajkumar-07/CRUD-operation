import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const [values, setValues] = useState({ name: "", email: "", phone: "" });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://host-api-3o6d.onrender.com/users/` + id)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let redirect = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://host-api-3o6d.onrender.com/users/` + id, values)
      .then((res) => {
        redirect("/");
      })
      .catch((err) => console.log(err));
  };

  if (!localStorage.getItem("Email")) return <Login />;
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update user</h1>
        <form>
          <div className="mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone :</label>
            <input
              type="text"
              placeholder="Enter Phone"
              className="form-control"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-success" onClick={handleSubmit}>
            Update
          </button>
          <Link to={"/"} className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
