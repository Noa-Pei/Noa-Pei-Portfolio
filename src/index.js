import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Home} from './HomePage/Home';
import {PostsPage} from './PostsPage/components/Posts';
import {Post} from './SinglePostPage/SinglePost';
import {NewPostForm} from './Admin/Admin';
import {ContactPage} from './Contact/Contact';
import {BlogProvider} from "./Providers/Blog-Provider";
import {AuthenticProvider} from "./Providers/Authentic-Provider";
import './portfolio.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <PostsPage />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/admin',
        element: <NewPostForm />
      },
      {
        path: "/admin/:id",
        element: <NewPostForm />,
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticProvider>
        <BlogProvider>
           <RouterProvider router={router} />
        </BlogProvider>
    </AuthenticProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
