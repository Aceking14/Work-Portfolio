import { useState, useRef } from "react";
import { categories, statuses } from "../../includes/variables";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/postSlice";

import * as database from "../../database";

export default function Form({}) {
  // States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [promote, setPromote] = useState("");
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState("");
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
    if (description === "") {
      validate.push("The description is required. ");
    }
    if (category === "") {
      validate.push("Please, select a category.");
    }
    if (status === "") {
      validate.push("Please select a status.");
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
        description: description,
        category: category,
        promote: promote,
        status: status,
        picture: pictureUrl,
        likes: 0,
        dislikes: 0,
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
        setDescription("");
        setCategory("");
        setStatus("");
        setPromote(true);
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
          Title:
          <input
            type="text"
            id="titleInput"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            maxLength={50}
            placeholder="Enter Title Here"
          />
        </label>
      </div>
      {/* Textarea Form Input */}
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe Your Post"
            maxLength={500}
          />
        </label>
      </div>
      {/* Category Field */}
      <div>
        <label>
          {" "}
          Category:
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
      {/* Promote Field */}
      <div className="promote-field">
        <label>
          <input
            type="checkbox"
            checked={promote}
            onChange={(event) => setPromote(event.target.checked)}
          />
          Promote
        </label>
      </div>
      {/* Status Field (Draft, Published, Archived) */}
      <div className="status-field">
        Status:
        {statuses.map((item) => (
          <label key={item.id}>
            <input
              type="radio"
              value={item.id}
              checked={status === item.id}
              onChange={(event) => setStatus(event.target.value)}
            />
            {item.text}
          </label>
        ))}
      </div>

      {/* Picture Field */}

      <fieldset>
        <legend>Picture:</legend>
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
