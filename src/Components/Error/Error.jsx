import "./styles.scss";

function Error() {
    return (
      <div className="error-container">
        <h1 className="title-error">505</h1>
        <span className="error-details ">Something went wrong</span>
        <span>Sorry, an unexpected error occurred. Please try again later</span>
      </div>
    );
  }

export default Error;
