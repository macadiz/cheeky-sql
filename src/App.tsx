import Layout from '@/components/Layout';

function App() {
  return (
    <Layout>
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-green-400">
            Welcome to Cheeky SQL
          </h1>
          <p className="text-gray-400 max-w-md">
            Select a connection from the sidebar to get started, or create a new database connection.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default App;
