import { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { LanguageContext } from "../context/LanguageContext";

const About = () => {
  const { t } = useContext(LanguageContext);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">
        {t.about.title}
      </h1>

      <p className="mt-4">
        {t.about.text}
      </p>
    </MainLayout>
  );
};

export default About;
