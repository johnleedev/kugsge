import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import FreeBoard from './FreeBoard';
import Post from './Post';
import Detail from './Detail';


export default function CommunityMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<FreeBoard/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/detail" element={<Detail/>}/>
    </Routes>
  </div>
  )
}
