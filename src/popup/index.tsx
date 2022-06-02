import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./containers/App";

const root = createRoot(document.getElementById("app-popup") as Element);
root.render(<App />);
