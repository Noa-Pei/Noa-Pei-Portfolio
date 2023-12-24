import {useParams, Link} from "react-router-dom";
import {useContext} from "react";
import {BlogContext} from "../Providers/Blog-Provider";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import beachIMG from '../bat-galim.jpg';
import boatIMG from '../old-boat.jpeg';
import parisIMG from "../paris-love.jpg";
import eightiesIMG from "../eighties.jpg";
import nightIMG from "../nightdue.jpg"
import morningIMG from "../morningDue.jpg"
import parkIMG from "../dog-park.jpg"

export function Post(){
  const {id} = useParams();
  const {posts, removePost} = useContext(BlogContext);
  const {user} = useContext(AuthentiContext);
  const post = posts.find(element => element.id === id);
  const imgGallery = [parisIMG, eightiesIMG, beachIMG, boatIMG, nightIMG, morningIMG, parkIMG];
  const randomImage = imgGallery[Math.floor(Math.random() * imgGallery.length)];


  return (
      <div className='py-5 text-center container'>
      {post ? (
          <div>

            {/* in this case the user ==== admin, only admin can manage posts, the benifit of haveing the buttons on this page
            as well as in the post card is to give the admin more flexibility. if s/he don't excatly remember the full post
            by the card they can read the full post and decide if to change it without first returning to the post card. */}
            {user && (
            <button className="btn btn-outline-danger" onClick={() => removePost(post.id)}>Delete</button>)}
            {user && (
            <Link to={ `/admin/${post.id}` }
                  className='btn btn-outline-warning postCard-buttons'>
              Edit
            </Link>)}

            <h1>{post.title}</h1>
            <h3 className="textDesign">{post.description}</h3>
            <p className="textDesign">{post.createdAt}</p>
            <img className="postCard-image" src={randomImage} alt="random" />
            <p className="textDesign single-post-body">{post.body}</p>
          </div>
        ) : (
          <div className="spinner-border"
                style={{width: '3rem', height: '3rem',}}
                role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
      )}
    </div>
  )
};

