import AppRoutes from "./routes/AppRoutes";
import { IdeaProvider } from "./context/IdeaContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <IdeaProvider>
        <AppRoutes />
      </IdeaProvider>
    </LanguageProvider>
  );
}

export default App;
