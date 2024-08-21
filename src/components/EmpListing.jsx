import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
  const [empData, empDataChange] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadDetail = (id) => {
    navigate("/employee/details/" + id);
  };
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
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const loadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  // useEffect(() => {
  //   fetch("http://localhost:8000/")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((resp) => {
  //       empDataChange(resp);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });
  useEffect(() => {
    const fetchEmployes = async () => {
      try {
        const res = await fetch("http://localhost:8000/employee");
        const data = await res.json();
        empDataChange(data);
      } catch (error) {
        console.log("there was an error getting data");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployes();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div>
            <Link to="/employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td className="bg-dark text-white">ID</td>
                <td className="bg-dark text-white">Name</td>
                <td className="bg-dark text-white">Email</td>
                <td className="bg-dark text-white">Phone</td>
                <td className="bg-dark text-white">Action</td>
              </tr>
            </thead>
            <tbody>
              {empData &&
                empData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <a
                        onClick={() => {
                          loadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          removeFunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a
                        onClick={() => {
                          loadDetail(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
