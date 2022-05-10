import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Audio } from "react-loader-spinner";
import { Rings } from "react-loader-spinner";

function SpinnerRing({ sty }) {
  return (
    <div className={`flex-center ${sty}`} style={{ height: "60vh" }}>
      <Rings color="#c9a209" height={200} width={200} ariaLabel="Loading" />
    </div>
  );
}
export default SpinnerRing;
