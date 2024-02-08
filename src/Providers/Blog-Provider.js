import {createContext, useState, useEffect} from "react";


export const BlogContext = createContext(null);

export function BlogProvider({children}) {
  const [posts, setPosts] = useState([]);
  const [toPost, setToPost] = useState(3);
  const [fromPost, setFromPost] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null)

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/posts?from=${fromPost}&to=${toPost}&text=${query}`);
      setPosts(await response.json());
    } catch {
      alert("there was an error while fetching posts from the server");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [fromPost, toPost, query]); 

  const addPost = (post) => {
    const newPost = {
      "title" : post.title,
      "description": post.description,
      "body": post.body
    };

    fetch('/posts', {
      method: "POST",
      body : JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(() => {
      alert("Post created successfully");
      fetchPosts();
    })
  }
  // const addPost = (post) => {
  //     setPosts([...posts, post]);
  // };

  const removePost = (id) => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Post deleted successfully");
      fetchPosts();
    })
  }
  // const removePost = (postId) => {
  //   setPosts(posts.filter(post => post.id !== postId));
  // };

  const editPost = (post) => {
    setSelectedPost(post)
  }

  const updatePost = (editingPost, data) => {
    // console.log(updatedPost);
    // console.log(id);
    const updatedPost = {
      "title" : data.title,
      "description" : data.description,
      "body" : data.body,
    }
    fetch(`/posts/${editingPost.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(() => {
        fetchPosts();
    })
  }

  // const updatePost = (updatedPost) => {
  //   setPosts(posts.map(post => 
  //       post.id === updatedPost.id ? updatedPost : post  
  //     )
  //   );
  // };



  const value = { posts, addPost, removePost, updatePost, toPost, setToPost, fromPost, setFromPost,
    setQuery, editPost, selectedPost, setSelectedPost };

  return (
      <BlogContext.Provider value={value}>
        {children}
      </BlogContext.Provider>
  )
};




