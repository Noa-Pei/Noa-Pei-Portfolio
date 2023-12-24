import {Link} from "react-router-dom";
import {useContext} from "react";
import {BlogContext} from "../../Providers/Blog-Provider";
import {AuthentiContext} from "../../Providers/Authentic-Provider";


export function PostCard({singlePost}){
  const {removePost} = useContext(BlogContext);
  const {user} = useContext(AuthentiContext);

    return (
        <div className='card mb-4 postCard-design'>
        <div className='card-header card-head-2'>
          {singlePost.title}

          {/* in this case user === admin, only admin can manage the posts (add, remove or edit). */}
          {user && (
          <button className="destroy" onClick={() => removePost(singlePost.id)} />
          )}
        </div>

        <div className='card-body postCard-description'>
          {singlePost.description}
        </div>
        
        <Link to={ `/posts/${singlePost.id}` }
              className='btn btn-outline-info postCard-buttons'>
          Read more
        </Link>
        
        {/* in this case user === admin, only admin can manage the posts (add, remove or edit). */}
        {/* the edit button sends the post with all the information back to the admin page for edit. */}
        {user && (
        <Link to={ `/admin/${singlePost.id}` }
              className='btn btn-outline-warning postCard-buttons'>
          Edit
        </Link>
        )}
        </div>
    );
};
