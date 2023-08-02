import styled from "styled-components";
import { motion } from "framer-motion";

const MotionStyledDiv = styled(motion.div)`
  background-color: red;
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

export default function Motion() {
  return (
    <>
      <MotionStyledDiv
        transition={{ type: "spring" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotateZ: 360 }}
      />
    </>
  );
}
