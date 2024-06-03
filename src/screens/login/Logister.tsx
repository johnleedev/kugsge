import React, { useState } from "react";
import axios from "axios";
import './Login.scss'
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import MainURL from "../../MainURL";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import DaumPostcode from 'react-daum-postcode';
import { CiCircleMinus } from "react-icons/ci";

export default function Logister(props:any) {
  
  let navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(1);

  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [checkUsingPolicy, setCheckUsingPolicy] = useState<boolean>(false);
  const [checkPersonalInfo, setCheckPersonalInfo] = useState<boolean>(false);
  const [checkInfoToOthers, setCheckInfoToOthers] = useState<boolean>(false);
  const [checkGiftNotifi, setCheckGiftNotifi] = useState<boolean>(false);

  const handleCheckAll = async () => {
    if (checkAll === true) {
      setCheckAll(false);
      setCheckGiftNotifi(false);
      setCheckInfoToOthers(false);
      setCheckPersonalInfo(false);
      setCheckUsingPolicy(false);
    } else {
      setCheckAll(true);
      setCheckGiftNotifi(true);
      setCheckInfoToOthers(true);
      setCheckPersonalInfo(true);
      setCheckUsingPolicy(true);
    }
   };


  const [logisterId, setLogisterId] = useState('');
  const [logisterIdCheck, setLogisterIdCheck] = useState<boolean>(false);
  const [logisterPasswd, setLogisterPasswd] = useState('');
  const [logisterPasswdCheck, setLogisterPasswdCheck] = useState('');
  const [logisterName, setLogisterName] = useState('');
  const [logisterPhone, setLogisterPhone] = useState('');
  
  const [studentOrFaculty, setStudentOrFaculty] = useState('');
  const [facultySort, setFacultySort] = useState('');

  const [logisterYearStage, setLogisterYearStage] = useState('21기');
  const [logisterCoName, setLogisterCoName] = useState('');
  const [logisterCoSort, setLogisterCoSort] = useState('');
  const [logisterCoAddress, setLogisterCoAddress] = useState('');
  const [logisterCoAddressRest, setLogisterCoAddressRest] = useState('');
  const [logisterCoPhone, setLogisterCoPhone] = useState('');
  const [logisterCoEmail, setLogisterCoEmail] = useState('');
  const [logisterCoHomePage, setLogisterCoHomePage] = useState('');
  const [logisterCoNotice, setLogisterCoNotice] = useState('');

  const [facultyLocation, setFacultyLocation] = useState('');
  const [facultyPhone, setFacultyPhone] = useState('');
  const [facultyEmail, setFacultyEmail] = useState('');
  const [facultyField, setFacultyField] = useState('');
  const [facultyDegree, setFacultyDegree] = useState([""]);
  const [facultyCareer, setFacultyCareer] = useState([""]);
  const [facultyNotice, setFacultyNotice] = useState('');


  // 주소 입력 함수
  const [isViewAddressTab, setIsViewAddressTab] = useState<boolean>(false);
  const onCompletePost = (data:any) => {
    const copy = data.address;
    setLogisterCoAddress(copy);
  };

  // 아이디 중복 체크
  const handleCheckId = async (data:any) => {
    const res = await axios.get(`${MainURL}/login/logincheckid/${logisterId}`)
    if (res.data) { 
      alert('중복된 아이디가 있습니다.')
      setLogisterIdCheck(false);
    } else {
      alert('사용할수 있는 아이디입나다.')
      setLogisterIdCheck(true);
    }
  };

  const yearStageOptions = [
    { value: '1기', label: '1기' },
    { value: '2기', label: '2기' },
    { value: '3기', label: '3기' },
    { value: '4기', label: '4기' },
    { value: '5기', label: '5기' },
    { value: '6기', label: '6기' },
    { value: '7기', label: '7기' },
    { value: '8기', label: '8기' },
    { value: '9기', label: '9기' },
    { value: '10기', label: '10기' },
    { value: '11기', label: '11기' },
    { value: '12기', label: '12기' },
    { value: '13기', label: '13기' },
    { value: '14기', label: '14기' },
    { value: '15기', label: '15기' },
    { value: '16기', label: '16기' },
    { value: '17기', label: '17기' },
    { value: '18기', label: '18기' },
    { value: '19기', label: '19기' },
    { value: '20기', label: '20기' },
    { value: '21기', label: '21기' }
  ];

  const handleLogister = async () => {
    await axios
     .post(`${MainURL}/login/logister`, {
        checkUsingPolicy : checkUsingPolicy,
        checkPersonalInfo: checkPersonalInfo,
        checkInfoToOthers: checkInfoToOthers,
        checkGiftNotifi: checkGiftNotifi,
        userId : logisterId,
        passwd : logisterPasswd,
        name : logisterName,
        phone : logisterPhone,
        stOrFa : studentOrFaculty,
        yearStage : logisterYearStage,
        coName : logisterCoName,
        coSort : logisterCoSort,
        coAddress : logisterCoAddress,
        coAddressRest : logisterCoAddressRest,
        coPhone : logisterCoPhone,
        coEmail : logisterCoEmail,
        coHomePage : logisterCoHomePage,
        coNotice : logisterCoNotice,
     })
     .then((res)=>{
       if (res.data) {
         alert('가입이 완료되었습니다. 로그인 해주세요.');
         navigate('/login');
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };

   const handleLogisterFaculty = async () => {
    await axios
     .post(`${MainURL}/login/logisterfaculty`, {
        checkUsingPolicy : checkUsingPolicy,
        checkPersonalInfo: checkPersonalInfo,
        checkInfoToOthers: checkInfoToOthers,
        checkGiftNotifi: checkGiftNotifi,
        userId : logisterId,
        passwd : logisterPasswd,
        name : logisterName,
        phone : logisterPhone,
        stOrFa : studentOrFaculty,
        yearStage : logisterYearStage,
        coName : logisterCoName,
        coSort : logisterCoSort,
        coAddress : logisterCoAddress,
        coAddressRest : logisterCoAddressRest,
        coPhone : logisterCoPhone,
        coEmail : logisterCoEmail,
        coHomePage : logisterCoHomePage,
        coNotice : logisterCoNotice,
        faLocation: facultyLocation,
        faEmail: facultyEmail,
        faPhone: facultyPhone,
        faField: facultyField,
        faDegree: JSON.stringify(facultyDegree),
        faCareer: JSON.stringify(facultyCareer),
        faNotice : facultyNotice
     })
     .then((res)=>{
       if (res.data) {
         alert('가입이 완료되었습니다. 로그인 해주세요.');
         navigate('/login');
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };

   
  return (
    <div className="login">
      
      <div className="inner">

       {
          currentTab === 1
          ?
          <div className="container">
            <div className="title">
              <h1>회원가입</h1>
              <p>서비스 약관에 동의를 해주세요.</p>
            </div>

            <div className="stepnotice">
              <div className="currentbar">
                <p className="current">동의</p>
                <p style={{margin:'0 10px'}}><FaAngleDoubleRight /></p>
                <p>정보입력</p>
              </div>
              <div className="rowbar"></div>
            </div>

            <div className="agree_check">
              <ul className="agree_check_tit">
                <li>
                  <span className="checks check_all"
                    onClick={handleCheckAll}
                  >
                    <FaCircleCheck size={20} color={checkAll ? "#33383f" : "EAEAEA"}/>
                    <label htmlFor="reg_allcheck">모두 동의 합니다.</label>
                  </span>
                </li>
              </ul>
              <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

              <ul className="agree_check_tit">
                <li>
                  <span className="checks"
                    onClick={()=>{
                      setCheckUsingPolicy(!checkUsingPolicy);
                    }}
                  >
                    <FaCircleCheck size={20} color={checkUsingPolicy ? "#33383f" : "EAEAEA"}/>
                    <label htmlFor="reg_use">이용약관 동의 (필수)</label>
                  </span>
                  <a href="http://www.kugsge.com/usingpolicy.html" target="_blank" className="agree_link">이용약관 보기</a>
                </li>
                <li>
                  <span className="checks"
                    onClick={()=>{
                      setCheckPersonalInfo(!checkPersonalInfo);
                    }}
                  >
                    <FaCircleCheck  size={20} color={checkPersonalInfo ? "#33383f" : "EAEAEA"}/>
                    <label htmlFor="reg_personal">개인정보 수집/이용 동의 (필수)</label>
                  </span>
                  <a href="http://www.kugsge.com/personalinfo.html" target="_blank" className="agree_link">개인정보 수집/이용 보기</a>
                </li>
                <li>
                  <span className="checks"
                    onClick={()=>{
                      setCheckInfoToOthers(!checkInfoToOthers);
                    }}
                  >
                    <FaCircleCheck  size={20} color={checkInfoToOthers ? "#33383f" : "EAEAEA"}/>
                    <label htmlFor="reg_provision">제 3자 정보 제공 (필수)</label>
                  </span>
                </li>
                <li>
                  <span className="checks"
                    onClick={()=>{
                      setCheckGiftNotifi(!checkGiftNotifi);
                    }}
                  >
                    <FaCircleCheck  size={20} color={checkGiftNotifi ? "#33383f" : "EAEAEA"}/>
                    <label htmlFor="reg_benefit">혜택성 정보수신동의 <span className="txt_hide">(선택)</span></label>
                  </span>
                </li>
              </ul>
            </div>

            <div className="buttonbox">
              <div className="button"
                style={{backgroundColor: (checkInfoToOthers && checkPersonalInfo && checkUsingPolicy) ? '#33383f' : '#bfbfbf'}}
                onClick={()=>{
                  if (checkInfoToOthers && checkPersonalInfo && checkUsingPolicy) {
                    setCurrentTab(2);
                  } else {
                    alert('필수 항목을 모두 체크해주세요.')
                  }
                }}
              >
                <p>다음</p>
              </div>
            </div>
          </div>
          :
          <div className="container">
            
            <div className="title">
              <h1>회원가입</h1>
              <p>다음 정보를 입력해주세요.</p>
            </div>

            <div className="stepnotice">
              <div className="currentbar">
                <p>동의</p>
                <p style={{margin:'0 10px'}}><FaAngleDoubleRight /></p>
                <p className="current">정보입력</p>
              </div>
              <div className="rowbar"></div>
            </div>

            <h2>필수항목</h2>
            <div className="inputbox">
              <div className="inputbox-btncover">
                <p>아이디 <span>*</span></p>
                <>
                {
                  (logisterId !== '')
                  &&
                  <div style={{marginRight:'5px'}}>
                  {
                    logisterIdCheck
                    ? <FaCheck color='#1DDB16'/>
                    : <CiWarning color='#FF0000'/>
                  }
                  </div>
                }
                <div className="addBtn"
                  onClick={handleCheckId}
                >중복확인</div>
                </>
              </div>
              <input value={logisterId} className={logisterId === '' ? "inputdefault" : "inputdefault select" } type="text" 
                onChange={(e) => {
                  const value = e.target.value;
                  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);
                  if (isKorean) {
                    alert('한글은 입력할 수 없습니다.');
                    return;
                  }
                  setLogisterId(value);
                }} maxLength={45}
              />
            </div>
            <div className="inputbox">
              <p>비밀번호 <span>*</span></p>
              <input value={logisterPasswd} className={logisterPasswd === '' ? "inputdefault" : "inputdefault select" } type="password" 
                onChange={(e) => {setLogisterPasswd(e.target.value)}} maxLength={100}/> 
            </div>
            <div className="inputbox">
              <p style={{display:'flex', alignItems:'center'}}>
                <p>비밀번호확인</p>
                {
                  (logisterPasswd !== '' && logisterPasswdCheck !== '')
                  &&
                  <>
                  {
                    logisterPasswd === logisterPasswdCheck
                    ? <FaCheck color='#1DDB16'/>
                    : <CiWarning color='#FF0000'/>
                  }
                  </>
                }
              </p>
              <input value={logisterPasswdCheck} className={logisterPasswdCheck === '' ? "inputdefault" : "inputdefault select" } type="password" 
                onChange={(e) => {setLogisterPasswdCheck(e.target.value)}}/>
            </div>
            <div className="inputbox">
              <p>이름 <span>*</span></p>
              <input value={logisterName} className={logisterName === '' ? "inputdefault" : "inputdefault select" } type="text" 
                onChange={(e) => {setLogisterName(e.target.value)}}/>
            </div>
            <div className="inputbox">
              <p>연락처 <span>*</span></p>
              <input value={logisterPhone} className={logisterPhone === '' ? "inputdefault" : "inputdefault select" } type="text" 
                onChange={(e) => {setLogisterPhone(e.target.value)}}/>
            </div>

            <div className="inputbox">
              <p>구분 <span>*</span></p>
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

            {(studentOrFaculty === 'faculty' || studentOrFaculty === 'both') &&
            <div className="inputbox">
              <p>구분2 <span>*</span></p>
              <div className="checkInputCover">
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={facultySort === 'faculty'}
                    onChange={()=>{
                      setFacultySort('faculty');
                      setStudentOrFaculty('faculty');
                    }}
                  />
                  <h5>정교수</h5>
                </div>
                <div className='checkInput' style={{marginLeft:'10px'}}>
                  <input className="input" type="checkbox"
                    checked={facultySort === 'both'}
                    onChange={()=>{
                      setFacultySort('both');
                      setStudentOrFaculty('both');
                    }}
                  />
                  <h5>겸임교수</h5>
                </div>
              </div>
            </div>
            }

            {
              (studentOrFaculty === 'student' || facultySort === 'both') &&
              <div className="inputbox">
                <p>창업대학원 기수<span>*</span></p>
                <div className="dropdownBox-cover">
                  <select 
                    value={logisterYearStage} 
                    onChange={(e)=>{
                      setLogisterYearStage(e.target.value);
                    }}
                    className="dropdownBox"
                  >
                    {
                      yearStageOptions.map((option:any, index:any) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            }
            

            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

            {
              (studentOrFaculty === 'faculty' || studentOrFaculty === 'both' )&&
              <>
              <h2>연구소개(선택)</h2>  

              { studentOrFaculty === 'faculty' &&
              <>
              <div className="inputbox">
                <p>연구실위치</p>
                <input value={facultyLocation} className={facultyLocation === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setFacultyLocation(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <p>연구실번호</p>
                <input value={facultyPhone} className={facultyPhone === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setFacultyPhone(e.target.value)}}/>
              </div>
              </>
              }
              <div className="inputbox">
                <p>이메일</p>
                <input value={facultyEmail} className={facultyEmail === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setFacultyEmail(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <p>연구분야</p>
                <input value={facultyField} className={facultyField === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setFacultyField(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <div className="inputbox-btncover">
                  <p>학위</p>
                  <div className="addBtn"
                    onClick={()=>{
                      const copy = [...facultyDegree, ""];
                      setFacultyDegree(copy);
                    }}
                  >입력란추가</div>
                </div>
                {
                  facultyDegree.map((item:any, itemindex:any)=>{
                    return (
                      <div className="subRow">
                        <input value={item} className={item === '' ? "inputdefault" : "inputdefault select" } type="text" 
                          onChange={(e) => {
                            const copy = [...facultyDegree];
                            copy[itemindex] = e.target.value;
                            setFacultyDegree(copy)}
                          }/>
                          <div onClick={()=>{
                            const copy = [...facultyDegree];
                            const filter = copy.filter((_, index) => index !== itemindex);
                            setFacultyDegree(filter);
                          }}>
                            <CiCircleMinus color='#FF0000' size={20}/>
                          </div>  
                      </div>
                    )
                  })
                }
              </div>
              <div className="inputbox">
                <div className="inputbox-btncover">
                  <p>경력 및 활동</p>
                  <div className="addBtn"
                    onClick={()=>{
                      const copy = [...facultyCareer, ""];
                      setFacultyCareer(copy);
                    }}
                  >입력란추가</div>
                </div>
                {
                  facultyCareer.map((item:any, itemindex:any)=>{
                    return (
                      <div className="subRow">
                        <input value={item} className={item === '' ? "inputdefault" : "inputdefault select" } type="text" 
                          onChange={(e) => {
                            const copy = [...facultyCareer];
                            copy[itemindex] = e.target.value;
                            setFacultyCareer(copy)}
                          }/>
                          <div onClick={()=>{
                             const copy = [...facultyCareer];
                             const filter = copy.filter((_, index) => index !== itemindex);
                             setFacultyCareer(filter);
                          }}>
                            <CiCircleMinus color='#FF0000' size={20}/>
                          </div>  
                      </div>
                    )
                  })
                }
              </div>
              <div className="inputbox" style={{}}>
                <p>기타소개</p>
                <textarea 
                  className={facultyNotice === '' ? "textarea" : "textarea areaselect"}
                  value={facultyNotice}
                  onChange={(e)=>{setFacultyNotice(e.target.value)}}
                />
              </div>

              <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>
            </>
            }

            
            {
              (studentOrFaculty === 'student'  || facultySort === 'both' )&&
              <>
              <h2>업체소개(선택)</h2>

              <div className="inputbox">
                <p>업체명</p>
                <input value={logisterCoName} className={logisterCoName === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLogisterCoName(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <p>업태/종목</p>
                <input value={logisterCoSort} className={logisterCoSort === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLogisterCoSort(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <div className="inputbox-btncover">
                  <p>업체주소</p>
                  <div className="addBtn"
                    onClick={()=>{setIsViewAddressTab(true)}}
                  >주소찾기</div>
                </div>
                { isViewAddressTab &&
                  <DaumPostcode
                    style={{
                      width: '400px',
                      height: '400px',
                    }}
                    onComplete={onCompletePost}
                  ></DaumPostcode>
                }
                
                <input value={logisterCoAddress} className={logisterCoAddress === '' ? "inputdefault" : "inputdefault select" } type="text" 
                    onChange={(e) => {
                      alert('기본주소는 주소찾기를 통해 입력해주세요')
                    }}
                  />
                <input value={logisterCoAddressRest} className={logisterCoAddressRest === '' ? "inputdefault" : "inputdefault select" } type="text" placeholder="나머지주소"
                  onChange={(e) => {setLogisterCoAddressRest(e.target.value)}}
                />
              </div>
              <div className="inputbox">
                <p>업체번호</p>
                <input value={logisterCoPhone} className={logisterCoPhone === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLogisterCoPhone(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <p>업체이메일</p>
                <input value={logisterCoEmail} className={logisterCoEmail === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLogisterCoEmail(e.target.value)}}/>
              </div>
              <div className="inputbox">
                <p>업체홈페이지</p>
                <input value={logisterCoHomePage} className={logisterCoHomePage === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLogisterCoHomePage(e.target.value)}}/>
              </div>
              <div className="inputbox" style={{}}>
                <p>업체소개</p>
                <textarea 
                  className={logisterCoNotice === '' ? "textarea" : "textarea areaselect"}
                  value={logisterCoNotice}
                  onChange={(e)=>{setLogisterCoNotice(e.target.value)}}
                />
              </div>
            

              <p style={{fontSize:'14px', margin:'10px 0'}}>* 회사 대표 사진은 마이페이지에서 업로드 할 수 있습니다.</p>
            </>
            }

            

            <div className="buttonbox">
              <div className="button"
              onClick={()=>{
                if (logisterId === '' || logisterName === '' || logisterPasswd === '' || logisterPhone === '') {
                  alert('필수항목을 채워주세요.')
                } else {
                  if (logisterIdCheck) {
                    studentOrFaculty === 'student' 
                    ? handleLogister()
                    : handleLogisterFaculty()
                  } else {
                    alert('아이디 중복 체크를 해주세요.')
                  }
                }
              }}
              >
                <p>회원가입</p>
              </div>
            </div>

            

            <div className="bottombox">
              <div className="cover">
                <p onClick={()=>{setCurrentTab(1)}}>이전</p>
              </div>
            </div>
            
          </div>
        }
        
        

      </div>

      <Footer/>
    </div>
  );
}
