import { useState } from "react";

function App() {
  const [Eps, setEps] = useState(3);
  const [A, setA] = useState(3);
  const [B, setB] = useState(3);
  const [N, setN] = useState(1000);
  const [rectR, setRectR] = useState(0);
  const [trapR, setTrapR] = useState(0);
  const [simpsonR, setSimpsonR] = useState(0);
  const [rectR2, setRectR2] = useState(0);
  const [trapR2, setTrapR2] = useState(0);
  const [simpsonR2, setSimpsonR2] = useState(0);
  const [mistake, setMistake] = useState([]);
  //----------------funcs------------------
  function Func(x) {
    return Math.atan(x);
  }
  function Integral(x, y) {
    return -Math.log2(Math.abs(Math.cos(y))) -  -Math.log2(Math.abs(Math.cos(x)));
  }
  //----------------figures------------------
  function Rect(B, A, N) {
    let h = (B - A) / N;
    let sum = 0;
    let x = A + h / 2;
    for (let i = 0; i < N; i++)
    {
      sum += Func(x);
      x += h;
    }
    return sum * h;
  }
  function Simpson(B, A, N) {
    let h = (B - A) / N;
    let s = (Func(A) + Func(B)) / 2;
    for (let i = 1; i <= N - 1; i++)
    {
      let xk = A + h * i;
      let xk1 = A + h * (i - 1);
      s += Func(xk) + 2 * Func((xk1 + xk) / 2);
    }
    let x = A + h * N;
    let x1 = A + h * (N - 1);
    s += 2 * Func((x1 + x) / 2);
    return s * h / 3;
  }
  function Trapeze(B, A, N) {
    let h = (B - A) / N;
    let sum = 0;
    for (let i = 0; i <= N; i++)
    {
      sum += Func(A + h / 2 + i * h) * h;
    }
    return sum;
  }
  //----------------mistake figures------------------
  function MistakeRect() {
    return Math.abs(Math.abs(Rect(B, A, N)) - Math.abs(Integral(B, A)));
  }
  function MistakeTrap() {
    return Math.abs(Trapeze(B, A, N) - Integral(B, A));
  }
  function MistakeSimp() {
    return Math.abs(Math.abs(Simpson(B, A, N) - Math.abs(Integral(B, A))));
  }
  //----------------buttons------------------
  function RectButt() {
    setRectR(Rect(B, A, N));
    let i = 1;
    let diff;
    do
    {
      i++;
      diff = Math.abs(Rect(B, A, i) - Rect(B, A, i + 1));
    }
    while (diff > Eps);
    setRectR2(Rect(B, A, i + 1));
  }

  function TrapButt() {
    setTrapR(Trapeze(B, A, N));
    let i = 0;
    let diff;
    do
    {
      i++;
      diff = Math.abs(Trapeze(B, A, i) - Trapeze(B, A, i + 1));
    }
    while (diff > Eps);
    setTrapR2(Trapeze(B, A, i + 1));
  }

  function SimpsonButt() {
    setSimpsonR(Simpson(B, A, N));
    let i = 0;
    let diff;
    do
    {
      i++;
      diff = Math.abs(Simpson(B, A, i) - Simpson(B, A, i + 1));
    }
    while (diff > Eps);
    setSimpsonR2(Simpson(B, A, i + 1));
  }

  function CheckMistakeButt() {
    setMistake([`Rect Result = ${rectR}; Integral Result = ${Integral(B, A)}; Mistake = ${MistakeRect()}`
    , `Trap Result = ${trapR}; Integral Result = ${Integral(B, A)}; Mistake = ${MistakeTrap()}`, `Simpson Result = ${simpsonR}; Integral Result = ${Integral(B, A)}; Mistake = ${MistakeSimp()}`]);
  }
  return (
    <div className="App">
      <div>
        <input onChange={(e)=>setEps(+e.target.value)} placeholder="ВВЕДІТЬ Eps"/>
        <input onChange={(e)=>setA(+e.target.value)} placeholder="ВВЕДІТЬ A"/>
        <input onChange={(e)=>setB(+e.target.value)} placeholder="ВВЕДІТЬ B"/>
        <input onChange={(e)=>setN(+e.target.value)} placeholder="ВВЕДІТЬ N"/>
      </div>
      <div>
        <button onClick={()=> RectButt()}>Reactangle</button>
        <button onClick={()=> TrapButt()}>Trap</button>
        <button onClick={()=> SimpsonButt()}>Simpson</button>
        <button onClick={()=> CheckMistakeButt()}>Compare</button>
      </div>
      <div>
        Rect = {rectR}
      </div>
      <div>
        Trap = {trapR}
      </div>
      <div>
        Simpson = {simpsonR}
      </div>
      <hr />
      <div>
        Rect Double = {rectR2}
      </div>
      <div>
        Trap Double = {trapR2}
      </div>
      <div>
        Simpson Double = {simpsonR2}
      </div>
      <hr />
      <div style={{display: "flex", flexDirection: "column"}}>
        {mistake}
      </div>
    </div>
  );
}

export default App;
