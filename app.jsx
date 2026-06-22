import { useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const checkPrime = () => {
    const num = parseInt(number);

    if (isNaN(num)) {
      setResult("Please enter a valid number!");
      return;
    }

    if (num < 2) {
      setResult(`${num} is NOT a Prime Number ❌`);
      return;
    }

    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    setResult(
      isPrime
        ? `${num} is a Prime Number ✅`
        : `${num} is NOT a Prime Number ❌`
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Prime Number Checker</h1>

      <input
        type="number"
        placeholder="Enter a number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button onClick={checkPrime}>Check</button>

      <h2>{result}</h2>
    </div>
  );
}

export default App;