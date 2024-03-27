import "./App.css"
import { useNavigate } from "react-router";
import { Routes, Route} from 'react-router-dom';
import KanbanBoard from "./components/KanbanBoard";
import {jwtDecode} from "jwt-decode"
import Login from "./components/Login/Login";
import { useUser } from "./context";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate();
  
  const { user, setUser } = useUser();
  useEffect(() => {
    const token = Cookies.get('jwt');
    if (!token ) {
      navigate('/login');
    } else if (JSON.stringify(user) === '{}') {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        setUser({});
      }
    }
  }, [user, setUser]);
  if (user.name) {
    return children;
  } else {
    return null;
  }
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute> <KanbanBoard /> </ProtectedRoute> } />
      </Routes>
    </>
  );
}

export default App;
