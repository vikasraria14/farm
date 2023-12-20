import { useNavigate } from "react-router-dom";
import UserLogin from "./components/Auth/UserLogin";
import Complaints from "./components/FarmerDashboard/Complaints";
import ComplaintsAdmin from "./components/DealerDashboard/ComplaintsAdmin/ComplaintsAdmin"; 
const Landing = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  if (!userType) {
    navigate('/userLogin');
    return <UserLogin />
  } else if (userType === 'admin') {
    navigate('/complaintsAdmin');
    return <ComplaintsAdmin/>
  } else {
    navigate('/complaints');
    return <Complaints/>
  }

  // Note: You might want to return some JSX here, even if it's just an empty fragment
  
};

export default Landing;
