import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import twinkleIMG from "../twinkle-lights.jpg"

export function Header(){
  const {user, signIn, signOut} = useContext(AuthentiContext);
  const backgroundImage = {
    backgroundImage: `url(${twinkleIMG})`, 
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat",
  };

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={backgroundImage}>
        <div className="container">
          <img src={twinkleIMG} alt="Twinkle-Lights" className="navIMG"/>
          <a className="navbar-brand textDesign" href="#">Noa Pei ~ Portfolio</a>
          <a className="navbar-brand textDesign" href="#">{
            user ? `Hello: ${user.userName}` : <button className="btn btn-outline-warning" onClick={signIn}>Sign-In</button>
          }</a>
          <ul className='nav nav-underline'>
            <li className='nav-item'>
              <Link to="/" className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to="/posts" className='nav-link'>Posts</Link>
            </li>
            <li className='nav-item'>
              <Link to="/contact" className='nav-link'>Contact</Link>
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