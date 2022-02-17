import './App.scss';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {screenWidthAction} from "./state/actionCreators/screenWidthAction";
import Bookmarks from './pages/Bookmarks';
import Home from './pages/Home';
import Trash from './pages/Trash';
import Sidebar from './components/sidebar/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


function App() {
  const dispatch = useDispatch();

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

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <Sidebar />
        <Routes>
          <Route exact path='/' element ={<Home />} />
          <Route exact path='/bookmarks' element ={<Bookmarks />} />
          <Route exact path='/trash' element ={<Trash />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
