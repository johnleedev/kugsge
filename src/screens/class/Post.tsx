import React, { useCallback, useEffect, useState } from 'react';
import './Class.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { CiCircleMinus } from "react-icons/ci";
import { format } from "date-fns";

export default function Post () {

  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state;

  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userYearStage = sessionStorage.getItem('userYearStage');
  const stOrFa = sessionStorage.getItem('stOrFa');

  const [curriculum, setCurriculum] = useState([
    {weekend: 1, content : ''},
    {weekend: 2, content : ''},
    {weekend: 3, content : ''},
    {weekend: 4, content : ''},
    {weekend: 5, content : ''},
    {weekend: 6, content : ''},
    {weekend: 7, content : ''},
    {weekend: 8, content : ''},
    {weekend: 9, content : ''},
    {weekend: 10, content : ''},
    {weekend: 11, content : ''},
    {weekend: 12, content : ''},
    {weekend: 13, content : ''},
    {weekend: 14, content : ''},
    {weekend: 15, content : ''}
  ]);
  const [report, setReport] = useState([
    {no: 1, content : ''},
  ]);

  const [inputImages, setInputImages] = useState<string[]>(['']);
  const [imageFiles, setImageFiles] = useState<File[]>([]);


  const fetchReportDatas = async () => {
    const res = await axios.get(`${MainURL}/class/getlistinfo/${propsData.classwhen}/${propsData.id}`)
    if (res) {
      const copy = res.data[0];
      const curriculumCopy = JSON.parse(copy.curriculum);
      setCurriculum(curriculumCopy);
      const reportCopy = JSON.parse(copy.report);
      setReport(reportCopy);
    }
  }
  useEffect(()=>{
    fetchReportDatas();
  }, []);

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
        return `"${date}_${userId}_${regex}"`;
      });
      setInputImages(imageNames);
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
  const registerReportPost = async () => {
    const formData = new FormData();

    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });
  
    const getParams = {
      classwhen : propsData.classwhen,
      userName : userName,
      curriculum : JSON.stringify(curriculum),
      report : JSON.stringify(report),
      postImage : inputImages
    }

    axios 
      .post(`${MainURL}/class/post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          navigate('/class');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 커리큘럼 입력 함수 
  const handleInputCurriculum = async (text:string, index:number) => {
    const copy = [...curriculum];
    copy[index].content = text;
    setCurriculum(copy);
  };


  // 과제 입력 함수 
  const handleInputReport = async (text:string, index:number) => {
    const copy = [...report];
    copy[index].content = text;
    setReport(copy);
  };
  
  // 과제 입력란 추가 함수
  const handleInputAddReportRow = async () => {
    const copy = [...report, {no: report.length+1, content : ''},];
    setReport(copy);
  };

  // 과제 입력란 삭제 함수
  const handleInputDeleteReportRow = async (no:number) => {
    const copy = [...report];
    const result = copy.filter((e:any)=> e.no !== no);
    setReport(result);
  };

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
            <div className='postBtnbox'
              style={{marginRight:'10px'}}
              onClick={()=>{navigate('/class');}}
            >
              <p>목록</p>
            </div>
          </div>
          
          <div className="subpage__main__content">
            
            <div className="warningBox">
              <p>해당 페이지는 수업 담당 교수만 입력할 수 있습니다.</p>
            </div>

            <div className="userBox">
              <FaPen color='#334968' />
              {stOrFa === 'student' 
              ? <p>{userName} {userYearStage}</p>
              : <p>{userName} 교수</p>
              }
              
            </div>
            
            <div className="addPostBox">
              <div className='addpost--subTitle'>
                <p>학기 수업내용</p>
                <h5 style={{fontSize:'12px'}}>* 최대 200자씩</h5>
              </div>
              {
                curriculum.map((item:any, index:any)=>{
                  return (
                    <div className="inputRow" key={index}>
                      <h4>{item.weekend}주차</h4>
                      <input value={item.content} className="inputdefault" type="text" 
                        maxLength={200}
                        onChange={(e) => {handleInputCurriculum(e.target.value, index)}}/>
                    </div>
                  )
                })
              }
              <div className='addpost--subTitle'>
                <p>학기중 과제</p>
                <h5 style={{fontSize:'12px'}}>* 최대 200자씩</h5>
              </div>
              {
                report.map((item:any, index:any)=>{
                  return (
                    <div className="inputRow" key={index}>
                      <h4>{item.no}번째</h4>
                      <input value={item.content} className="inputdefault" type="text" 
                        maxLength={200}
                        onChange={(e) => {handleInputReport(e.target.value, index)}}/>
                      
                      <div onClick={()=>{handleInputDeleteReportRow(item.no);}}>
                        <CiCircleMinus color='#FF0000' size={20}/>
                      </div>
                    </div>
                  )
                })
              }
              <div className='addRowBtnBox'>
                <div className='addRowBtn'
                  onClick={handleInputAddReportRow}
                >
                  <h4>입력란 추가</h4>
                </div>
              </div>
              
             </div>

            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'30px 0'}}></div>

            <div className="buttonbox">
              <div className="button"
              onClick={registerReportPost}
              >
                <p>작성 완료</p>
              </div>
            </div>

            <div style={{height:'100px'}}></div>

           </div>

           

          
        </div>
      </div>

      <Footer />
    </div>
  )
}



