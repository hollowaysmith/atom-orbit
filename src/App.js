import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import range from "lodash/range";
import clamp from "lodash/clamp";
import "./App.css";

const DEFAULT_ATOM_COUNT = 5;

function App() {
  const [noOfAtoms, setNoOfAtoms] = useState(DEFAULT_ATOM_COUNT);
  const [spring, setSpacing] = useSpring(() => ({
    spacing: 360 / noOfAtoms
  }));
  const [spinDirection, setSpinDirection] = useState("clockwise");

  useEffect(() => {
    setSpacing({ spacing: 360 / noOfAtoms });
  }, [noOfAtoms]);

  const atoms = range(noOfAtoms);

  return (
    <>
      <button
        onClick={() => {
          setNoOfAtoms(clamp(noOfAtoms + 1, 1, Number.MAX_SAFE_INTEGER));
        }}
      >
        ADD BALL
      </button>
      <button
        onClick={() => {
          setNoOfAtoms(clamp(noOfAtoms - 1, 1, Number.MAX_SAFE_INTEGER));
        }}
      >
        REMOVE BALL
      </button>
      <br />
      <label>
        Spin:
        <select
          onChange={e => {
            setSpinDirection(e.target.value);
          }}
        >
          <option value="clockwise">Clockwise</option>
          <option value="anticlockwise">Anti-Clockwise</option>
          <option value="static">Static</option>
        </select>
      </label>

      <div className={`App App--${spinDirection}`}>
        {atoms.map((v, i) => {
          return (
            <animated.div
              key={i}
              className="atom"
              style={{
                transform: spring.spacing.interpolate(val => {
                  return `rotate(${val * (i + 1)}deg)`;
                })
              }}
            ></animated.div>
          );
        })}
      </div>
    </>
  );
}

export default App;
