import { useState } from "react";

const Counter = () => {
  const [encounters, setEncounters] = useState(0);

  return (
    <>
      <div className={style.counterContainer}></div>
    </>
  );
};

export default Counter;
