import React, { createContext, useContext, useState } from "react";

// Create context
const ChatContext = createContext();

// Create provider component
export const ChatProvider = ({ children }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [message, setMessage] = useState([]);
    const [selectedUserMessages, setSelectedUserMessages] = useState(false);

    const selectUser = (user, userMessages) => {
        setSelectedUser(user);
        setMessage(userMessages);
    };

    const handleClick = (userId) => {
        handleReadMessage(userId);
        setSelectedUserMessages(true);
        setSelectedUserId(userId);
    };

    return (
        <ChatContext.Provider
            value={{
                selectedUserId,
                selectUser,
                message,
                selectedUserMessages,
                handleClick
                  }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;

// Create a custom hook to use ChatContext
export const useChat = () => {
    return useContext(ChatContext);
}
