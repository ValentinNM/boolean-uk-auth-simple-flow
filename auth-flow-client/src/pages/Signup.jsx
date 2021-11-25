import { useState } from "react";

export default function Signup({setAuthUser}) {

    const API_URL = process.env.REACT_APP_API_URL;
    
    const [newUser, setNewUser] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (event) => { 
        event.preventDefault(); 

        const fetchOptions={
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({...newUser})
        }

        fetch(`http://localhost:3030/signup`, fetchOptions)
        .then((res)=>res.json())
        .catch(error => console.log(error))
        .then((newUserData) => {
            console.log("handleSubmit data: ", newUserData)
            
            const user = newUserData.user;
            
            // console.log("user: ", user)
            
            if(user) {  // if the response is true => add to local state
                setAuthUser(user)

                localStorage.setItem("user", JSON.stringify(user)) // => is being added to the browsr of choice Local Storage
                                                                         //for the user not to remeber the credentials all the time
            }
        })
    }

    const handleInput = (event) => {

        const inputName = event.target.name;
        const inputValue = event.target.value;

        setNewUser({
            ...newUser,
            [inputName] : inputValue
        })
    }
       
    return(
        <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="email">
                Email
                <input onChange={handleInput} name="email" type="email" required />
            </label>
            <label htmlFor="password">
                Password
                <input onChange={handleInput} name="password" type="password" required />
            </label>
            <button type="submit">Sign me up ✍🏼</button>
        </form>
    )
}