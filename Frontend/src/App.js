// import in project


import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Route from './routers';

import { useEffect } from "react";

function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/login');
    }
  }, [isAuthenticated, navigate])

  return (
    <Route />
  );
}

export default App;
