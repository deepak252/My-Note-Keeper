import './App.scss';
// import { Navbar } from './components/navbar/Navbar';
// import { NoteCard } from './components/NoteCard';
import { Dashboard } from './Dashboard';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {screenWidthAction} from "./state/actionCreators/screenWidthAction"
function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const changeWidth = () => {
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
      {/* <Navbar /> */}
        <Dashboard />
      {/* <NoteCard /> */}
    </div>
  );
}

export default App;
