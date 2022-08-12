import "bootstrap/dist/css/bootstrap.min.css";
// import ListPost from './pages/ListPost/ListPost';
// import Login from './pages/Login/Login';
// import SignUp from './pages/SignUp/SignUp';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import React, { Suspense, lazy } from 'react';

import DetailPost from './pages/DetailPost/DetailPost';
const Login = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const ListPost = lazy(() => import('./pages/ListPost/ListPost'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="" element={<ListPost />} />
          <Route path="posts/:postId" element={<DetailPost />} />
          {/* <Route path="posts/create" element={<CreatePost />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<div>404 Page</div>} />
        </Routes>

      </Router>

    </Suspense>

  )
}

export default App;