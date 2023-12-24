import {createContext, useState} from "react";

export const AuthentiContext = createContext(null);

export function AuthenticProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = ({ userName, password }) => {
    setUser({ userName: 'Noa Pei' })
  };

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