import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const root = createRoot(document.getElementById("app-options") as Element);
root.render(<App />);
