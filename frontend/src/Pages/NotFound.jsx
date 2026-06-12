import { useContext } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { LanguageContext } from "../context/LanguageContext";

const NotFound = () => {
  const { t } = useContext(LanguageContext);

  return (
    <MainLayout>
      <div className="text-center p-10">
        <h1 className="text-6xl font-bold">404</h1>

        <p className="my-4">
          {t.notFound.page}
        </p>

        <Link
          to="/"
          className="text-blue-600"
        >
          {t.notFound.goHome}
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
