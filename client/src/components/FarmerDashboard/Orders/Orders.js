import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import {downloadBill} from "../../Utils/downloadBill"
import { config } from "../../../App";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import "./order.css";
const Orders = (props) => {
  const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);
  const [serviceForm, setServiceForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let username = window.localStorage.getItem("username");
      console.log("username", username);
      if (username) {
        const url = `${config.endpoint}/orders?username=` + username;

        let res = await axios.get(url);
        console.log(res);
        //console.log("Hi from Admin", res);
        setCarData(res.data);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: "Date",
      id: "date",
      selector: (row) => row.order_date,
      sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.label,
      id: "make",
      sortable: true,
    },

    {
      name: "Quantity",
      id: "licensePlate",
      selector: (row) => row.quantity,
      sortable: true,
    },

    {
      name: "Cost",
      id: "cost",
      selector: (row) => row.price,
    }
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={carData}
        pagination
        striped={true}
        className="table d-flex align-items-center"
        //fixedHeader
        fixedHeaderScrollHeight="450px"
        subHeader
      />
    </>
  );
};
export default Orders;
