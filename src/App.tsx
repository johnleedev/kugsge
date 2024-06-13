import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './screens/main/Main';
import Header from './components/Header';
import NetworkMain from './screens/network/NetworkMain';
import Login from './screens/login/Login';
import Logister from './screens/login/Logister';
import CommunityMain from './screens/cummunity/CommunityMain';
import MypageMain from './screens/mypage/MypageMain';
import ClassMain from './screens/class/ClassMain';
import BusinessInfoMain from './screens/businessinfo/BesinessInfoMain';

function App() {

  return (
    <div className="App">
      <RecoilRoot>

        <Header/>
        
        <div className='Main'>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/businessinfo" element={<BusinessInfoMain/>}/>
            <Route path="/network/*" element={<NetworkMain/>}/>
            <Route path="/community/*" element={<CommunityMain/>}/>
            <Route path="/class/*" element={<ClassMain/>}/>
            <Route path="/mypage/*" element={<MypageMain/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logister" element={<Logister/>}/>
          </Routes>
        </div>
      </RecoilRoot>
    </div>
  );
}

export default App;
