import React from 'react'
import {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY = "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";

function Bot() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT!",
            // sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: 'outgoing'
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);

        try {
            await processMessageToChatGPT(newMessages);
        } catch (error) {
            console.error("Error processing the API response:", error);
            // Handle the error here, show an error message, or provide a default message
            setMessages([
                ...newMessages,
                {
                    message: "Oops! Something went wrong. Please try again later.",
                    sender: "ChatGPT"
                }
            ]);
            setIsTyping(false);
        }

        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {


        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });

        const systemMessage = {
            "role": "system", "content": "explain things like i'm your bestfriend"
        }


        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages,
            ],
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);

            });
    }

    return (
        <div className="Bot">
            <div style={{ position: "relative", height: "800px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default Bot