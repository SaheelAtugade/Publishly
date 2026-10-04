const ConfirmationBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-box">

        <h3>Confirm Delete</h3>

        <p>{message}</p>

        <div className="confirmation-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={()=> onConfirm()}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationBox;