import { useState, useRef } from "react";
import { categories } from "../../includes/variables";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/postSlice";

import * as database from "../../database";

export default function Form({}) {

  // Customer Info States
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [jobType, setJobType] = useState("");
  const [paid, setPaid] = useState("");
  const [picture, setPicture] = useState("");

  //Message States
  const [errorMessages, setErrorMessages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  const inputFile = useRef();
  // Functions
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //hide success message
    setShowSuccess(false);

    console.log("Form Sent!");

    const validate = [];

    if (title.length < 5) {
      validate.push("The title needs to be at least 5 characters");
    }
    if ( address === "") {
      validate.push("The Address is required. ");
    }
    if (jobType === "") {
      validate.push("Please, select a Job Type.");
    }

    setErrorMessages(validate);
    if (validate.length === 0) {
      setIsSaving(true);

      //Upload the Picture
      const file = inputFile.current.files[0];
      const pictureUrl = await database.uploadPicture(file);
      if(pictureUrl){

      // Valid Data
      const data = {
        title: title,
        address: address,
        jobType:jobType,
        paid:paid,
        picture: pictureUrl,
      };

      const savedId = await database.save(data);
      setIsSaving(false);

      if (savedId) {
        data.id = savedId;
        database.save(data);
        dispatch(addPost(data));

        //Display Success Message
        setShowSuccess(true);

        //Clear the Form
        setTitle("");
        setAddress("");
        setJobType("");
        setPaid(true);
        setPicture("");
        if (inputFile.current) {
          inputFile.current.value = "";
        }
      }else {
        setErrorMessages(['Failed to save data']);
      }
    }else {
      setErrorMessages(['Failed to upload picture'])
    }

      //Hide the saving Message.
      setIsSaving(false);
    }
  }

  const handlePictureSelection = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setPicture(event.target.result);
    };
  };

  if (isSaving) {
    return (
      <div>Saving...</div>
    );
  }

  return (
    <form className="form-component" onSubmit={handleFormSubmit}>
      {showSuccess && (
        <div className="success-message">Form Successfully Submitted!</div>
      )}

      {/* Displaying Error Message */}
      {errorMessages.length > 0 && (
        <div className="form-validate">
          Invalid data:
          <ul>
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Title Form Input */}
      <div>
        <label>
          Customer Last Name:
          <input
            type="text"
            id="titleInput"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            maxLength={50}
            placeholder="Enter Customer Last Name Here"
          />
        </label>
      </div>

      {/* Textarea Form Input */}
      <div>
        <label>
          Address:
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Customer Address"
            maxLength={500}
          />
        </label>
      </div>

      {/* Service Type Field */}
      <div>
        <label>
          {" "}
          Service Type:
          <select
            value={jobType}
            onChange={(event) => setJobType(event.target.value)}
          >
            <option value="">-Select-</option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.text}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Payment Recieved Field */}
      <div className="promote-field">
        <label>
          <input
            type="checkbox"
            checked={paid}
            onChange={(event) => setPaid(event.target.checked)}
          />
          Payment Recieved
        </label>
      </div>

      {/* Picture Field */}
      <fieldset>
        <legend>Picture of Front House: | Try Including House Number in Picture</legend>
        <label>
          Select an image
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePictureSelection}
            ref={inputFile}
          />
        </label>
        {picture !== "" && <img width={200} src={picture} alt="Preview" />}
      </fieldset>

      <button>Send</button>
    </form>
  );
}
