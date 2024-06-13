import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import WebSiteInfo from './WebSiteInfo';




export default function BusinessInfoMain () {
  return (
    <div>
    <Routes>
      <Route path="/" element={<WebSiteInfo/>}/>

      
    </Routes>
  </div>
  )
}
