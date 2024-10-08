import React, { useEffect, useState } from 'react';
import './Community.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FreeBoard() {

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
  
  // let [list, setList] = useState<ListProps[]>([]);
  // const fetchDatas = async () => {
  //   const res = await axios.get(`${MainURL}/community/getposts/posts`);
  //   if (res.data) {
  //     const copy = res.data;
  //     copy.reverse();
  //     console.log(copy);
  //     setList(copy);
  //   }
  // }

  // useEffect(()=>{
  //   fetchDatas();
  // }, []);

  const list = [
    {
        "id": 1,
        "userId": "johnleedev",
        "userName": "이요한",
        "userYearStage": "21기",
        "stOrFa": "student",
        "title": "계명대 글로벌창업대학원 커뮤니티에 오신 여러분을 환영합니다.",
        "content": "\"계명대 글로벌창업대학원 커뮤니티\"는 \n계명대 글로벌창업대학원에 재학중인 분들과 졸업생들이 서로 소통하고 교류하기 위한 공간으로 만들었습니다.\n\n사이트를 만든지 얼마되지 않아, 사용하시다가 오타나 불편한 점이 발생할 수도 있습니다.\n그때마다 얼마든지 아래 연락처로 문의하시면, 곧바로 해결해드리도록 하겠습니다.\n혹시 사용하시는 방법을 모르실때도, 얼마든지 문의해주시기 바랍니다.\n\n아무쪼록 이 공간이 많은 학우분들께 큰 도움이 되었으면 좋겠습니다.",
        "date": "2024-04-30",
        "views": "127",
        "isliked": "7",
        "images": "[]"
    }
  ]

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
    navigate('/community/detail', {state : post});
    // axios.post(`${MainURL}/community/postaddviews/${post.id}`)
    //   .then(()=>{
    //     navigate('/community/detail', {state : post});
    //   }).catch((error)=>{
    //     console.error(error);
    //   })
  };

  // 글쓰기 함수
  const openPostPage = async () => {
    const userNameCopy = sessionStorage.getItem('userName');
    const userIdCopy = sessionStorage.getItem('userId');
      if (userNameCopy === null || userNameCopy === undefined 
        || userIdCopy === null || userIdCopy === undefined) {
        alert('권한이 없습니다. 로그인이 필요합니다.')
      } else {
        navigate('/community/post');  
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
              className="subpage__menu__item subpage__menu__item--on"
            >
              자유게시판
            </div>
            {/* <div
              onClick={()=>{navigate('/community/studentscompany');}}
              className="subpage__menu__item"
            >
              동문기업소개
            </div> */}
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>자유게시판</h3>
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
                  <li className="th_title">제목</li>
                  <li className="th_name">글쓴이</li>
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
                        <li className="td_title">{renderPreview(item.title)}</li>
                        <li className="td_name">{item.userName}</li>
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



