// src/components/Chat.js
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAnswer} from '../services/api';
import Message from './Message';
import {authContext} from "../services/privateRouter";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const fullName = localStorage.getItem('fullName');
    const navigate = useNavigate();
    const {loggedOut} = useContext(authContext);
    const sendMessage = async (e) => {
        e.preventDefault()
        const userMessage = {text: input, sender: fullName};
        setMessages([...messages, userMessage]);
        setInput('');
        setIsReplying(true);
        try {
            console.log('Fetching answer');
            console.log('input', input);
            const response = await getAnswer(input);
            console.log('response', response);
            const botMessage = {text: response.data.answer, sender: 'Tutor'};
            setIsReplying(false);
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            const botMessage = {text: error.message, sender: "System"};
            setIsReplying(false);
            setMessages([...messages, userMessage, botMessage]);
            // console.log("error", error)
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        loggedOut();
        navigate('/');
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    return (
        <div className="w-dvw h-dvh flex bg-black">
            <div className="w-96 h-dvh flex flex-col justify-between items-center p-5">
                <img className="h-16 pb-4 px-16 border-b border-white" src="/logo-text.png" alt="Description"/>
                <div className="flex flex-col justify-start">
                    <span className="text-white text-xl">{fullName}</span>
                    <button className="bg-gray-300 px-1.5 w-44 py-0.5 rounded-xl hover:bg-gray-500 hover:text-white"
                            onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            <div className="w-full h-dvh p-4 overflow-hidden">
                <div className={`bg-gray-300 rounded-2xl flex flex-col items-center h-full pb-3`}>
                    <div className="h-16 w-full border-b border-black flex justify-center items-center">
                        <span className="text-3xl">DSA Course Tutor</span>
                    </div>
                    <div className=" h-5/6 overflow-y-scroll  w-full mb-4">
                        {messages.map((message, index) => (
                            <Message key={index} message={message}/>
                        ))}
                        {
                            isReplying && (
                                <Message message={{text: 'Your message is being processed...', sender: 'Tutor'}}/>
                            )
                        }
                        <div ref={messagesEndRef}/>
                    </div>
                    <form className="h-14 bg-amber-100 w-4/5 px-5 flex justify-center items-center rounded-2xl ">
                        <textarea
                            className="flex-grow w-full bg-amber-100 placeholder:text-gray-800 border-none outline-none resize-none h-full pt-3"
                            placeholder="What’s in your mind?..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    sendMessage(e)
                                }
                            }}
                        />
                        <button onClick={sendMessage} className="h-14" type={"submit"}>
                            <img className="h-4/5" src="/send_btn.png" alt="send"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;

