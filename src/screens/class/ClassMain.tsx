import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Class_2024_1 from './Class_2024_1';
import Detail from './Detail';
import Post from './Post';


export default function ClassMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Class_2024_1/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/post" element={<Post/>}/>
    </Routes>
  </div>
  )
}
