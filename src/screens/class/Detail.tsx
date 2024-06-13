import React, { useEffect, useState } from 'react';
import './Class.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye, MdOutlineAccessTime } from "react-icons/md";
import { FaRegThumbsDown,FaRegThumbsUp  } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { format } from "date-fns";
import DateFormmating from '../../components/DateFormmating';
import { CiCircleMinus } from "react-icons/ci";

export default function Detail() {

  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state;
  const curriculum = JSON.parse(location.state.curriculum);
  const report = JSON.parse(location.state.report);

  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userYearStage = sessionStorage.getItem('userYearStage');
  const stOrFa = sessionStorage.getItem('stOrFa');

  interface ListProps {
    id : number;
    post_id : number;
    content : string;
    userId : string;
    userName : string;
    date : string;
  }

  const [refresh, setRefresh] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<ListProps[]>([]);
  const [isCurriculumInput, setIsCurriculumInput] = useState<boolean>(true);
  const [isReportInput, setIsReportInput] = useState<boolean>(true);
  
  const fetchCommentsDatas = async () => {
    const resComment = await axios.get(`${MainURL}/class/getcomments/${propsData.id}`)
    if (resComment.data) {
      const copy = resComment.data;
      setCommentsList(copy);
    }
  }
  useEffect(()=>{
    fetchCommentsDatas();
    if (curriculum.every((item:any) => item.content === '')) {
      setIsCurriculumInput(false);
    }
    if (report.every((item:any) => item.content === '')) {
      setIsReportInput(false);
    }
  }, [refresh]);


  // 댓글 등록 함수 ----------------------------------------------
  const [inputComments, setInputComments] = useState('');
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');
  const registerComment = async () => {
    axios 
      .post(`${MainURL}/class/commentsinput`, {
        postId : propsData.id,
        comment : inputComments,
        date : date,
        userId : userId,
        userName : userName,
        userYearStage : userYearStage,
        stOrFa : stOrFa,
      })
      .then((res) => {
        if (res.data) {
          alert('입력되었습니다.');
          setInputComments('');
          setRefresh(!refresh);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 댓글 삭제 함수 ----------------------------------------------
  const deleteComment = (item:any) => {
    axios
      .post(`${MainURL}/class/commentdelete`, {
        commentId : item.id,
        postId : item.post_id
      })
      .then((res) => {
        if (res.data === true) {
          alert('삭제되었습니다.');
          setRefresh(!refresh);
        } 
      });
  };



  // 글자 제한 ----------------------------------------------
  const renderPreview = (content : string) => {
    if (content?.length > 40) {
      return content.substring(0, 40) + '...';
    }
    return content;
  };

  const checkLoginData = 
  ( userName === null || userName === undefined 
  || userId === null || userId === undefined 
  || userYearStage === null || userYearStage === undefined) 
    

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
            <h3>{propsData.className}</h3>
            <div style={{display:'flex'}}>
              <div className='postBtnbox'
                style={{marginRight:'10px'}}
                onClick={()=>{navigate('/class');}}
              >
                <p>목록</p>
              </div>
              {
                (propsData.professor === userName) &&
                <div className='postBtnbox'
                  style={{border: '1px solid #1DDB16'}}
                  onClick={()=>{
                    if (checkLoginData) {
                      alert('권한이 없습니다. 로그인이 필요합니다.')
                    } else {
                      navigate('/class/post', {state : propsData});  
                    }
                  }}
                >
                  <p>수업 내용 & 과제 입력하기</p>
                </div>
              }
            </div>
          </div>
          
          <div className="subpage__main__content">
            
            <div className="top_box">
              <div className='class__info__detail__row'>
                <h3>수업명</h3>
                <div className="class__info__detail__divider"></div>
                <p>{propsData.className}</p>
              </div>
              <div className='class__info__detail__row'>
                <h3>담당교수</h3>
                <div className="class__info__detail__divider"></div>
                <p>{propsData.professor} 교수</p>
              </div>
              <div className='class__info__detail__row'>
                <h3>장소</h3>
                <div className="class__info__detail__divider"></div>
                <p>{propsData.location}</p>
              </div>
              <div className='class__info__detail__row' style={{marginBottom:'1px'}}>
                <h3>시간</h3>
                <div className="class__info__detail__divider"></div>
                <p>{propsData.time}</p>
              </div>
            </div>

            <div className="addPostBox">
              <div className='addpost--subTitle'>
                <p>학기 수업내용</p>
              </div>
            </div>
            <div className="view_content">
              <div className='textcover'>
              { (isCurriculumInput && curriculum.length > 0) 
                ?
                curriculum.map((item:any, index:any)=>{
                  return (
                    <div className='text--Row' key={index}>
                      <h3>{item.weekend}주차</h3>
                      <div className="divider"></div>
                      <p>{ checkLoginData 
                          ? "본 게시물은 회원만 읽을 수 있습니다. 이글을 보시려면 로그인하세요."
                          : item.content}</p>
                    </div>
                  )
                })
                :
                <>
                  <p>아직 입력된 내용이 없습니다.</p>
                  <p>수업내용은 담당 교수만 입력할수 있습니다.</p>
                </>
              }
              </div>
            </div>

            <div className="addPostBox">
              <div className='addpost--subTitle'>
                <p>과제</p>
              </div>
            </div>
            <div className="view_content">
              <div className='textcover'>
              { (isReportInput && report.length > 0)
                ?
                report.map((item:any, index:any)=>{
                  return (
                    <div className='text--Row' key={index}>
                      <h3>과제 {item.no}</h3>
                      <div className="divider"></div>
                      <p>{ checkLoginData 
                          ? "본 게시물은 회원만 읽을 수 있습니다. 이글을 보시려면 로그인하세요."
                          : item.content}</p>
                    </div>
                  )
                })
                :
                <>
                  <p>아직 입력된 내용이 없습니다.</p>
                  <p>과제는 담당 교수만 입력할수 있습니다.</p>
                </>
              }
              </div>
            </div>

            <div style={{height:'100px'}}></div>
            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

            <div className="userBox">
              <FaPen color='#334968' />
              {stOrFa === 'student' 
              ? <p>{userName} {userYearStage}</p>
              : <p>{userName} 교수</p>
              }
            </div>

            <div className="addPostBox">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>{propsData.professor === userName ? '댓글' : '수업리뷰'} 입력하기</p>
                <h5 style={{fontSize:'12px'}}>* 최대 500자</h5>
              </div>
              <textarea 
                className="textarea textareacomment"
                value={inputComments}
                maxLength={500}
                onChange={(e)=>{setInputComments(e.target.value)}}
              />
            </div>

            <div className="buttonbox">
              <div className="button"
              onClick={()=>{
                if (checkLoginData) {
                  alert('권한이 없습니다. 로그인이 필요합니다.')
                } else {
                  registerComment();
                }
              }}
              >
                <p>{propsData.professor === userName ? '댓글' : '수업리뷰'} 입력</p>
              </div>
            </div>


            { commentsList.length > 0 
              ?
              commentsList.map((item:any, index:any)=>{
                return (
                  <div className="comments_box" key={index}>
                    <div className="topBox">
                      <div className="namebox">
                        <h3>{item.userName}</h3>
                        {
                          item.stOrFa === 'student' 
                          ? <h3>{item.userYearStage}</h3>
                          : <h3>교수</h3>
                        }
                        <p>{DateFormmating(item.date)}</p>
                      </div>
                      {
                        (item.userId === userId && item.userName === userName ) &&
                        <div onClick={()=>{deleteComment(item);}}>
                          <CiCircleMinus color='#FF0000' size={20}/>
                        </div>
                      }
                    </div>
                    <div className="textbox">
                      <p>{( userName === null || userName === undefined 
                          || userId === null || userId === undefined 
                          || userYearStage === null || userYearStage === undefined) 
                          ? "본 게시물은 회원만 읽을 수 있습니다. 이글을 보시려면 로그인하세요."
                          : item.content}</p>
                    </div>
                  </div>
                )
              })
              :
              <div className="comments_box">
                <p>입력된 수업리뷰 & 댓글이 없습니다.</p>
              </div>
            }
          </div>

          <div style={{height:'100px'}}></div>

        </div>
      </div>

      <Footer />
    </div>
  )
}



