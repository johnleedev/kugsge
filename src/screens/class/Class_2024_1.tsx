import React, { useEffect, useState } from 'react';
import './Class.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';

export default function Class_2024_1() {

  let navigate = useNavigate();

  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userYearStage = sessionStorage.getItem('userYearStage');

  const checkLoginData = 
  ( userName === null || userName === undefined 
  || userId === null || userId === undefined 
  || userYearStage === null || userYearStage === undefined) 

  interface ListProps {
    className: string;
    professor : string;
    location : string;
    time : string;
    curriculum: string;
    report : string;
    images : [string];
  }

  const [classes, setClasses] = useState<ListProps[]>([])
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/class/getlists/20241`)
    if (res) {
      const copy: ListProps[] = res.data;
      copy.reverse();
      setClasses(copy);
    }
  }; 

  useEffect(() => {
		fetchPosts();
	}, []);  
  
  return (
    <div className='class'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">수업리뷰</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/class');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              2024년 1학기
            </div>
            {/* <div 
              onClick={()=>{navigate('/network/faculty');}}
              className="subpage__menu__item"
            >
              교수진
            </div> */}
          </div>
        </div>

        <div className="subpage__main">

          <div className="subpage__main__title">
            <h3>2024년 1학기</h3>
          </div>

          <div className="subpage__main__content">
            <div className="main__content">
            <div className="class__wrap--item">
              {
                classes.map((item:any, index:any) => {
                  return (
                    <div key={index} className="class__item"
                      onClick={()=>{
                        checkLoginData
                        ? alert('권한이 없습니다. 로그인이 필요합니다.')
                        : navigate("/class/detail", {state : item });
                      }}
                    >
                      <div className="class__info">
                        <p className='class__info__name'>{item.className}</p>
                        <p>{item.professor} 교수</p>
                        <p>{item.location}</p>
                        <p>{item.time}</p>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}
