import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1 className="auth-title">
          Create Account
        </h1>

        <p className="auth-subtitle">
          Create your Publishly account
        </p>

        <RegisterForm />

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;