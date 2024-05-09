import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route extact path='BlogWithUs/' element={<Login/>}/>
        <Route  path='BlogWithUs/home' element={<Home/>}/>
        <Route  path='BlogWithUs/create' element={<CreatePost/>}/>
        <Route  path='BlogWithUs/Posts' element={<Posts/>}/>
        <Route exact path="BlogWithUs/post/:id" element={<PostDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;