import {Link} from "react-router-dom";
import {useContext} from "react";
import {useForm} from "react-hook-form";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import {useNavigate} from "react-router-dom";
import googleButton from "../google_btn/web_dark_rd_ctn@1x.png"
import twinkleIMG from "../images/twinkle-lights.jpg"

export function Header(){
  const {user, signIn, signInGoogle, signOut, setEmail} = useContext(AuthentiContext);
  const backgroundImage = {
    backgroundImage: `url(${twinkleIMG})`, 
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat",
  };
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const signUp = () => {
    navigate('/signUp')
  }


    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={backgroundImage}>
        <div className="container">
          <img src={twinkleIMG} alt="Twinkle-Lights" className="navIMG"/>
          <p className="navbar-brand textDesign">Noa Pei ~ Portfolio</p>
          <p className="navbar-brand textDesign">{
            user ? `Hello: ${user.first_name}` : 
            (<form className="signInForm" method="post" onSubmit={handleSubmit(signIn)}>
            <input className="postFilter" id="email" type="email" onInput={(evt) => setEmail(evt.target.value)}{...register('email', {required:true})} placeholder="📧" />
            <button className="btn btn-outline-warning" type="submit" >Sign-In</button>
            </form>)
          }</p>
          <p className="navbar-brand textDesign">{
            user ? null: <button className="btn btn-outline-warning" onClick={signUp}>Sign-Up</button>
          }</p>
          <a className="navbar-brand textDesign" href="#">{
            user ? null : <button className="btn btn-outline-warning" onClick={signInGoogle}>
              <img src={googleButton} alt="Google sign-in" />
            </button>
          }</a>
          <ul className='nav nav-underline'>
            <li className='nav-item'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/posts" className='nav-link'>Posts</Link>
            </li>
            <li className='nav-item'>
              <a href="#footer" className='nav-link'>Subscribe</a>
            </li>
            {user && (
              <li className='nav-item'>
                <Link  to="/admin" className='nav-link'>Admin</Link>
              </li>
            )}
            {user && (
              <li className='nav-item'>
                <Link  to="/account" className='nav-link'>Account</Link>
              </li>
            )}
            {user && ( 
              <li>
                <button className="btn btn-outline-warning" onClick={signOut}>Sign-Out</button>
              </li>
            )}
           </ul>
         </div>
        </nav>
        </>
    )
};