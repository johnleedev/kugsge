import React from 'react';
import './footer.scss'

export default function Footer (props:any) {
  
  return (
    <footer className='footer'>

      <div className="response-cover">

        <div className="inner">
          
          <ul className='mobile-none'>
            <a href='http://www.kugsge.com/usingpolicy.html' target='_blank'>
              <li className='link'>이용약관</li>
            </a>
            <div className='divider'></div>
            <a href='http://www.kugsge.com/personalinfo.html'>
              <li className='link'>개인정보처리방침</li>
            </a>
            <div className='divider'></div>
            <a href='#'>
              <li className='link'>FAQ</li>
            </a>
          </ul>

          <ul>
            <li className='text black'>더좋은사람들</li>
            <li className='text black'>대표자: 이요한</li>
            <li className='text'>사업자등록번호: 736-29-01512</li>
            <li className='text'>통신판매업신고번호: 2023-대구달성-1006호</li>
          </ul>

          <ul>
            <li className='text'>카카오톡문의 : ID - thebetterpeople</li>
            <li className='text'>E-mail: thebetterpeople@naver.com</li>
          </ul>

          <ul className='copyright'>
            <li className='text'>COPYRIGHT</li>
            <li className='text black'>© 2023. TheBetterPeople.</li>
            <li className='text'>All rights reserved.</li>
          </ul>


        </div>
      </div>
    </footer>
      
  );
}

 

