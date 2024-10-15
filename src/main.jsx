import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "./fonts.css";

import { ExperienceProvider } from "./context/ExperienceProvider.jsx";
import { EducationProvider } from "./context/EducationProvider.jsx";
import { FeedbackProvider } from "./context/FeedbackProvider.jsx";
import { ProjectProvider } from "./context/ProjectsProvider.jsx";

import Dashboard from "./dashboard/Dashboard.jsx";
import Login from "./dashboard/components/Login.jsx";
import Register from "./dashboard/components/Register";
import Portfolio from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ExperienceProvider>
      <EducationProvider>
        <FeedbackProvider>
          <ProjectProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </BrowserRouter>
          </ProjectProvider>
        </FeedbackProvider>
      </EducationProvider>
    </ExperienceProvider>
  </StrictMode>
);
