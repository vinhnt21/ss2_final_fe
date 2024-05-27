// src/components/Chat.js
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAnswer} from '../services/api';
import Message from './Message';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const fullName = localStorage.getItem('fullName');
    const navigate = useNavigate();

    const sendMessage = async (e) => {
        e.preventDefault()
        const userMessage = {text: input, sender: fullName};
        setMessages([...messages, userMessage]);
        setInput('');
        try {
            console.log('Fetching answer');
            console.log('input', input);
            const response = await getAnswer(input);
            console.log('response', response);
            const botMessage = {text: response.data.answer, sender: 'Tutor'};
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            const botMessage = {text: error.message, sender: "System"};
            setMessages([...messages, userMessage, botMessage]);
            // console.log("error", error)
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const demoData = [
        {sender: 'Vinh', text: "Hi"},
        {sender: 'Tutor', text: "How can I help you today?"},
        {sender: 'Vinh', text: "I want to know more about the DSA course."},
        {
            sender: 'Tutor',
            text: "\"To get a good assessment in this Data Structure and Algorithm module, you should focus on the following:\n" +
                "\n" +
                "1. **Attendance:** Attend at least 80% of classes to ensure you don't lose marks for attendance.\n" +
                "\n" +
                "2. **Discussion:** Actively participate in class discussions and present assigned tasks well to demonstrate your understanding and critical thinking skills.\n" +
                "\n" +
                "3. **Midterm Exam:** Study the course materials thoroughly and practice solving problems related to algorithm analysis, sorting algorithms, and fundamental data structures.\n" +
                "\n" +
                "4. **Final Exam:** Prepare comprehensively for the final exam by reviewing all the topics covered throughout the course, with a focus on understanding and implementing data structures and algorithms.\n" +
                "\n" +
                "5. **Assignments:** Complete all assignments on time and to the best of your ability. This will help you practice implementing data structures and algorithms in Java and demonstrate your programming skills.\n" +
                "\n" +
                "6. **Supplementary Materials:** Utilize the supplementary materials available through the course website and the recommended textbooks to enhance your understanding of the concepts.\n" +
                "\n" +
                "7. **Self-Study and Practice:** Dedicate time outside of class to self-study and practice solving problems related to data structures and algorithms. This will help you reinforce your understanding and improve your problem-solving abilities.\n" +
                "\n" +
                "8. **Time Management:** Plan your study schedule effectively to ensure you have sufficient time to cover all the course material and complete assignments on time.\n" +
                "\n" +
                "9. **Collaboration:** Collaborate with your classmates on assignments and discussions, but ensure you understand the concepts and can explain them independently.\n" +
                "\n" +
                "10. **Seek Help When Needed:** Don't hesitate to ask your instructor or classmates for assistance if you encounter difficulties understanding the material or solving problems.\""
        },
        {sender: 'Vinh', text: "I want to know more about the DSA course."},
        {
            sender: 'Tutor',
            text: "\"To get a good assessment in this Data Structure and Algorithm module, you should focus on the following:\n" +
                "\n" +
                "1. **Attendance:** Attend at least 80% of classes to ensure you don't lose marks for attendance.\n" +
                "\n" +
                "2. **Discussion:** Actively participate in class discussions and present assigned tasks well to demonstrate your understanding and critical thinking skills.\n" +
                "\n" +
                "3. **Midterm Exam:** Study the course materials thoroughly and practice solving problems related to algorithm analysis, sorting algorithms, and fundamental data structures.\n" +
                "\n" +
                "4. **Final Exam:** Prepare comprehensively for the final exam by reviewing all the topics covered throughout the course, with a focus on understanding and implementing data structures and algorithms.\n" +
                "\n" +
                "5. **Assignments:** Complete all assignments on time and to the best of your ability. This will help you practice implementing data structures and algorithms in Java and demonstrate your programming skills.\n" +
                "\n" +
                "6. **Supplementary Materials:** Utilize the supplementary materials available through the course website and the recommended textbooks to enhance your understanding of the concepts.\n" +
                "\n" +
                "7. **Self-Study and Practice:** Dedicate time outside of class to self-study and practice solving problems related to data structures and algorithms. This will help you reinforce your understanding and improve your problem-solving abilities.\n" +
                "\n" +
                "8. **Time Management:** Plan your study schedule effectively to ensure you have sufficient time to cover all the course material and complete assignments on time.\n" +
                "\n" +
                "9. **Collaboration:** Collaborate with your classmates on assignments and discussions, but ensure you understand the concepts and can explain them independently.\n" +
                "\n" +
                "10. **Seek Help When Needed:** Don't hesitate to ask your instructor or classmates for assistance if you encounter difficulties understanding the material or solving problems.\""
        }
    ]
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
                <div className={`bg-gray-300 rounded-2xl flex flex-col items-center h-full`}>
                    <div className="h-16 w-full border-b border-black flex justify-center items-center">
                        <span className="text-3xl">DSA Course Tutor</span>
                    </div>
                    <div className=" h-5/6 overflow-y-scroll  w-full mb-4">
                        {messages.map((message, index) => (
                            <Message key={index} message={message}/>
                        ))}
                        <div ref={messagesEndRef}/>
                    </div>
                    <form className="h-14 bg-amber-100 w-4/5 p-5 flex justify-center items-center rounded-2xl ">
                        <input
                            className="flex-grow bg-amber-100 placeholder:text-gray-800 border-none outline-none"
                            type="text"
                            placeholder="What’s in your mind?..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
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

