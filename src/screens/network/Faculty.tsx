import React from 'react';
import './Network.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Faculty() {
  
  let navigate = useNavigate();

  const personData = [
    {
      title: '제11회',
      items: [
        {
          imgSrc: 'https://www.puts.or.kr/img/chairman/임규일목사2.png',
          name: '임규일',
          role: '목사',
          detail: '기교73 / 만성(은퇴)',
          link: '',
        },
      ],
    },
    {
      title: '제10회',
      items: [
        {
          imgSrc: 'https://www.puts.or.kr/img/chairman/최병성.png',
          name: '박기철',
          role: '목사',
          detail: '기교73 / 분당제일교회',
          link: 'https://www.puts.or.kr/intro_page/2',
        },
        {
          imgSrc: 'https://www.puts.or.kr/img/chairman/박기철.png',
          name: '최병성',
          role: '목사',
          detail: '신학86 / 초록별생명평화연구소',
          link: 'https://www.puts.or.kr/intro_page/3',
        },
      ],
    },
    // 나머지 데이터는 비슷한 형식으로 추가
  ];

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
              {personData.map((person, index) => (
                <div
                  key={index}
                  className="person__wrap--category"
                  data-aos="fade-up"
                >
                  <div className="person__title">{person.title}</div>
                  <div className="person__wrap--item">
                    {person.items.map((item, idx) => (
                      <div key={idx} className="person__item">
                        <div className="person__img--people">
                          <img src={item.imgSrc} alt={item.name} />
                        </div>
                        <div className="person__name">
                          <strong>{item.name}</strong> {item.role}
                        </div>
                        <div className="person__detail">{item.detail}</div>
                     </div>
                    ))}
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
