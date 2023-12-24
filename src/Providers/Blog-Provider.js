import {createContext, useState} from "react";

export const BlogContext = createContext(null);

export function BlogProvider({children}) {
  const [posts, setPosts] = useState([]);


  const addPost = (post) => {
      setPosts([...posts, post]);
  };

  const removePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post  
      )
    );

  };

  const value = { posts, addPost, removePost, updatePost };

  return (
      <BlogContext.Provider value={value}>
        {children}
      </BlogContext.Provider>
  )
};




