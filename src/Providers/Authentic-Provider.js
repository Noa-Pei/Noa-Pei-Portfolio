import {createContext, useState, useEffect} from "react";

export const AuthentiContext = createContext(null);

export function AuthenticProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState(null);

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
      alert("There was an error while fetching users from the server");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []); 

  const signIn = async ({email}) => {
    try {
      const response = await fetch(`/users/${email}`);
      setUser(await response.json());
    } catch {
      alert("No user with a matching email found");
    }
  }; 
  
  const signOut = () => {
    setUser(null);
  };


  // sign in with google
  const navigate = (nav) => {
    window.location.href = nav;
  }

  const signInGoogle = async ()=> {
    const response = await fetch('http://127.0.0.1:3005/request', {method: 'post'});
    const data = await response.json();
    navigate(data.url)
  }


  const removeUser = (id) => {
    fetch(`/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("User account deleted successfully");
      setUser(null);
    })
  }

  const value = {
    user, users, email, setEmail, signIn, signInGoogle, signOut, addUser, fetchUsers, removeUser
  };

  return (
      <AuthentiContext.Provider value={value}>
        {children}
      </AuthentiContext.Provider>
  )
};
