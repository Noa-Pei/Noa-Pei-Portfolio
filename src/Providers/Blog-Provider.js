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
    const newPost = post

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

  const removePost = (id) => {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Post deleted successfully");
      fetchPosts();
    })
  }

  const editPost = (post) => {
    setSelectedPost(post)
  }

  const updatePost = (editingPost, data) => {
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

  const value = { posts, addPost, removePost, updatePost, toPost, setToPost, fromPost, setFromPost,
    setQuery, editPost, selectedPost, setSelectedPost };

  return (
      <BlogContext.Provider value={value}>
        {children}
      </BlogContext.Provider>
  )
};




