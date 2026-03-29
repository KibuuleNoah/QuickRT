import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import Auth from "@/pages/Auth";

import { TooltipProvider } from "@/components/ui/tooltip";
import UserDashboard from "@/pages/UserDashboard";
const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/user",
    element: <UserDashboard />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </NextThemesProvider>
  </StrictMode>,
);
