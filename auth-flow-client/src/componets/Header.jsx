import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();

    const handleSignup= (event) => { 
        navigate("/signup")
    }

    const handleSignin = (event) => {
        navigate("/signin")
    }

    return( 
        <header>
             <button onClick={handleSignup}>
                Signup
             </button>
            <button onClick={handleSignin}>
                Signin
            </button>
            <button>
                Secure
            </button>
        </header>
    )
}