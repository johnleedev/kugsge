import React, { useEffect, useState } from 'react';
import './Community.scss';
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
  const images = JSON.parse(location.state.images);

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
  const [isLikedLength, setIsLikedLength] = useState(0);
  const [checkIsLiked, setCheckIsLiked] = useState<boolean>(false);
  const fetchCommentsDatas = async () => {
    const resComment = await axios.get(`${MainURL}/community/getcomments/${propsData.id}`)
    if (resComment.data) {
      const copy = resComment.data;
      setCommentsList(copy);
    }
    const resIsliked = await axios.get(`${MainURL}/community/getisliked/${propsData.id}`)
    if (resIsliked.data) {
      const copy = resIsliked.data;
      setIsLikedLength(copy.length);
      const isCheckLiked = copy.filter((e:any)=> e.userId === userId);
      if (isCheckLiked.length > 0 && isCheckLiked[0].isLiked === 'true') {
        setCheckIsLiked(true);
      }
    }
  }
  useEffect(()=>{
    fetchCommentsDatas();
  }, [refresh]);


  // 좋아요 싫어요 등록 함수 ----------------------------------------------
  const handleislikedtoggle = async () => {
    console.log('slkdjfl')
    axios 
      .post(`${MainURL}/community/islikedtoggle`, {
        postId : propsData.id,
        isLiked : checkIsLiked,
        userId : userId,
        userName : userName,
        userYearStage : userYearStage,
        date : date,
      })
      .then((res) => {
        if (res.data) {
          setRefresh(!refresh);
          if (checkIsLiked) {
            alert('해제되었습니다.');
            setCheckIsLiked(false);
          } else {
            alert('입력되었습니다.');
            setCheckIsLiked(true);
          }
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 댓글 등록 함수 ----------------------------------------------
  const [inputComments, setInputComments] = useState('');
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');
  const registerComment = async () => {
    axios 
      .post(`${MainURL}/community/commentsinput`, {
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
      .post(`${MainURL}/community/commentdelete`, {
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

  // 게시글 삭제 함수 ----------------------------------------------
  const deletePost = () => {
    axios
      .post(`${MainURL}/community/deletepost`, {
        postId : propsData.id,
        userId : userId,
        userName : userName,
        images :  images
      })
      .then((res) => {
        if (res.data === true) {
          alert('삭제되었습니다.');
          setRefresh(!refresh);
          navigate('/community');
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
    <div className='community'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">네트워크</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/community');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              자유게시판
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>자유게시판</h3>
            <div style={{display:'flex'}}>
              <div className='postBtnbox'
                style={{marginRight:'10px'}}
                onClick={()=>{navigate('/community');}}
              >
                <p>목록</p>
              </div>
              {
                (propsData.userId === userId && propsData.userName === userName ) &&
                <div className='postBtnbox'
                  style={{marginRight:'10px'}}
                  onClick={deletePost}
                  >
                  <p>삭제</p>
                </div>
              }
              <div className='postBtnbox'
                onClick={()=>{
                  if (checkLoginData) {
                    alert('권한이 없습니다. 로그인이 필요합니다.')
                  } else {
                    navigate('/community/post');  
                  }
                }}
              >
                <p>글쓰기</p>
              </div>
            </div>
          </div>
          
          <div className="subpage__main__content">
            
            <div className="top_box">
              <div className="left">
                <h1>{renderPreview(propsData.title)}</h1>
                {propsData.stOrFa === 'student' 
                ? <p>{propsData.userName} {propsData.userYearStage}</p>
                : <p>{propsData.userName} 교수</p>
                }
              </div>
              <div className="right">
                <div className='contentcover'>
                  <div className="box">
                    <MdOutlineAccessTime color='#325382'/>
                    <p>{DateFormmating(propsData.date)}</p>
                  </div>
                  <div className="box">
                    <MdOutlineRemoveRedEye color='#325382'/>
                    <p>{propsData.views}</p>
                  </div>
                  <div className="box">
                    <FaRegThumbsUp color='#325382' />
                    <p>{isLikedLength > 0 ? isLikedLength : 0}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="view_content">
              <div className='imagecover'>
              { images.length > 0 &&
                images.map((item:any, index:any)=>{
                  return (
                    <img src={`${MainURL}/images/postimage/${item}`} key={index}/>
                  )
                })
              }
              </div>
              <div className='textcover'>
                <p>{ checkLoginData 
                    ? "본 게시물은 회원만 읽을 수 있습니다. 이글을 보시려면 로그인하세요."
                    : propsData.content}</p>
              </div>

              <div className="btn-box">
                <div className="btn"
                  onClick={()=>{
                    if (checkLoginData) {
                      alert('권한이 없습니다. 로그인이 필요합니다.')
                    } else {
                      handleislikedtoggle();
                    }
                  }}
                  style={{border: checkIsLiked ? "2px solid #325382" : '1px solid #cbcbcb' }}
                >
                  <FaRegThumbsUp color='#325382' />
                  <p>좋아요</p>
                </div>
              </div>

            </div>

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
                <p>댓글 입력하기</p>
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
                <p>댓글 입력</p>
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
                <p>입력된 댓글이 없습니다.</p>
              </div>
            }
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  )
}



