import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpDetails = ({ deleteEmployee }) => {
  const { empid } = useParams();
  const [empdata, setEmpdata] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const res = await fetch("http://localhost:8000/employee/" + empid);
        const data = await res.json();
        setEmpdata(data);
      } catch (error) {
        console.log("there was an error getting data");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployes();
  }, []);

  const removeFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          alert("Removed Successfully.");
          navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div>
      {empdata && (
        <>
          <h1>
            The Employee name is: {empdata.name}, ID: {empdata.id}
          </h1>
          <h3>Contact Details</h3>
          <h5>Email:{empdata.email}</h5>
          <h5>Phone:{empdata.phone}</h5>
          <Link to="/" className="btn btn-primary">
            Back To All Listings
          </Link>
          <Link to={"/employee/edit/" + empdata.id} className="btn btn-success">
            Edit Listing
          </Link>
          <Link
            onClick={() => {
              removeFunction(empdata.id);
            }}
            className="btn btn-danger"
          >
            Delete Listing
          </Link>
        </>
      )}
    </div>
  );
};

export default EmpDetails;
