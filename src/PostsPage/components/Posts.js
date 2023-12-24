import { PostList } from "./PostList";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {BlogContext} from "../../Providers/Blog-Provider";

export function PostsPage(){
    const {posts} = useContext(BlogContext);
    const [query, setQuery] = useState('');
    const [feed, setFeed] = useState([]);

    // updating the query state in order to trigger the useEffect that filters the posts.
    // matching the user's search input with the filtering effect, enabling the user to filter the posts,
    // by calling postFilter to filter the posts based on the new query (user's input),
    // without it, the useEffect would only run on initial render and the feed would never update according to the user's input.
    const handleUserInput = (evt) => {
        setQuery(evt.target.value);
    };

    const postFilter= () => {
        const lowerQuery = query.toLowerCase();
        return posts.filter(post => post.title.toLowerCase().includes(lowerQuery) || post.description.toLowerCase().includes(lowerQuery));
    };

    useEffect(() => {
        setFeed(postFilter())
    }, [query]);

    // setting feed state to current posts, when posts update, or when user deletes their filter input.
    useEffect(() => {
        setFeed(posts);
    }, [posts]);


    return (
        <div className="py-5 text-center container">
            <div>  
                <h1>Daily Digest</h1>
                <h2 className="textDesign">My awesome posts, Enjoy!</h2>
            </div>
            <p className="textDesign">Posts: {posts.length}</p>
            <input className="postFilter" onInput={handleUserInput}/>
            <PostList feed={feed}/>
            <button className="btn btn-info my-2">Load More</button>
        </div>
    );
};






