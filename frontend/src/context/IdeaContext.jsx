import { createContext, useState } from "react";

export const IdeaContext = createContext();

export const IdeaProvider = ({ children }) => {
  const [idea, setIdea] = useState("");

  return (
    <IdeaContext.Provider value={{ idea, setIdea }}>
      {children}
    </IdeaContext.Provider>
  );
};