import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Home} from './components/Home';
import {PostsPage} from './components/PostsPage/Posts';
import {Post} from './components/SinglePost';
import {NewPostForm} from './components/Admin';
import {PersonalAccountPage} from './components/Account'
import {SignUpPage} from './components/signup';
import {BlogProvider} from "./Providers/Blog-Provider";
import {AuthenticProvider} from "./Providers/Authentic-Provider";
import '../src/styles/portfolio.css';

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
        path: '/admin',
        element: <NewPostForm />
      },
      {
        path: "/admin/:id",
        element: <NewPostForm />,
      },
      {
        path: '/account',
        element: <PersonalAccountPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
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
