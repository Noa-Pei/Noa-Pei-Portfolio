import {useContext} from "react";
import {useForm} from "react-hook-form";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import {useNavigate} from "react-router-dom";

export function SignUpPage() {
  const {addUser, users} = useContext(AuthentiContext);
  const { register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const handleNewUser = (data) => {
    const userExists = users.some(user => user.email === data.email);
    if (userExists) {
        alert('User with this email already exists. Please sign in, or sign up with different email.')
    }else{
      addUser({
        first_name: data.first_name,
        surname: data.surname,
        email: data.email,
      })
      navigate('/');
    }
  }
  
  return (
    <div className="py-5 text-center container">
      <h1>Sign-Up</h1>
      <h3 className="textDesign">Want to become a member?</h3>
      <form className="adminForm" method="post" onSubmit={handleSubmit(handleNewUser)}>

        <label htmlFor="first_name" className="textDesign">First Name</label>
        <input id="first_name" type="text" {...register('first_name', {required:true})} />

        <label htmlFor="surname" className="textDesign">Surname</label>
        <input id="surname" type="text" {...register('surname', {required:true})} />

        <label htmlFor="email" className="textDesign">Email</label>
        <input id="email" type="email" {...register('email', {required:true})} />

        <button className="btn btn-info my-2" type="submit">Sign me up!</button>

      </form>
    </div>
  );
};