import { React, useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charac, setCharac] = useState(false);
  const [password, setPassword] = useState("");
  const ref = useRef(null);

  const copytoclipboard = useCallback(() => {
    ref.current?.select();
    ref.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  }, [setPassword]);

  const generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKL MNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567890";
    if (charac) str += "%^&$#*(){}|!~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, charac, setPassword]);

  useEffect(() => {
    generator();
  }, [length, charac, number, generator]);

  return (
    <div className="w-full max-w-md scale-150 mx-auto py-6 shadow-sm rounded-lg px-4 my-24 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center">Password Generator</h1>
      <div className=" flex shadow rounded overflow-hidden py-4 mb-4">
        <input
          ref={ref}
          className="outline-none rounded w-full py-1 px-4"
          type="text"
          value={password}
          placeholder="Password"
          readOnly
        />
        <button
          className="bg-blue-800 px-3 py-2 rounded-none"
          onClick={copytoclipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex gap-4 ">
        <div>
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="range">Length({length})</label>
        </div>

        <div>
          <input type="checkbox" onChange={(e) => setNumber((prev) => !prev)} />
          <label>Numbers</label>
        </div>

        <div>
          <input type="checkbox" onChange={(e) => setCharac((prev) => !prev)} />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
