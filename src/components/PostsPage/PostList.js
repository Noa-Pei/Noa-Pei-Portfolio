import { PostCard } from "./PostCard";

export function PostList({feed}){

    return (
        <div className="postList">
            {feed.map((post) => <PostCard singlePost={post}/>)}
        </div>
    )
};