import './App.css';
import { FaWolfPackBattalion } from "react-icons/fa";
import InputPrompt from './InputPrompt';
import { useState } from 'react';
import { TbTableOptions } from "react-icons/tb";
import Profile from './Profile';


function App() {
  const [currentChats, setCurrentChat] = useState([]);
  const [showHistory, setShowHistory]= useState(false);
  const [character,setCharacter]=useState(" ");

  const handleShowHistory=()=>{
    setShowHistory((prev)=>!prev);

  }

  const handleSetCharacter = () =>{
   
  }

  return (
    <div className='h-[95vh]'>
      {/* Header */}
      <div className="text-white text-3xl bg-violet-950 p-2 rounded-b-2xl font-serif">
        <div className='bg-white w-fit rounded-xl text-violet-950 px-4 py-1 select-none'>
          <FaWolfPackBattalion className='inline mr-2' />
          <h1 className='inline'>Ligo</h1>
        </div>
        <TbTableOptions onClick={handleShowHistory} className='absolute top-4 right-2 ' />
        
      </div>

      { 
        showHistory&&(<Profile />)
      }


    
      <div className="p-4 overflow-y-auto h-[75vh]">
        {currentChats.map((chat, index) => (
          <div key={index} className="mb-4">
            {/* User Prompt */}
            {chat.type === 'prompt' && (
              <div className="bg-violet-950 p-2 rounded-lg text-right text-white">
               {chat.content}
              </div>
            )}
            {/* AI Response */}
            {chat.type === 'response' && (
              <div
                className="bg-gray-200 p-2 rounded-lg"
                dangerouslySetInnerHTML={{ __html: chat.content }} // Render HTML safely
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className='absolute bottom-4 h-[20%] w-[95vw] rounded-xl mx-0 md:mx-6'>
        <InputPrompt setCurrentChat={setCurrentChat} />
      </div>
      <div className='absolute bottom-2 flex flex-row w-full justify-evenly'>
        <h1 onClick={handleSetCharacter} className='border-2 bg-orange-400 rounded-xl px-2 '>Character1</h1>
        <h1 className='border-2 bg-orange-400 rounded-xl px-2 '>Character2</h1>
        <h1 className='border-2 bg-orange-400 rounded-xl px-2 '>Character3</h1>
        <h1 className='border-2 bg-orange-400 rounded-xl px-2 '>Character4</h1>
        <h1 className='border-2 bg-orange-400 rounded-xl px-2 '>Character5</h1>
      </div>
    </div>
  );
}

export default App;