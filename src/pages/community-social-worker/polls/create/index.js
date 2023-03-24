import { useState, useRef } from "react";
import { toast } from 'react-toastify';
import Loader from "components/Loader";
import servicePolls from "services/polls";
import s from "./index.module.scss";

const PollsCreate = () => {
  const [communityName, setCommunityName] = useState("");
  const [communitySize, setCommunitySize] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const inputFileRef = useRef();

  const isButtonDisabled = !communityName || !communitySize || !file;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    servicePolls.create(
      communityName,
      communitySize,
      file
    ).then(() => {
      setCommunityName("");
      setCommunitySize("");
      setFile(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      toast.success("Created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(
      ({ response }) => setErrors(response.data)
    ).finally(
      () => setIsLoading(false)
    );
  }

  const handleChangeInput = (value, handlerKey) => {
    const handlers = {
      communityName: setCommunityName,
      communitySize: setCommunitySize
    };
    handlers[handlerKey](value);
  }

  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (!files) {
      setFile(null);
      return;
    };
    setFile(files[0]);
  }

  return (
    <div className={s["polls-create__form-wrapper"]}>
      <div className="card">
        <div className="card-body">
          <form className={s["polls-create__form"]} onSubmit={handleSubmit}>
            <div className={`form-group ${s["polls-create__form-row"]}`}>
              <label htmlFor="polls-create-form__community-name">Community name</label>
              <input
                type="text"
                className="form-control"
                id="polls-create-form__community-name"
                placeholder="Community name"
                value={communityName}
                onChange={e => handleChangeInput(e.target.value, "communityName")}
              />
            </div>
            <div className={`form-group ${s["polls-create__form-row"]}`}>
              <label htmlFor="polls-create-form__community-size">Community size</label>
              <input
                type="number"
                className="form-control"
                id="polls-create-form__community-size"
                placeholder="Community size"
                value={communitySize}
                onChange={e => handleChangeInput(e.target.value, "communitySize")}
              />
            </div>
            <div className={`form-group ${s["polls-create__form-row"]}`}>
              <label htmlFor="polls-create-form__file">File</label>
              <input
                type="file"
                className="form-control"
                id="polls-create-form__file"
                placeholder="File"
                ref={inputFileRef}
                onChange={handleChangeFile}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${isButtonDisabled ? "disabled" : ""}`}
            >
              Upload
            </button>
            {Object.keys(errors || {}).map(key => (
              <div>
                <p className="text-danger" index={key}>{key}:</p>
                <ul className="text-danger">
                  {errors[key].map(error => (
                    <li index={error.key}>{error.message}</li>
                  ))}
                </ul>
              </div>
            ))}
          </form>
        </div>
      </div>
      <Loader isOpen={isLoading} />
    </div>
  )
}

export default PollsCreate;
