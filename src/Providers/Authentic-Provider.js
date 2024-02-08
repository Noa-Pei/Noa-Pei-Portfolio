import {createContext, useState} from "react";

export const AuthentiContext = createContext(null);

export function AuthenticProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = ({ userName, password }) => {
    setUser({ userName: 'Noa Pei' })
  };

  // const navigate = (nav) => {
  //   window.location.href = nav;
  // }

  // const signIn = async ()=> {
  //   const response = await fetch('http://127.0.0.1:3005/request', {method: 'post'});
  //   const data = await response.json();
  //   navigate(data.url)

  //   // const backendResponse = await fetch('http://127.0.0.1:3005/oauth');
  //   // console.log(backendResponse)
  //   // if(backendResponse.status === 201) {
  //   //    // 4. Redirect home on success
  //   //    navigate('/admin'); 
  //   // }
  // }
  

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user, signIn, signOut
  };

  return (
      <AuthentiContext.Provider value={value}>
        {children}
      </AuthentiContext.Provider>
  )
};