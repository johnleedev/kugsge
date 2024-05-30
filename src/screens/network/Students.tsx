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


  const [users, setUsers] = useState<UsersProps[]>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/network/getusers`)
    if (res) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
		fetchPosts();
	}, []);  

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
          <div className="subpage__main__content">
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
