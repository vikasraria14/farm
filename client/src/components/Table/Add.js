import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { config } from "../../App";
import axios from "axios";

const Add = ({ data, setdata, setIsAdding, columns, endpoint, title }) => {
  let x = {};
  columns.map((column) => (x[column.field] = ""));
  const [empData, setEmpData] = useState(x);
  const [categories, setCategories] = useState([]);
  console.log("end", empData);
  useEffect(() => {
    const fun = async () => {
      const res = await axios.get(`${config.endpoint}/admin/list`);
      setCategories(res.data);
      setEmpData({ ...empData, categories: res?.data[0] });
    };
    fun();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Your code for sending the API request
      let complainent = localStorage.getItem("username");
      let finalData = { ...empData, complainent: complainent };
      let res = await axios.post(`${config.endpoint}/${endpoint}`, finalData);
      // Your code for updating the local state

      data.push(finalData);
      setdata(data);
      setIsAdding(false);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: ` data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle errors that occur during the API request
      console.error("Error during API request:", error);

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to add data. Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleEmp = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };
  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add {title}</h1>
        {columns.map((column, i) => {
          return (
            column.isEditable &&<div key={i}>
              <label htmlFor={column.field}>{column.label}</label>

              {column.type === "select" ? (
                <select
                  name={column.field}
                  id={column.field}
                  value={empData[column.field]}
                  onChange={(e) => handleEmp(e)}
                >
                  <option key={0}>Select Dealer</option>
                  {categories.map((option, index) => (
                    <option key={index + 1} value={option.username}>
                      {option.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={column.field}
                  type={column.type}
                  name={column.field}
                  value={empData[column.field]}
                  onChange={(e) => handleEmp(e)}
                />
              )}
            </div>
          );
        })}

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
