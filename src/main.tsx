import i18n from "i18next";
import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import App from "./App.tsx";
import "./index.css";
import jaJp from "./locales/ja-JP.json";
import { ISaveRepository } from "./models/save/i-save-repository.ts";
import { SaveRepository } from "./models/save/save-repository.ts";

i18n.use(initReactI18next).init({
  resources: {
    "ja-JP": {
      translation: jaJp,
    },
  },
  lng: "ja-JP",
  fallbackLng: "ja-JP",
  interpolation: {
    escapeValue: false,
  },
});

const saveRepository: ISaveRepository = new SaveRepository();
export const SaveRepositoryContext = createContext(saveRepository);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SaveRepositoryContext.Provider value={saveRepository}>
      <App />
    </SaveRepositoryContext.Provider>
  </StrictMode>
);
