import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Students from './Students';
import Faculty from './Faculty';
import Detail from './Detail';

export default function NetworkMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Students/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/faculty" element={<Faculty/>}/>
    </Routes>
  </div>
  )
}
