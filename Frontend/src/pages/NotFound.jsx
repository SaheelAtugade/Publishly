import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="page">
        <div className="container not-found">
          <h1>404</h1>

          <h2>Page Not Found</h2>

          <p>
            The page you're looking for doesn't exist.
          </p>

          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;