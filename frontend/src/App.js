import "./App.css"
import { Routes, Route , Navigate,} from 'react-router-dom';
import KanbanBoard from "./components/KanbanBoard";

import Login from "./components/Login/Login";
import { useUser } from "./context";

const ProtectedRoute=({children})=>{
  const {user,setUser}=useUser();
  if(user){
    return children;
  }
  else {
    return <Navigate to={"/login"}/>
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
