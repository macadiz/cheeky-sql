import React from "react";
import Layout from "./Components/Layout";
import { ApplcationContextProvider } from "./Context/ApplicationContext";
import { ConnectionsContextProvider } from "./Context/ConnectionsContext";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { WorkspaceContextProvider } from "./Context/WorkspaceContext";

function App() {
  return (
    <ApplcationContextProvider>
      <WorkspaceContextProvider>
        <ConnectionsContextProvider>
          <ThemeContextProvider>
            <Layout />
          </ThemeContextProvider>
        </ConnectionsContextProvider>
      </WorkspaceContextProvider>
    </ApplcationContextProvider>
  );
}

export default App;
