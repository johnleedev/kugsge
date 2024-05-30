import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile';



export default function MypageMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Profile/>}/>
      
      
    </Routes>
  </div>
  )
}
