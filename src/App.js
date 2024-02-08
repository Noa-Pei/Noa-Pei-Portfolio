
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {Outlet} from "react-router-dom";
import prideIMG from "./pride-lights.jpg"


export function App() {
  const backgroundImage = {
    backgroundImage: `url(${prideIMG})`, 
    backgroundSize:"cover", 
    backgroundRepeat:"no-repeat",
    height: "100vh",
    width: "100%",
    // position: "fixed",
    overflow: "scroll"
  }

  return (
      <div style={backgroundImage}>
        <Header />
          <Outlet />
        <Footer />
      </div>
  );
};


















          // {/* <Home /> */}
          // {/* <PostsPage posts={posts}/>
          // <Post /> */}
          // {/* <About />
          // <Contact />  */}
          // {/* <NewPostForm onPostSubmit={addNewSubmit}/> */}


// import {PostsPage} from './PostsPage/components/Posts';
// import {Post} from './SinglePostPage/SinglePost';
// import {NewPostForm} from './Admin/Admin';
// import { useState } from 'react';
// import { NewPostForm } from './Admin/Admin';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;