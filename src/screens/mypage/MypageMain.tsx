import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import ProfileFaculty from './ProfileFaculty';



export default function MypageMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Profile/>}/>
      <Route path="/faculty" element={<ProfileFaculty/>}/>
      
    </Routes>
  </div>
  )
}
