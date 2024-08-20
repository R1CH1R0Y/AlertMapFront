import axios from 'axios';
import React, { useState } from 'react';
import NavBarSecond from './NavBarSecond';

const AddGeoFencing = () => {
  const [input, setInput] = useState({
    userId: sessionStorage.getItem("userId"),
    latitude: "",
    longitude: "",
    radius: "",
    type: "",
    notified: ""
  });

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    const dataToSend = {
      ...input,
      latitude: parseFloat(input.latitude),
      longitude: parseFloat(input.longitude),
      radius: parseFloat(input.radius),
    };

    axios.post("http://localhost:3030/addgeofence", dataToSend, {
      headers: {
        "token": sessionStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    }).then(
      (response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          alert("Posted Successfully!!");
        } else {
          alert("Something went wrong!!!");
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
        <NavBarSecond/>
      <br />
      <br />
      <div className="card text-center mb-3">
        <div className="card-body">
          <h5 className="card-title">Add New GeoFence</h5>
          <div className="container">
            <div className="row">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="row g-3">
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="latitude" className="form-label">Latitude:</label>
                    <input
                      type="text"
                      name="latitude"
                      value={input.latitude}
                      className="form-control"
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="longitude" className="form-label">Longitude:</label>
                    <input
                      type="text"
                      name="longitude"
                      value={input.longitude}
                      className="form-control"
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="radius" className="form-label">Radius:</label>
                    <input
                      type="text"
                      name="radius"
                      value={input.radius}
                      className="form-control"
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <label htmlFor="type" className="form-label">Type:</label>
                    <input
                      type="text"
                      name="type"
                      value={input.type}
                      className="form-control"
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <button className="btn btn-success" onClick={readValue}>Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGeoFencing;