import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
 import EditIcon from "@mui/icons-material/Edit";
import { config } from "../../../App";
import OrderInfo from "./ProductModal"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductAdmin = (props) => {
  const [carData, setCarData] = useState([]);
  const [show, setShow] = useState(false);
  const [serviceForm, setServiceForm] = useState({});
  const navigate = useNavigate();
    const checkLoggedIn=()=>{
        const username = window.localStorage.getItem("username")
        if(username)
        {

        }
        else
        {
            navigate('/login')
        }
    }
    checkLoggedIn()

  const handleClick = (row) => {
    let x = row;

    setShow(true);
    setServiceForm(x);
  };
 
  useEffect(() => {
   
    const fetchData = async () => {
      let username = window.localStorage.getItem("username");
      if (username) {
       
        const url = `${config.endpoint}/products/getProductsBySeller?sellerId=${username}`;
        
         let res = await axios.get(url)
        console.log(res)
        //console.log("Hi from Admin", res);
        setCarData(res.data);
      }
    };
    fetchData();
  }, []);

  const columns = [
    
    {
      name: "Item Name",
      selector: (row) => row.label,
      id: "name",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      id: "make",
      sortable: true,
    },
    
    {
      name: "Cost",
      id: "licensePlate",
      selector: (row) => `$${row.cost}`,
      sortable: true,
    },
    
    // {
    //     name: "Edit Cost",
    //     id: "action",
    //     selector: (row) => (
    //       <EditIcon
    //         style={{ justifyContent: "center" }}
    //         onClick={() => {
    //           handleClick(row);
    //         }}
    //       />
    //     ),
    //   },
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
      <OrderInfo 
          serviceForm={serviceForm}
          show = {show}
          setShow={setShow}
          carData={carData}
          setCarData={setCarData}
          className="modal"
        />
    </>
  );
};
export default ProductAdmin;
