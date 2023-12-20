import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { config } from "../../../../App";
const Edit = ({
  data,
  selectedData,
  setdata,
  setIsEditing,
  columns,
  endpoint,
  title,
  selectedMonth,
  selectedYear,
}) => {
  const id = selectedData.id;
  let x = {};
  columns.map((column) => {
    return (x[column.field] = selectedData[column.field]);
  });
  const [empData, setEmpData] = useState(x);
  const [categories, setCategories] = useState([]);
  console.log("selected", empData);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // if (!firstName || !lastName || !email || !salary || !date) {
      //   return Swal.fire({
      //     icon: "error",
      //     title: "Error!",
      //     text: "All fields are required.",
      //     showConfirmButton: true,
      //   });
      // }
      // let finalData ={...empData}
      let complainent = localStorage.getItem("username");
      let finalData = { ...empData, complainent: complainent };
      console.log("final", finalData);
      const res = await axios.put(
        `${config.endpoint}/${endpoint}/${id}`,
        finalData
      );

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data.splice(i, 1, finalData);
          break;
        }
      }
      setdata(data);
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error during API request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update data. Please try again.",
        showConfirmButton: true,
      });
      // You might want to show an error message to the user or take other actions
    }
  };
  const handleEmp = (e) => {
    console.log("type select", e.target.type, e.target.value, e.target.name);
    const updatedValue = e.target.value;
    // e.target.type === 'select-one' ? e.target.value : e.target.value;
    setEmpData({ ...empData, [e.target.name]: updatedValue });
  };

  useEffect(() => {
    const fun = async () => {
      const res = await axios.get(`${config.endpoint}/admin/list`);
      setCategories(res.data);
    };
    fun();
  }, []);
  return (
    <div className="small-container">
      <form>
        <h1>Edit {title}</h1>
        {columns.map((column, i) => {
          return (
            column.isEditable && (
              <div key={i}>
                <label htmlFor={column.field}>{column.label}</label>
                {column.type === "select" ? (
                  <select
                    name={column.field}
                    id={column.field}
                    value={empData[column.field]} // Set the value attribute for the selected option
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
            )
          );
        })}

        <div style={{ marginTop: "30px" }}>
          <input
            type="submit"
            value="Update"
            onClick={(e) => handleUpdate(e)}
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
