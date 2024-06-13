import React, { useEffect, useState } from 'react';
import './Network.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';

export default function Faculty () {

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
    stOrFa : string;
    userYearStage : string;
    faLocation: string;
    faEmail : string;
    faPhone : string;
    faField: string;
    faDegree : string;
    faCareer : string;
    faNotice: string;
    userCoName: string;
    userCoDuty: string;
    userCoSort : string;
    userCoAddress: string;
    userCoAddressRest: string;
    userCoPhone: string;
    userCoEmail : string;
    userCoHomePage: string;
    userCoNotice: string;
    userCoImage :string;
  }

  const [users, setUsers] = useState<UsersProps[]>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/network/getfaculty`)
    if (res) {
      const copy: UsersProps[] = res.data;
      const filter = copy.sort((a:any, b:any)=> b.stOrFa.localeCompare(a.stOrFa));
      setUsers(filter);
    }
  };

  useEffect(() => {
		fetchPosts();
	}, []);  


  interface PersonGroup {
    stOrFa: string;
    person: UsersProps[];
  }
  
  const personData: PersonGroup[] = users.reduce((acc: PersonGroup[], curr: UsersProps) => {
    const stOrFa = curr.stOrFa;
    const existingGroup = acc.find(group => group.stOrFa === stOrFa);
    const person: UsersProps = {
        userName: curr.userName,
        userPhone: curr.userPhone,
        stOrFa : curr.stOrFa,
        userYearStage: curr.userYearStage,
        faLocation: curr.faLocation,
        faEmail : curr.faEmail,
        faPhone : curr.faPhone,
        faField: curr.faField,
        faDegree : curr.faDegree,
        faCareer : curr.faCareer,
        faNotice: curr.faNotice,
        userCoName: curr.userCoName,
        userCoDuty: curr.userCoDuty,
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
          stOrFa: stOrFa === 'faculty' ? '정교수' : '겸임교수',
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
              className="subpage__menu__item"
            >
              재학생 및 졸업생
            </div>
            <div 
              onClick={()=>{navigate('/network/faculty');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              교수진
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">교수진</div>

          <div className="subpage__main__content">
            <div className="main__content">
              {personData.map((item:any, index:any) => (
                <div
                  key={index}
                  className="person__wrap--category"
                  data-aos="fade-up"
                >
                  <div className="person__title">{item.stOrFa}</div>
                  <div className="person__wrap--item">
                    {item.person.map((subItem:any, subIndex:any) => {
                      return (
                        <div key={subIndex} className="person__item"
                          onClick={()=>{
                            navigate("/network/detail", {state : {data:subItem, stOrFa : 'faculty'}});
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
                            <p>{subItem.userName} 교수</p>
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
