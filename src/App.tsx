import React from "react";
import "./App.css";
import Layout from "./Components/Layout";
import { ConnectionsContextProvider } from "./Context/ConnectionsContext";

function App() {
  return (
    <ConnectionsContextProvider>
      <Layout />
    </ConnectionsContextProvider>
  );
}

export default App;
