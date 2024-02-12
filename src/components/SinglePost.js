import {useParams, Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../Providers/Blog-Provider";
import {AuthentiContext} from "../Providers/Authentic-Provider";
import beachIMG from '../images/bat-galim.jpg';
import boatIMG from '../images/old-boat.jpeg';
import parisIMG from "../images/paris-love.jpg";
import eightiesIMG from "../images/eighties.jpg";
import nightIMG from "../images/nightdue.jpg"
import morningIMG from "../images/morningDue.jpg"
import parkIMG from "../images/dog-park.jpg"

export function Post(){
  const {id} = useParams();
  const [post, setPost] = useState();
  const {user} = useContext(AuthentiContext);
  const {removePost, editPost} = useContext(BlogContext);
  const imgGallery = [parisIMG, eightiesIMG, beachIMG, boatIMG, nightIMG, morningIMG, parkIMG];
  const randomImage = imgGallery[Math.floor(Math.random() * imgGallery.length)];

  
  useEffect(() => {
    fetch(`/posts/${id}`)
        .then(response => response.json())
        .then(json => setPost(json))
  }, []);

  const editPostHandler = () => {
    editPost(post);
  }

  const body = post?.body?.split("\n") || [];

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
            <Link to={ `/admin` } onClick={editPostHandler}
                  className='btn btn-outline-warning postCard-buttons'>
              Edit
            </Link>)}

            <h1>{post.title}</h1>
            <h3 className="textDesign">{post.description}</h3>
            <img className="postCard-image" src={randomImage} alt="random" />
            {/* <p className="textDesign single-post-body">{post.body}</p> */}
            {body.map((paragraph, i) => (<p className="textDesign single-post-body post" key={i}>{paragraph}</p>))}
          </div>
        ) : (
          <div className="spinner-border"
                style={{width: '7rem', height: '7rem', color: 'yellow'}}
                role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
      )}
    </div>
  )
};

