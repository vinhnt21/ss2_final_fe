import React from 'react';
import Markdown from "react-markdown";

function Message({message}) {
    const bot = ['Tutor', 'System']

    const messageContainerPosition = bot.includes(message.sender) ? 'justify-start' : 'justify-end';
    const senderPosition = bot.includes(message.sender) ? 'text-left' : 'text-right';
    const messagePosition = bot.includes(message.sender) ? 'items-start' : 'items-end';
    const textError = message.sender === 'System' ? 'text-red-500' : '';
    console.log(message);
    return (
        <div className={`flex ${messageContainerPosition} w-full`}>
            <div className={`w-4/5 flex flex-col ${messagePosition}`}>
                <div className={`text-sm text-gray-500 ${senderPosition} m-2`}>
                    {message.sender}
                </div>
                <div className={`bg-gray-200 p-2 rounded-xl m-2 w-fit ${senderPosition} ${textError}`}>
                    <Markdown>{message.text}</Markdown>
                </div>
            </div>
        </div>
    );
}

export default Message;
