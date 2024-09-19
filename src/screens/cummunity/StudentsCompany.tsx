import React, { useEffect, useState } from 'react';
import './Community.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

export default function StudentsCompany() {

  let navigate = useNavigate();

  interface ListProps {
    id : number;
    userName : string;
    userYearStage : string;
    stOrFa: string;
    title : string;
    content : string;
    date : string;
    views : string;
    images : [string]
  }
  
  let [list, setList] = useState<ListProps[]>([]);
  const fetchDatas = async () => {
    const res = await axios.get(`${MainURL}/community/getposts/studentscompany`);
    if (res.data) {
      const copy = res.data;
      copy.reverse();
      setList(copy);
    }
  }

  useEffect(()=>{
    fetchDatas();
  }, []);

  // State 변수 추가
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // 한 페이지당 표시될 게시글 수
  const totalPages = Math.ceil(list.length / itemsPerPage);

  // 리스트를 현재 페이지에 해당하는 부분만 필터링
  const displayedList = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
  };

  // 글자수 제한
  const renderPreview = (content : string) => {
    if (content?.length > 40) {
      return content.substring(0, 40) + '...';
    }
    return content;
  };

  // 조회수 증가시킨 후에, 디테일 페이지로 넘어가기 
  const openPostDetails = async (post: any) => {
    axios.post(`${MainURL}/community/postaddviews/${post.id}`)
      .then(()=>{
        navigate('/community/studentscompanydetail', {state : post});
      }).catch((error)=>{
        console.error(error);
      })
  };

  // 글쓰기 함수
  const openPostPage = async () => {
    const userNameCopy = sessionStorage.getItem('userName');
    const userIdCopy = sessionStorage.getItem('userId');
      if (userNameCopy === null || userNameCopy === undefined 
        || userIdCopy === null || userIdCopy === undefined) {
        alert('권한이 없습니다. 로그인이 필요합니다.')
      } else {
        navigate('/community/studentscompanypost');  
      }
  };
  

  return (
    <div className='community'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">커뮤니티</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/community');}}
              className="subpage__menu__item"
            >
              자유게시판
            </div>
            <div
              onClick={()=>{navigate('/community/studentscompany');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              동문기업소개
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>동문기업소개</h3>
            <div className='postBtnbox'
              onClick={openPostPage}
            >
              <p>글쓰기</p>
            </div>
          </div>
          
          <div className="subpage__main__content">
            <div className="tbl_wrap">
              <div className="tbl_head01">
                <ul className='titleRow'>
                  <li className="th_num">번호</li>
                  <li style={{width:'30%'}}>업체명</li>
                  <li className="th_name">동문이름</li>
                  <li className="th_date">기수</li>
                  <li className="th_date">등록일</li>
                  <li className="th_views">조회수</li>
                </ul>
                {
                  displayedList.map((item:any, index:any)=>{
                    return(
                      <ul className="textRow" key={index}
                        onClick={()=>{
                          openPostDetails(item);
                        }}
                      >
                        <li className="td_num">{item.id}</li>
                        <li style={{width:'30%'}}>{item.companyName}</li>
                        <li className="td_name">{item.userName}</li>
                        <li className="td_date">{item.userYearStage}</li>
                        <li className="td_date">{item.date}</li>
                        <li className="td_views">{item.views}</li>
                      </ul>
                    )
                  })
                }
              </div>
            </div>

            <div className='btn-row'>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <div
                  key={page}
                  onClick={() => changePage(page)}
                  className='btn'
                  style={{backgroundColor : currentPage === page ?  "#2c3d54" : "#EAEAEA"}}
                >
                  <p style={{color : currentPage === page ? "#fff" : "#333"}}>{page}</p>
                </div>
              ))}
            </div>
            
          </div>


          
        </div>
      </div>

      <Footer />
    </div>
  )
}



