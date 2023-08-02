import { useRef, useEffect } from "react";
import { useState } from "react";
import Star2 from "./Star2";

export default function StarMe({ starShape, starColor }) {
  const starMeRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (starMeRef.current) {
      const { left, top } = starMeRef.current.getBoundingClientRect();
      setX(left);
      setY(top);
    }
  }, []);

  return (
    <>
      <Star2 starColor={starColor} />
    </>
  );
}
