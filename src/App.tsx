import React from "react";
import "./App.css";
import Layout from "./Components/Layout";
import { ConnectionsContextProvider } from "./Context/ConnectionsContext";
import { WorkspaceContextProvider } from "./Context/WorkspaceContext";

function App() {
  return (
    <WorkspaceContextProvider>
      <ConnectionsContextProvider>
        <Layout />
      </ConnectionsContextProvider>
    </WorkspaceContextProvider>
  );
}

export default App;
