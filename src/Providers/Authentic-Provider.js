import {createContext, useState, useEffect} from "react";

export const AuthentiContext = createContext(null);

export function AuthenticProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    const newUser = {
      "first_name" : user.first_name,
      "surname": user.surname,
      "email": user.email
    };

    fetch('/users', {
      method: "POST",
      body : JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(() => {
      alert("User added successfully");
    })
    setUser(user)
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      setUsers(await response.json());
    } catch {
      alert("there was an error while fetching posts from the server");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []); 

  const signIn = ({ userName, password }) => {
    setUser({ userName: 'Noa Pei' })
  };  

  // sign in with google
  const navigate = (nav) => {
    console.log(nav)
    window.location.href = nav;
    console.log(window.json);
  }

  const signInGoogle = async ()=> {
    const response = await fetch('http://127.0.0.1:3005/request', {method: 'post'});

    const data = await response.json();
    console.log(data)
    navigate(data.url)
  }


  const signOut = () => {
    setUser(null);
  };

  const value = {
    user, users, signIn, signInGoogle, signOut, addUser, fetchUsers
  };

  return (
      <AuthentiContext.Provider value={value}>
        {children}
      </AuthentiContext.Provider>
  )
};
