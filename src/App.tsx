import React from "react";
import Layout from "./Components/Layout";
import { ApplcationContextProvider } from "./Context/ApplicationContext";
import { ConnectionsContextProvider } from "./Context/ConnectionsContext";
import { WorkspaceContextProvider } from "./Context/WorkspaceContext";

function App() {
  return (
    <ApplcationContextProvider>
      <WorkspaceContextProvider>
        <ConnectionsContextProvider>
          <Layout />
        </ConnectionsContextProvider>
      </WorkspaceContextProvider>
    </ApplcationContextProvider>
  );
}

export default App;
