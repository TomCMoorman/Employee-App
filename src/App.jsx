import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import EmpListing from "./components/EmpListing";
import EmpCreate from "./components/EmpCreate";
import EmpEdit from "./components/EmpEdit";
import EmpDetails from "./components/EmpDetails";

function App() {
  const [count, setCount] = useState(0);
  //Add Employee
  const addEmployee = async (empdata) => {
    const res = await fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empdata),
    });
    navigate("/");
    return;
  };

  //Edit Existing Employee
  const editEmployee = async (empdata) => {
    const res = await fetch("http://localhost:8000/employee/" + empdata.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(empdata),
    });
    return;
  };

  //Delete Employee
  const deleteEmployee = async (empdata) => {
    const res = await fetch("http://localhost:8000/employee/" + empdata, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return;
  };
  // const deleteEmployee = async (empid) => {
  //   try {
  //     const res = await fetch("http://localhost:8000/employee/" + empid, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     navigate("/");
  //     alert("Employee Deleted");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<EmpListing deleteEmployee={deleteEmployee} />}
          />
          <Route
            path="/employee/create"
            element={<EmpCreate addEmployee={addEmployee} />}
          />
          <Route
            path="/employee/edit/:empid"
            element={<EmpEdit editEmployee={editEmployee} />}
          />
          <Route path="/employee/details/:empid" element={<EmpDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
