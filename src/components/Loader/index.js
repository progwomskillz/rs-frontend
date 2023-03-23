import ReactDOM from "react-dom";
import s from "./index.module.scss";

const Loader = ({isOpen = false}) => {
  if (!isOpen) {
    return <></>
  }

  return ReactDOM.createPortal(
    <div className={s["loader"]}>
      <div className="spinner-border text-primary"></div>
    </div>,
    document.querySelector("#loader-root")
  )
}

export default Loader;
