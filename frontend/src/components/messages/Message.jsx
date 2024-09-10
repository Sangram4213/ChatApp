import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-avatar&psig=AOvVaw2TI1JjqEQKB_1gz549UYPi&ust=1726061357081000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNj0p-K9uIgDFQAAAAAdAAAAABAE"
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white bg-blue-500 pb-2`}
      >
        Hi ! What is up??
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
       12:42
      </div>
    </div>
  );
};

export default Message;
