import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import './Main.scss'
import axios from 'axios';
import MainURL from '../../MainURL';
import { format } from "date-fns";

export default function Main(props:any) {


  // 접속시 접속수 증가시키기
  const appUseCount = () => {
    const currentDate = new Date();
		const date = format(currentDate, 'yyyy-MM-dd');
    axios
      .post(`${MainURL}/appusecount`, {
        date : date
      })
      .then((res) => {return})
      .catch((error) => {
        console.log(error);
      });
  }
     
  useEffect(()=>{
    // appUseCount();
  }, []); 



	return (
		<div className='main'>

			<div className="banner">
				<div className="container banner-container">
					<p className="banner-slogan">
						<span className="slogan-item slogan-item--bold">계명대학교</span>
						<span className="slogan-item slogan-item--normal">글로벌창업대학원</span>
						<span className="slogan-item slogan-item--normal">커뮤니티</span>
					</p>
					<p className="banner-sub_text">KEIMYUNG UNIVERSITY GRADUATE SCHOOL</p>
					<p className="banner-sub_text">OF GLOBAL ENTREPRENEURSHIP</p>
					<p className="banner-sub_text">CUMMUNITY</p>
					{/* <p className="banner-sub_text">ALUMNI ASSOCIATION</p> */}
				</div>
			</div>	
			


            
			<Footer />

		</div>
	);
}
