import React from 'react';
import './Notice.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Notice() {
  
  let navigate = useNavigate();


  return (
    <div className='notice'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">소개</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/notice');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              사이트소개
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">사이트소개</div>
          <div className="subpage__main__content">
            <p>계명대학교 글로벌창업대학원 재학생들이</p>
            <p>서로 교류하고 소통하는 공간입니다.</p>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}
