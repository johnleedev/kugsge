import React, { useCallback, useEffect, useState } from 'react';
import './Community.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { CiCircleMinus } from "react-icons/ci";
import { format } from "date-fns";

export default function StudentsCompanyPost () {

  let navigate = useNavigate();

  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userYearStage = sessionStorage.getItem('userYearStage');
  const stOrFa = sessionStorage.getItem('stOrFa');

  interface ContentProps {
    subTitle : string;
    subContent : string;
  }
  const [companyName, setCompanyName] = useState('');
  const [content, setContent] = useState<ContentProps[]>([
    {subTitle:"대표님의 회사는 어떤 회사인가요?", subContent:""},
    {subTitle:"회사를 운영하면서 가장 기억에 남는 에피소드가 있다면?", subContent:""},
    {subTitle:"지금까지 회사를 운영해온 대표님의 철학이나 노하우?", subContent:""},
    {subTitle:"최근 가장 기억에 남는 프로젝트?", subContent:""},
    {subTitle:"대표님의 직무에 있어서 가장 필요한 역량이 있다면?", subContent:""},
    {subTitle:"대표님이 몸담고 있는 업계의 앞으로의 흐름?", subContent:""},
    {subTitle:"최종적인 목표와 앞으로의 계획?", subContent:""},
    {subTitle:"현재 그리고 미래의 창업대학원 원우들에게 한마디?", subContent:""}
  ]);
  const [link, setLink] = useState('');
  interface ImageNoticeProps {
    imageName: string; 
    title: string;
  }
  const [inputImages, setInputImages] = useState<ImageNoticeProps[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd-HH-mm-ss');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          return resizingBlob;
        })
      );
      
      const regexCopy = /[^a-zA-Z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>]/g;

      const fileCopies = resizedFiles.map((resizedFile, index) => {
        const regex = resizedFile.name.replace(regexCopy, '');
        return new File([resizedFile], `${date}_${userId}_${regex}`, {
          type: acceptedFiles[index].type,
        });
      });
      setImageFiles(fileCopies);
      const imageNames = acceptedFiles.map((file, index) => {
        const regex = file.name.replace(regexCopy, '');
        return `${date}_${userId}_${regex}`;
      });
      const updatedImageNames = imageNames.map((imageName) => ({
        imageName, title: 'main'
      }));
      setInputImages(updatedImageNames);
      setImageLoading(false);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop }); 
 
  // 첨부 이미지 삭제 ----------------------------------------------
  const deleteInputImage = async (Idx:number) => {
    const copy =  [...imageFiles]
    const newItems = copy.filter((item, i) => i !== Idx);
    setImageFiles(newItems);
  };

  // 사진 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    const formData = new FormData();

    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });
  
    const getParams = {
      sort : 'scpost',
      userId : userId,
      userName : userName,
      userYearStage : userYearStage,
      stOrFa : stOrFa,
      companyName: companyName,
      content: JSON.stringify(content),
      link: link,
      postImage : JSON.stringify(inputImages)
    }

    axios 
      .post(`${MainURL}/community/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          navigate('/community');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  const postOptions = [
    { value: 'main', label: 'main' },
    { value: 'company', label: 'company' },
    { value: 'item', label: 'item' },
  ]

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
              style={{marginRight:'10px'}}
              onClick={()=>{navigate('/community');}}
            >
              <p>목록</p>
            </div>
          </div>
          
          <div className="subpage__main__content">
            
            <div className="warningBox">
              <p>장난스러운 글이나, 불건전하거나, 불법적인 내용 작성시, 경고 없이 곧바로 글은 삭제됩니다. 또한 사용자 계정은 서비스 사용에 제한이 있을 수 있습니다.</p>
            </div>

            <div className="userBox">
              <FaPen color='#334968' />
              {stOrFa === 'student' 
              ? <p>{userName} {userYearStage}</p>
              : <p>{userName} 교수</p>
              }
              
            </div>
            <div className="addPostBox">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>업체명</p>
                <h5 style={{fontSize:'12px'}}>* 최대 100자</h5>
              </div>
              <input value={companyName} className="inputdefault" type="text" 
                maxLength={100}
                onChange={(e) => {setCompanyName(e.target.value)}}/>
              {
                content.map((item:any, index:any)=>{
                  return (
                    <div key={index}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                        <p>{item.subTitle}</p>
                        <h5 style={{fontSize:'12px'}}>* 최대 300자</h5>
                      </div>
                      <textarea 
                        className="textarea textareapost2"
                        value={item.subContent}
                        maxLength={300}
                        onChange={(e)=>{
                          const copy = [...content];
                          copy[index].subContent = e.target.value;
                          setContent(copy);
                        }}
                      />
                    </div>
                  )
                })
              }
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>홈페이지or제품링크</p>
                <h5 style={{fontSize:'12px'}}>* 최대 200자</h5>
              </div>
              <input value={link} className="inputdefault" type="text" 
                maxLength={200}
                onChange={(e) => {setLink(e.target.value)}}/>
              <p>사진 첨부</p>
            </div>

            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div {...getRootProps()} className="imageDropzoneStyle" >
                  <input {...getInputProps()} />
                  {
                    imageFiles.length > 0 
                    ? <div className='imageplus'>+ 다시첨부하기</div>
                    : <div className='imageplus'>+ 사진첨부하기</div>
                  }
                </div>
              </div>
            }
            {
              imageFiles.length > 0 &&
              imageFiles.map((item:any, index:any)=>{
                return (
                  <div key={index} className='imagebox'>
                    <img 
                      src={URL.createObjectURL(item)}
                    />
                    <p>{item.name}</p>
                    <div onClick={()=>{deleteInputImage(index);}}>
                      <CiCircleMinus color='#FF0000' size={20}/>
                    </div>
                    <select 
                      value={item.title} 
                      onChange={(e)=>{
                        const copy = [...inputImages];
                        copy[index].title = e.target.value;
                        setInputImages(copy);
                      }}
                      className="dropdownBox"
                    >
                      {postOptions.map((option:any, index:any) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              })
            }
            </div>

            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

            <div className="buttonbox">
              <div className="button"
              onClick={registerPost}
              >
                <p>작성 완료</p>
              </div>
            </div>

           </div>

           

          
        </div>
      </div>

      <Footer />
    </div>
  )
}



