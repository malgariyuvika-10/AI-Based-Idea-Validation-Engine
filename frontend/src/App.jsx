import AppRoutes from "./routes/AppRoutes";
import { IdeaProvider } from "./context/IdeaContext";

function App() {
  return (
    <IdeaProvider>
      <AppRoutes />
    </IdeaProvider>
  );
}

export default App;