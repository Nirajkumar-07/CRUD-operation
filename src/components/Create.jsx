import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  let redirect = useNavigate();

  useEffect(() => {
    axios
      .get(`https://host-api-3o6d.onrender.com/users`)
      .then((res) => {
        const ids = res.data.length;
        setValues({ ...values, id: `${ids + 1}` });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://host-api-3o6d.onrender.com/users", values)
      .then((res) => {
        redirect("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a user</h1>
        <form>
          <div className="mb-2">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>
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
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit
          </button>
          <Link to={"/"} className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
