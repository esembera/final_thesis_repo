import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Auth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Footer from "./Components/Shared/Footer";
import { TouchBackend } from "react-dnd-touch-backend";

// const [isMobile, setIsMobile] = useState(false);

// useEffect(() => {
//   let hasTouchScreen = false;
//   if ("maxTouchPoints" in navigator) {
//     hasTouchScreen = navigator.maxTouchPoints > 0;
//   } else if ("msMaxTouchPoints" in navigator) {
//     hasTouchScreen = navigator.msMaxTouchPoints > 0;
//   } else {
//     const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
//     if (mQ && mQ.media === "(pointer:coarse)") {
//       hasTouchScreen = !!mQ.matches;
//     } else if ("orientation" in window) {
//       hasTouchScreen = true; // deprecated, but good fallback
//     } else {
//       // Only as a last resort, fall back to user agent sniffing
//       var UA = navigator.userAgent;
//       hasTouchScreen =
//         /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) || /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
//     }
//   }
//   if (hasTouchScreen) {
//     setIsMobile(true);
//   } else {
//     setIsMobile(false);
//   }
// }, []);

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
        <Footer />
      </DndProvider>

      {/* {isMobile && (
        <DndProvider backend={TouchBackend}>
          <App />
          <Footer />
        </DndProvider>
      )} */}
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
