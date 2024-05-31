import React, { useEffect, useState } from 'react';
import './Network.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';

export default function Students() {

  let navigate = useNavigate();

  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userYearStage = sessionStorage.getItem('userYearStage');

  const checkLoginData = 
  ( userName === null || userName === undefined 
  || userId === null || userId === undefined 
  || userYearStage === null || userYearStage === undefined) 

  interface UsersProps {
    userName: string;
    userPhone: string;
    userYearStage: string;
    userCoName: string;
    userCoSort : string;
    userCoAddress: string;
    userCoAddressRest: string;
    userCoPhone: string;
    userCoEmail : string;
    userCoHomePage: string;
    userCoNotice: string;
    userCoImage :string;
  }

  const [usersOrigin, setUsersOrigin] = useState<UsersProps[]>([]);
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [yearStages, setYearStages] = useState([]);
  const [selectedYearStage, setSelectedYearStage] = useState('');
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/network/getusers`)
    if (res) {
      const copy: UsersProps[] = res.data.users;
      const yearStagesCopy = res.data.yearStages;
      yearStagesCopy.unshift("전체");
      setYearStages(yearStagesCopy);
      copy.sort((a, b) => {
        const aHasValue = a.userCoName !== "" && a.userCoImage !== "" && a.userCoImage !== null;
        const bHasValue = b.userCoName !== "" && b.userCoImage !== "" && b.userCoImage !== null;
        if (aHasValue && !bHasValue) return -1;
        if (!aHasValue && bHasValue) return 1;
        if (!aHasValue && !bHasValue) return 0;
         return a.userCoName.localeCompare(b.userCoName);
      });
      setUsersOrigin(copy);
      setUsers(copy);
    }
  };

  useEffect(() => {
		fetchPosts();
	}, []);  

  
  const handleYearStageChange = (selected : any) => {
    if (selected === '전체') {
      setUsers(usersOrigin);
    } else {
      setSelectedYearStage(selected);
      const copy = usersOrigin.filter((e:any)=>e.userYearStage === selected);
      setUsers(copy);
    }
  };

  const [inputValue, setInputValue] = useState('');  
  const changeInputValue = (text:string) => {
    setInputValue(text);
    if (text === '') {
      setUsers(usersOrigin);
    }
  };
  const filteredWord = (inputText : string) => {
    const filteredList = usersOrigin.filter((users: any) => {
      const searchFields = [users.userName, users.userCoName];
      return searchFields.some((field) => field && field.toLowerCase().includes(inputText.toLowerCase()));
    });
    setUsers(filteredList);
  }


  interface PersonGroup {
    yearStage: string;
    person: UsersProps[];
  }
  
  const personData: PersonGroup[] = users.reduce((acc: PersonGroup[], curr: UsersProps) => {
    const yearStage = curr.userYearStage;
    const existingGroup = acc.find(group => group.yearStage === yearStage);
    const person: UsersProps = {
        userName: curr.userName,
        userPhone: curr.userPhone,
        userYearStage: curr.userYearStage,
        userCoName: curr.userCoName,
        userCoSort: curr.userCoSort,
        userCoAddress: curr.userCoAddress,
        userCoAddressRest: curr.userCoAddressRest,
        userCoPhone: curr.userCoPhone,
        userCoEmail: curr.userCoEmail,
        userCoHomePage: curr.userCoHomePage,
        userCoNotice: curr.userCoNotice,
        userCoImage: curr.userCoImage
    };
    if (existingGroup) {
        existingGroup.person.push(person);
    } else {
        acc.push({
            yearStage: yearStage,
            person: [person]
        });
    }
    return acc;
  }, []);

  
  return (
    <div className='students'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">네트워크</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/network');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              재학생
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
          <div className="subpage__main__title">재학생</div>
          <div className="subpage__main__searchbar">
            <select 
              value={selectedYearStage}
              onChange={(e)=>{handleYearStageChange(e.target.value);}}
              className="dropdownBox"
            >
              {
                yearStages.map((option:any, index:any) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))
              }
            </select> 
            <div className="searchBox">
              <input className="searchInput" type="text" placeholder='이름, 업체명 검색'
                value={inputValue} onChange={(e)=>{changeInputValue(e.target.value)}}/>
              <div className="searchBtn"
                onClick={()=>{filteredWord(inputValue);}}
              >
                <p>검색</p>
              </div>
            </div>
          </div>

          <div className="subpage__main__content">
            <p style={{fontSize:'14px', marginBottom:'10px'}}>
              * 정렬 기준 : 대표사진 유무 - 업체명 가나다순
            </p>            
            <div className="main__content">
              {personData.map((item:any, index:any) => (
                <div
                  key={index}
                  className="person__wrap--category"
                  data-aos="fade-up"
                >
                  <div className="person__title">{item.yearStage}</div>
                  <div className="person__wrap--item">
                    {item.person.map((subItem:any, subIndex:any) => {
                      return (
                        <div key={subIndex} className="person__item"
                          onClick={()=>{
                            navigate("/network/detail", {state : subItem});
                          }}
                        >
                          <div className="person__img--people">
                          <div className='imageBox'>
                          {
                            checkLoginData 
                            ?
                            <p>회원만 볼수 있습니다.</p>
                            :
                            <>
                            {
                              subItem.userCoImage === null || subItem.userCoImage === undefined || subItem.userCoImage === ''
                              ? <p style={{fontSize:'14px'}}>등록된 사진이 없습니다.</p>
                              : <img src={`${MainURL}/images/usercoimage/${subItem.userCoImage}`} alt={'등록된 사진이 없습니다.'} />
                            }
                            </>
                          }
                          </div>
                          </div>
                          <div className="person__coname">
                            <p>{subItem.userCoName}</p>
                          </div>
                          <div className="person__name">
                            <p>대표 {subItem.userName}</p>
                          </div>
                      </div>
                      )
                    })}
                  </div>
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
