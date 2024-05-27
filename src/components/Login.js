import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from "../services/api";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            const data = response.data;
            localStorage.setItem('accessToken', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            localStorage.setItem('fullName', data.fullname);
            navigate('/chat')
        } catch (error) {
            alert('Invalid username or password');
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="login-container h-screen w-screen flex justify-center  bg-gray-300">
            <form onSubmit={handleSubmit}
                  className="bg-gray-100 flex justify-center items-center h-fit flex-col p-6 rounded-2xl mt-40 border border-amber-600">
                {/*Login Label*/}
                <label className="text-2xl font-bold text-amber-600 ">Welcome Back</label>
                <input type="text" placeholder="Enter your student id" value={username}
                       className="p-2.5 w-96 my-5 rounded-md outline-amber-600 border border-amber-600 placeholder:text-amber-600"
                       onChange={(e) => setUsername(e.target.value)}
                       required/>
                <input type="password" placeholder="Enter your password" value={password}
                       className="p-2.5 w-96 my-5 rounded-md outline-amber-600 border border-amber-600 placeholder:text-amber-600"
                       onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit"
                        className="text-white font-bold bg-amber-600 w-52 px-3.5 py-2.5 rounded-md m-3 border hover:border hover:border-amber-600 hover:bg-white hover:text-amber-600"
                >Login
                </button>
            </form>
        </div>
    );
}

export default Login;
