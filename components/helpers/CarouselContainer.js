import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProjectCard from "../homePage/projectCard";
import { useState } from "react";
export default function CarsouelContainer({ data, component }) {
  const [currentNumber, setCurrentNumber] = useState(3);
  return (
    <>
      <ArrowForwardIosIcon
        onClick={() => {
          currentNumber > 3 && setCurrentNumber(currentNumber - 1);
        }}
      />
      {data?.map((project, index) => {
        if (index >= currentNumber - 3 && index < currentNumber)
          return <ProjectCard item={project} key={project.id} />;
      })}
      <ArrowBackIosIcon
        onClick={() => {
          currentNumber < data.length && setCurrentNumber(currentNumber + 1);
        }}
      />
    </>
  );
}
