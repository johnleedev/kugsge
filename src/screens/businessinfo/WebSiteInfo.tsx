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
 

  const [sites, setSites] = useState<LinksProps[]>([])
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/businessinfo/getsiteslists`)
    if (res) {
      const copy: LinksProps[] = res.data;
      setSites(copy);
    }
  }; 

  useEffect(() => {
		fetchPosts();
	}, []);  
  


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
