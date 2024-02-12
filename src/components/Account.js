import {useContext} from "react";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import {useNavigate} from "react-router-dom";

export function PersonalAccountPage() {
  const {user, removeUser} = useContext(AuthentiContext);
  const navigate = useNavigate();

    // in this case user === admin, only admin can manage their own info.
    if(!user) {
    return <p className="textDesign">You must sign in first!</p>
    };
  
  return (
    <div className="py-5 text-center container">
      <h1>My Info</h1>
      <h3 className="textDesign">First Name: {user.first_name}</h3>
      <h3 className="textDesign">Last Name: {user.surname}</h3>
      <h3 className="textDesign">Email {user.email}</h3>
      <button className="btn btn-outline-danger" onClick={() => {removeUser(user.u_id); navigate('/')}}>Delete my account 🚮</button>
    </div>
  );
};