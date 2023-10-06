import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [text, setText] = useState("Copy");

  //useRef used to copy the password text to clipBoard

  const passwordRef = useRef(null);

  // We are using useCallback() for storing cache of function
  // that is getting used again and again
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*(-_+=[]{}~`";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    setText("Copied!")
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect is used to call passwordGenerator() function inside useCallBack();
  // useEffect() gets called once when page is loaded
  // if there is change in length, number and char onChange event,
  // then useEffect() gets called again
  useEffect(() => {
    passwordGenerator()
  },[length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
            />
            <button
              onClick={ copyPasswordToClipboard }
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>{text}</button>
        </div>
        <div className='flex text-sm gap-x-2 max-sm:flex-col'>
          <div className='flex items-center gap-x-1 max-[250px]:flex-col'>
            <input 
              type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer max-sm:w-full'
              onChange={(e) => {
                setLength(e.target.value)
                setText("Copy");
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
                setText("Copy");
              }} />
              <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
                setText("Copy");
              }} 
            />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
