import React, { useState } from "react";
import axios from "axios";
import './Login.scss'
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import MainURL from "../../MainURL";
import { format } from "date-fns";

export default function Login(props:any) {
  
  let navigate = useNavigate();

  const [logisterId, setLogisterId] = useState('');
  const [logisterPasswd, setLogisterPasswd] = useState('');
  const [studentOrFaculty, setStudentOrFaculty] = useState('');

  // 접속시 접속수 증가시키기
  const loginUseCount = () => {
    const currentDate = new Date();
		const date = format(currentDate, 'yyyy-MM-dd');
    axios
      .post(`${MainURL}/login/loginusecount`, {
        date : date
      })
      .then((res) => {return})
      .catch((error) => {
        console.log(error);
      });
  }
     
  const handleLogin = async () => {
    await axios
     .post(`${MainURL}/login/login`, {
       userId : logisterId,
       passwd : logisterPasswd,
     })
     .then((res)=>{
      if (res.data.success) {
        loginUseCount();
        sessionStorage.setItem('userName', res.data.name);
        sessionStorage.setItem('userId', res.data.userId);
        sessionStorage.setItem('userYearStage', res.data.userYearStage);
        sessionStorage.setItem('stOrFa', res.data.stOrFa);
        alert('로그인 되었습니다.');
        navigate('/');
        window.scrollTo(0, 0);
        window.location.reload();
       } else {
        if (res.data.which === 'id') {
          alert('없는 아이디입니다.');  
        }
        if (res.data.which === 'passwd') {
          alert('비밀번호가 정확하지 않습니다.');
        }
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };

   const handleLoginfaculty = async () => {
    await axios
     .post(`${MainURL}/login/loginfaculty`, {
       userId : logisterId,
       passwd : logisterPasswd,
     })
     .then((res)=>{
      if (res.data.success) {
        loginUseCount();
        sessionStorage.setItem('userName', res.data.name);
        sessionStorage.setItem('userId', res.data.userId);
        sessionStorage.setItem('userYearStage', res.data.userYearStage);
        sessionStorage.setItem('stOrFa', res.data.stOrFa);
        alert('로그인 되었습니다.');
        navigate('/');
        window.scrollTo(0, 0);
        window.location.reload();
       } else {
        if (res.data.which === 'id') {
          alert('없는 아이디입니다.');  
        }
        if (res.data.which === 'passwd') {
          alert('비밀번호가 정확하지 않습니다.');
        }
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   }; 

  return (
    <div className="login">
      <div className="inner">

        <div className="container">
          <div className="noticebox">
            <p>로그인을 하시면 더 많은 서비스를 이용하실 수 있습니다.</p>
          </div>

          <div className="inputbox">
            <p>구분</p>
            <div className="checkInputCover">
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={studentOrFaculty === 'student'}
                  onChange={()=>{setStudentOrFaculty('student')}}
                />
                <h5>학생</h5>
              </div>
              <div className='checkInput' style={{marginLeft:'10px'}}>
                <input className="input" type="checkbox"
                  checked={studentOrFaculty === 'faculty'}
                  onChange={()=>{setStudentOrFaculty('faculty')}}
                />
                <h5>교수진</h5>
              </div>
            </div>
          </div>

          <div className="inputbox">
            <p>아이디</p>
            <input value={logisterId} className={logisterId === '' ? "inputdefault" : "inputdefault select" } type="text" 
              onChange={(e) => {setLogisterId(e.target.value)}}/>
          </div>
          <div className="inputbox">
            <p>비밀번호</p>
            <input value={logisterPasswd} className={logisterPasswd === '' ? "inputdefault" : "inputdefault select" } type="password" 
              onChange={(e) => {setLogisterPasswd(e.target.value)}}/>
          </div>

          <div className="buttonbox">
            <div className="button"
             onClick={()=>{
              if (studentOrFaculty === '') {
                alert('구분을 선택해주세요')
              } else {
                studentOrFaculty === 'student'
                ? handleLogin()
                : handleLoginfaculty()
              }
             }}
            >
              <p>로그인</p>
            </div>
          </div>

          {/* <div className="bottombox">
            <div className="cover">
              <p>비밀번호 찾기</p>
            </div>
          </div>
           */}
        </div>
        

      </div>

      <Footer/>
    </div>
  );
}
