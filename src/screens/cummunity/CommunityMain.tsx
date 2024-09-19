import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import FreeBoard from './FreeBoard';
import Post from './Post';
import Detail from './Detail';
import StudentsCompany from './StudentsCompany';
import StudentsCompanyDetail from './StudentsCompanyDetail';
import StudentsCompanyPost from './StudentsCompanyPost';


export default function CommunityMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<FreeBoard/>}/>
      <Route path="/post" element={<Post/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/studentscompany" element={<StudentsCompany/>}/>
      <Route path="/studentscompanypost" element={<StudentsCompanyPost/>}/>
      <Route path="/studentscompanydetail" element={<StudentsCompanyDetail/>}/>
    </Routes>
  </div>
  )
}
