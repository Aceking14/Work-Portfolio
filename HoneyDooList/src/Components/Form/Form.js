import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import './Form.scss';

function Form({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmission = (event) => {
    event.preventDefault();

    // Validate the user input.
    if (description === '') {
      setErrorMessage('Enter a description.');
    }
    else {

      // Add the task.
      onAddTask(description, status);

      // Reset the form state.
      setDescription('')
      setStatus(false);
      setErrorMessage('');
    }
  }

  return (
    <form className='form-component' onSubmit={handleFormSubmission}>
      <h2>Add a new task:</h2>

      <div className='content'>
        {/* Conditional render of the error message */}
        {errorMessage !== '' && (
          <div className='error-message'>{errorMessage}</div>
        )}

        {/* Description Field */}
        <label>
          <span>Description:</span>
          <input
            type='text'
            maxLength={150}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        {/* Status Field */}
        <label>
          <span>Status:</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value={false}>Open</option>
            <option value={true}>Completed</option>
          </select>
        </label>

        {/* Submission Button */}
        <button>
          <IoMdAddCircle /> Add
        </button>
      </div>
    </form>
  );
}

export default Form;