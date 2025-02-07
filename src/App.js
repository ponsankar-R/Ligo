import './App.css';
import { FaWolfPackBattalion } from "react-icons/fa";

import InputPrompt from './InputPrompt';

function App() {
  return (
    <div className='h-[100vh]'>

    <div className="text-white text-3xl bg-violet-950 p-2 rounded-b-2xl font-serif  ">
      <div className='bg-white w-fit rounded-xl text-violet-950 px-4 py-1 select-none'>
     <FaWolfPackBattalion  className='inline mr-2 ' />
      <h1 className='inline'>Ligo</h1>
      </div>
    </div>

    <div className='absolute bottom-4  h-[20%] w-[95vw] rounded-xl  mx-0 md:mx-6 '>

    <InputPrompt />  
   
    </div>
    </div>
  );
}

export default App;
