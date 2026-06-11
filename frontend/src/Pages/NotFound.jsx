import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="my-4">
        Page not found
      </p>

      <Link
        to="/"
        className="text-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;