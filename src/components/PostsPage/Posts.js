import { PostList } from "./PostList";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {BlogContext} from "../../Providers/Blog-Provider";

export function PostsPage(){
    const {posts, setQuery, setToPost, toPost} = useContext(BlogContext);
    const [feed, setFeed] = useState([]);

    // reseting the desplayed posts to unfiltered when navigating back to page
    useEffect(() => {
        setQuery("");
    }, []);

    const handleUserFilterInput = (evt) => {
        setToPost(3);
        setQuery(evt.target.value);
    };

    const handleLoadMore = () => {
        if (toPost > posts.length) {
            alert("No more posts to display"); 
        }
        setToPost(toPost + 3);
    }

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
            <input className="postFilter" onInput={handleUserFilterInput} placeholder="🔍"/>
            <PostList feed={feed}/>
            <button className="btn btn-info my-2" onClick={handleLoadMore}>Load More</button>
        </div>
    );
};






