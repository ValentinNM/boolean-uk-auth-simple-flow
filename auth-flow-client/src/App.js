import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './componets/Header';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import SecurePage from './pages/Secure';
import { useEffect, useState } from 'react';

function App() {

  const [authUser, setAuthUser] = useState(null) // set as null for validation on the Signup page 
  console.log("authUser: ", authUser)

  useEffect(() => { // purpose of this useEffect is to not lose the user data when page has been reset 
    const userAsString = localStorage.getItem("user") // getting the user string form  the local storage

    if(userAsString) { 
      const user = JSON.parse(userAsString) // transform string data top obj

      setAuthUser(user) // re-set the authUser to user(from local storage)
    }
  },[])

  return (
    <div className="App">
      <Header className="App-header"/>
      <Routes>
        <Route path="/signup" element={ <Signup setAuthUser={setAuthUser} /> }/>
        <Route path="/signin" element={ <Signin authUser={authUser} /> }/>
        <Route path="/secure" element={ <SecurePage authUser={authUser} /> }/>
      </Routes>
    </div>
  );
}

export default App;
