import React from "react";
import { Link } from "react-router-dom";
import Users from "./Users";

function Admin() {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}

export default Admin;
