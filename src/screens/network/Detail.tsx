import React, { useEffect, useRef, useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import MainURL from '../../MainURL';
import './Detail.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function Detail() {

  let navigate = useNavigate();
  const location = useLocation();

  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userYearStage = sessionStorage.getItem('userYearStage');

  const checkLoginData = 
  ( userName === null || userName === undefined 
  || userId === null || userId === undefined 
  || userYearStage === null || userYearStage === undefined) 
    

  interface ProfileProps {
    userId: string;
    userName: string;
    userPhone: string;
    userYearStage : string;
    userCoName: string;
    userCoSort : string;
    userCoAddress: string;
    userCoAddressRest: string;
    userCoPhone: string;
    userCoEmail : string;
    userCoHomePage: string;
    userCoNotice: string;
    userCoImage : string;
  }

  const [userProfile, setUserProfile] = useState<ProfileProps>(location.state);

  // 네이버 지도 구현하기
  const mapElement = useRef<HTMLDivElement | null>(null);
  const { naver } = window;
  const addressAPI = async (addressQuery:any) => {
    window.naver.maps.Service.geocode({
      query: (checkLoginData ? '서울특별시 중구 세종대로 110' : addressQuery)
    }, function(status, response) {
      const longitude = parseFloat(response.v2.addresses[0].y);
      const latitude = parseFloat(response.v2.addresses[0].x);
      if (!mapElement.current || !naver) return;
      const location = new naver.maps.LatLng(longitude, latitude);
      const mapOptions = {
        center: location,
        zoom: 14,
        zoomControl: true,
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map,
      });
    })
  };


  useEffect(() => {
		addressAPI(location.state.userCoAddress);
	}, []);  

  

  return (
    <div className='detail'>
      <div className="inner">
        <div className="subpage__main__content">
          <div className="main__content">

            <div className="textrow">
              <h3>이름</h3>
              <p>{userProfile?.userName}</p>
            </div>
            <div className="textrow">
              <h3>개인연락처</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다." : userProfile?.userPhone}</p>
            </div>
            <div className="textrow">
              <h3>기수</h3>
              <p>{userProfile?.userYearStage}</p>
            </div>

            <div className='divider'></div>

            <div className="toparea">
              <div className="titlecover">
                <div className="imagebox">
                {
                  checkLoginData ? "회원만 볼 수 있습니다" :
                  <>
                    {
                      userProfile?.userCoImage === null || userProfile?.userCoImage === undefined || userProfile?.userCoImage === ''
                      ? <p style={{fontSize:'14px'}}>등록된 사진이 없습니다.</p>
                      : <img src={`${MainURL}/images/usercoimage/${userProfile?.userCoImage}`} />
                    }
                  </>
                }
                </div>
                <div className="titlebox">
                  <h3>{userProfile?.userCoName}</h3>
                  <p>대표: {userProfile?.userName} ({userProfile?.userYearStage})</p>
                </div>
              </div>
              <div className="sortcover">
                <p>{userProfile?.userCoSort}</p>
              </div>
            </div>

            <div className="middlearea">
              <div className="textbox">
                <FaPhoneAlt size={16}/>
                {checkLoginData
                ? <p>회원만 볼 수 있습니다</p>
                : <>
                  <p>{userProfile?.userCoPhone}</p>
                  <a href={`tel:${userProfile?.userCoPhone}`}>
                    <p className='handleBtn'>전화걸기</p>
                  </a>
                </>} 
              </div>
              <div className="textbox">
                <IoMail size={16}/>
                {checkLoginData 
                ? <p>회원만 볼 수 있습니다</p>
                : <p>{userProfile?.userCoEmail}</p>}
              </div>
              <div className="textbox">
                <RiComputerFill size={16}/>
                {checkLoginData 
                ? <p>회원만 볼 수 있습니다</p>
                : <p>{userProfile?.userCoHomePage}</p>}
              </div>
            </div>

            <div className="textrow">
              <h3>업체명</h3>
              <p>{userProfile?.userCoName}</p>
            </div>
            <div className="textrow">
              <h3>업태/종목</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다" : userProfile?.userCoSort}</p>
            </div>
            <div className="textrow">
              <h3>업체주소</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다" : `${userProfile?.userCoAddress} ${userProfile?.userCoAddressRest}`}</p>
            </div>
            <div className="textrow">
              <h3>업체연락처</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다" :userProfile?.userCoPhone}</p>
            </div>
            <div className="textrow">
              <h3>업체이메일</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다" :userProfile?.userCoEmail}</p>
            </div>
            <div className="textrow">
              <h3>업체홈페이지</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다" :userProfile?.userCoHomePage}</p>
            </div>
            <div className="textrow">
              <h3>업체소개</h3>
              <p>{checkLoginData ? "회원만 볼 수 있습니다" :userProfile?.userCoNotice}</p>
            </div>

            <div className="bottomarea">
              <div className="addressbar">
                <p>{checkLoginData ? "회원만 볼 수 있습니다" : userProfile?.userCoAddress}</p>
              </div>
              <div ref={mapElement} style={{ minHeight: '300px'}} />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
