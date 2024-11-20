import { useState } from "react";
import style from "./Counter.module.css";

const Counter = () => {
  const [encounters, setEncounters] = useState(0);

  return (
    <>
      <div className={style.counterContainer}></div>
    </>
  );
};

export default Counter;
