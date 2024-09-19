import React, { useEffect, useState } from 'react';
import './BusinessInfo.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import { FaExternalLinkAlt } from "react-icons/fa";
import Loading from '../../components/Loading';

export default function WebSiteInfo() {
  
  let navigate = useNavigate();

  interface LinksProps {
    mainTitle : string;
    title: string;
    subUrl: string;
    notice: string;
   }
 

  // const [sites, setSites] = useState<LinksProps[]>([])
  // const fetchPosts = async () => {
  //   const res = await axios.get(`${MainURL}/businessinfo/getsiteslists`)
  //   if (res) {
  //     const copy: LinksProps[] = res.data;
  //     console.log(copy);
  //     setSites(copy);
  //   }
  // }; 

  // useEffect(() => {
	// 	fetchPosts();
	// }, []);  
  
  const sites = [
    {
        "id": 1,
        "mainTitle": "스타트업 전문미디어",
        "title": "벤처스퀘어",
        "subUrl": "https://www.venturesquare.net/",
        "notice": "국내 스타트업 뉴스 및 기술 트렌드 분석 제공"
    },
    {
        "id": 2,
        "mainTitle": "스타트업 전문미디어",
        "title": "플래텀",
        "subUrl": "https://platum.kr/",
        "notice": "스타트업 스토리 스타트업 관련 지식 및 경험 콘텐츠 제공"
    },
    {
        "id": 3,
        "mainTitle": "스타트업 전문미디어",
        "title": "비석세스",
        "subUrl": "https://www.besuccess.com/",
        "notice": "해외 동향 및 글로벌 진출 관련 정보 제공"
    },
    {
        "id": 4,
        "mainTitle": "스타트업 전문미디어",
        "title": "아웃스탠딩",
        "subUrl": "https://outstanding.kr/",
        "notice": "주로 IT 모바일 및 웹 서비스 등의 분야에 대해서 블로그 및 스토리텔링 형식으로 뉴스 제공"
    },
    {
        "id": 5,
        "mainTitle": "스타트업 전문미디어",
        "title": "스타트업 위클리",
        "subUrl": "http://glance.media/",
        "notice": "매주 월요일 새벽에 스타트업 관련 행사 투자, 기술 등의 소식을 구독 신청자에게 뉴스레터로 전송"
    },
    {
        "id": 6,
        "mainTitle": "창업자 및 창업스토리 영상 콘텐츠",
        "title": "EO",
        "subUrl": "https://www.youtube.com/@eo_studio",
        "notice": "한국 스타트업 인터뷰, 창업자를 중심으로 한 인터뷰를 통해 창업스토리 제공"
    },
    {
        "id": 7,
        "mainTitle": "창업자 및 창업스토리 영상 콘텐츠",
        "title": "스타트업 발표영상",
        "subUrl": "https://www.youtube.com/@DemoDaySV",
        "notice": "창업지원을 하고 있는 스타트업들의 데모데이 영상 제공"
    },
    {
        "id": 8,
        "mainTitle": "창업자 및 창업스토리 영상 콘텐츠",
        "title": "Y Combinator",
        "subUrl": "https://www.youtube.com/@ycombinator",
        "notice": "세계적으로 유명한 스타트업 가속기 Y Combinator의 공식채널"
    },
    {
        "id": 9,
        "mainTitle": "창업자 및 창업스토리 영상 콘텐츠",
        "title": "Harvard Business Review",
        "subUrl": "https://www.youtube.com/@harvardbusinessreview",
        "notice": "하버드 비지니스 리뷰의 공식채널, 리더쉽, 창업, 경영적략에 관한 인사이트"
    },
    {
        "id": 10,
        "mainTitle": "창업자 및 창업스토리 영상 콘텐츠",
        "title": "TED",
        "subUrl": "https://www.youtube.com/@TED",
        "notice": "TED에서 제공하는 창업과 기업가정신에 관한 다양한 강연을 모아 놓은 채널"
    },
    {
        "id": 11,
        "mainTitle": "투자유치",
        "title": "한국벤처 캐피탈협회",
        "subUrl": "https://www.kvca.or.kr/",
        "notice": "밴처캐피탈 관련 정보 및 벤처투자 동향 제공"
    },
    {
        "id": 12,
        "mainTitle": "투자유치",
        "title": "엔젤투자지원센터",
        "subUrl": "https://www.kban.or.kr/",
        "notice": "엔젤투자통향, 엔젤투자 관련 지원 프로그램 등"
    },
    {
        "id": 13,
        "mainTitle": "투자유치",
        "title": "the VC",
        "subUrl": "ttps://thevc.kr",
        "notice": "한국 스타트업 투자 데이터베이스 투자동향, 스타트업 비상장 기업 엑셀러레이터, 벤처캐피탈 정보"
    },
    {
        "id": 14,
        "mainTitle": "투자유치",
        "title": "혁신의 숲",
        "subUrl": "https://www.innoforest.co.kr/",
        "notice": "국내 스타트업 전문 데이터베이스 및 성장분석 플랫폼"
    },
    {
        "id": 15,
        "mainTitle": "정부지원프로그램",
        "title": "창업넷",
        "subUrl": "https://www.k-startup.go.kr/",
        "notice": "예비창업자와 창업기업을 위한 정부 창업지원사업 정보 제공"
    },
    {
        "id": 16,
        "mainTitle": "정부지원프로그램",
        "title": "창조경제혁신센터",
        "subUrl": "https://ccei.creativekorea.or.kr/",
        "notice": "지역 혁신 및 창업의 거점 역할을 하고 있으며, 공동 홈페이지 운영"
    },
    {
        "id": 17,
        "mainTitle": "정부지원프로그램",
        "title": "대구창조경제혁신센터",
        "subUrl": "https://ccei.creativekorea.or.kr/daegu/",
        "notice": "대구지역 혁신 및 창업의 거점 역할을 하고 있음"
    },
    {
        "id": 18,
        "mainTitle": "정부지원프로그램",
        "title": "DASH",
        "subUrl": "https://startup.daegu.go.kr/",
        "notice": "DAEGU STARTUP HUB, 대구 지역의 모든 창업지원사업 정보"
    },
    {
        "id": 19,
        "mainTitle": "기타",
        "title": "한국청년 기업가정신재단",
        "subUrl": "http://www.koef.or.kr/",
        "notice": "코스닥 상장 기업 등 벤처 1세대 창업자 중심으로 설립, 기업가정신/창업교육 운영"
    },
    {
        "id": 20,
        "mainTitle": "기타",
        "title": "스타트업 얼라이언스",
        "subUrl": "https://www.startupall.kr/",
        "notice": "스타트업 생태계 관련 보고서 발간, (미래창조과학부,네이버,카카오 등의 참여)"
    },
    {
        "id": 21,
        "mainTitle": "기타",
        "title": "스타트업지리지",
        "subUrl": "https://www.koreastartup.co.kr/",
        "notice": "위치 기반으로 우리나라 스타트업이 어떻게 분포하고 있는지 지도형식으로 제공"
    },
    {
        "id": 22,
        "mainTitle": "기타",
        "title": "로켓펀치",
        "subUrl": "https://www.rocketpunch.com/",
        "notice": "국내 최대 비지니스 네트워크 표방"
    }
  ]


  interface siteGroup {
    title: string;
    links: LinksProps[];
  }

  const siteData: siteGroup[] = sites.reduce((acc: siteGroup[], curr) => {
    const existingGroup = acc.find(group => group.title === curr.mainTitle);
    if (existingGroup) {
      existingGroup.links.push(curr);
    } else {
      acc.push({
        title: curr.mainTitle,
        links: [curr]
      });
    }
    return acc;
  }, []);



  return (
    sites.length === 0
    ?
    <div style={{height:'100vh'}}>
      <Loading />
    </div>
    :
    <div className='businessInfo'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">창업정보</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/notice');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              창업관련사이트
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">창업관련사이트</div>

          <div className="subpage__main__content">
            <p style={{width:'100%', fontSize:'14px', marginBottom:'10px', textAlign:'end'}}>
              * 자료출처 : 김보혜 교수
            </p> 
            <div className="main__content">
              
              {
                siteData.map((item:any, index:any)=>{
                  return (
                    <div className='siteInfo--box' key={index}>
                      <div className="siteInfo--title">
                        <p>{item.title}</p>
                      </div>
                      <div className="siteInfo--content">
                      {
                        item.links.map((subItem:any, subIndex:any)=>{
                          return (
                            <a className='siteInfo--SubRow' key={subIndex}
                                href={subItem.subUrl} target="_blank"
                            >
                              <div className="siteInfo--SubTitle">
                                {subItem.title}
                              </div>
                              <div className="siteInfo--SubUrl" rel="noopener noreferrer">
                                <p>{subItem.subUrl}</p>
                                <p>바로가기 <FaExternalLinkAlt size={14}/></p>
                              </div>
                              <div className="siteInfo--SubNotice">
                                {subItem.notice}
                              </div>
                            </a>
                          )
                        })
                      }
                      </div>
                    </div>
                  )
                })
              }
               
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}
