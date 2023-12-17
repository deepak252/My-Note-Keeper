import './App.scss';
import {useDispatch} from "react-redux";
import {useState,useEffect} from "react";
import {screenWidthAction} from "./state/actionCreators/screenWidthAction";
import Bookmarks from './pages/Bookmarks';
import Home from './pages/Home';
import Trash from './pages/Trash';
import Sidebar from './components/sidebar/Sidebar';
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from './firebase';
import { getUserData } from './services/firebaseAuthService';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import  SignIn  from './pages/SignIn';
import SignUp from './pages/SignUp';
import { currentUserAction } from './state/actionCreators/currentUserAction';


function App() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [user,loadingAuthState, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(false);

  useEffect(()=>{
    const changeWidth = () => {
      // Changing screen width state using dispatch
      dispatch(screenWidthAction(window.innerWidth))
    }
    changeWidth();
    window.addEventListener('resize', changeWidth)
    return () => {
        window.removeEventListener('resize', changeWidth)
    }
  },[])

  useEffect(() => {
      setLoading(true);
      console.log("Current user = ",user);
      console.log("loadingAuthState = ", loadingAuthState);
      if (loadingAuthState) return;
      if (!user){
          console.log("User not signed in");
          return;
      }
      // fetchUserData();
      getUserData(user.uid).then((userData)=>{
          dispatch(currentUserAction(user.uid));
          setUserInfo(userData);
      }).finally(()=>setLoading(false));
  }, [user, loadingAuthState]);

  const fetchUserData = async () =>{
    const userData = await getUserData(user.uid);
    dispatch(currentUserAction(user.uid));
    setUserInfo(userData);
    setLoading(false);
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
          {user && <Sidebar />}
          {/* <Sidebar /> */}
          <Routes>
            <Route exact path='/signin' element ={<SignIn />} />
            <Route exact path='/signup' element ={<SignUp />} />
            <Route exact path='/' element ={<Home />} />
            <Route exact path='/bookmarks' element ={<Bookmarks />} />
            <Route exact path='/trash' element ={<Trash />} />
          </Routes>

      </div>
    </Router>
  );
}

export default App;
