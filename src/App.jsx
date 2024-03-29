import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'


function App() {
  const [length, setlength] = useState(8);
  const [numbers, setnumbers] = useState("false");
  const [chars, setchars] = useState("false");
  const [pass, setpass] = useState("");
  const passref = useRef(null);//ref hook


//random passgen

  const passgen = useCallback(() => {
    let pass = "";
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    if (numbers) str += "0123456789";

    if (chars) str += "!@#$%^&*(){}[]";



    for (let i = 1; i <= length; i++) {

      let index = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(index)
    }

    setpass(pass);

  }, [length, numbers, chars, setpass])




//onclick copy
  const copyclip=useCallback(() => {
    passref.current?.select()
    window.navigator.clipboard.writeText(pass)
  }, [pass])




//passgen on reload /load
  useEffect(() => {

    passgen()
  }, [length, numbers, chars, passgen])




  return (
    <>

      <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-8 py-8  text-black-500 bg-gray-500 '>
        <h1 className='text-3xl text-center text-white my-4'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>

          <input
            type="text"
            value={pass}
            className='outline-none w-full py-1 px-3  '
            placeholder='password'
            readOnly
            ref={passref}
          />
          <button className='outline-none bg-blue-700 text-white px-4 py-1.5 shrink-0 hover:bg-blue-600 active:bg-blue-700'
            onClick={copyclip}
          >Copy</button>


        </div>

        <div className='flex text-sm gap-x-5'>
          <div className='flex items-center gap-x-1'>


            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer max-w-20 accent-blue-700'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label className='text-white'> Length ({length})</label>

          </div>

          <div className='flex items-center gap-x-1'>


            <input type="checkbox"
              defaultChecked={numbers}
              id='numberInp'
              className='accent-blue-700'
              onChange={() => {
                setnumbers((prev) => !prev)
              }}
            />
            <label className='text-white'> Numbers</label>


          </div>
          <div className='flex items-center gap-x-1'>


            <input type="checkbox"
              defaultChecked={chars}
              id='charInp'
              className='accent-blue-700'
              onChange={() => {
                setchars((prev) => !prev)
              }}
            />
            <label className='text-white'>Characters</label>


          </div>
        </div>
         <h3 className='text-white text-center mt-3'>Refresh to generate new password </h3>


      </div>
    </>
  )
}

export default App
