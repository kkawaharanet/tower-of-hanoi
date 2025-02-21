import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ISaveRepository } from "./models/save/i-save-repository.ts";
import { SaveRepository } from "./models/save/save-repository.ts";

const saveRepository: ISaveRepository = new SaveRepository();
export const SaveRepositoryContext = createContext(saveRepository);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SaveRepositoryContext.Provider value={saveRepository}>
      <App />
    </SaveRepositoryContext.Provider>
  </StrictMode>
);
