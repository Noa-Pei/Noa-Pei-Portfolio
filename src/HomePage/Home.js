import {Link} from "react-router-dom";
import beachIMG from '../bat-galim.jpg';
import boatIMG from '../old-boat.jpeg';
import hookerIMG from '../happy-hooker.jpeg';
import parisIMG from "../paris-love.jpg";
import eightiesIMG from "../eighties.jpg";
import nightIMG from "../nightdue.jpg"
import morningIMG from "../morningDue.jpg"
import parkIMG from "../dog-park.jpg"
import twinkleIMG from "../twinkle-lights.jpg"

export function Home() {
  const imgGallery = [parisIMG, eightiesIMG, beachIMG, boatIMG, hookerIMG, nightIMG, morningIMG, parkIMG, twinkleIMG];

  return (
      <section className="py-5 text-center container">
        <div>
          <h1>Welcome!</h1>
          <div className="image-gallery">
            <div className="gallery">
              {/* "map" iterates over the array containing images, "src" defines the path to the image, 
              "key" gives each image a unique identifier to help React manage the image gallery. */}
              {imgGallery.map(image => (
                <img src={image} key={image} />
              ))}
            </div>
          </div>
          <h2 className="textDesign">
            Blah Blah Blah
          </h2>
        </div>
          <p>
            <Link to="/posts" className="btn btn-info my-2">Go to posts</Link>
          </p>
      </section>
  );
};

