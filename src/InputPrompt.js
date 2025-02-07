import React from 'react'
import { IoMdSend } from "react-icons/io";

function InputPrompt() {
  return (
    <div className='w-[100%] h-[100%] p-2 inline'>
        <textarea className='h-[100%] w-[99%] border-2 border-blue-400 rounded-2xl p-4' placeholder='ask anything to ligo'/>
        <button className='absolute top-[12%] right-[1%] text-3xl bg-slate-400 p-2 pl-4 text-white rounded-3xl '><IoMdSend /></button>
    </div>
  )
}

export default InputPrompt