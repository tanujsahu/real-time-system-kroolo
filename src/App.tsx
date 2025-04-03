import { ConnectionStatus } from './components/ConnectionStatus';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ConnectionStatus />
      <div className="flex items-center justify-center pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Real-Time Connection Demo</h1>
          <p className="text-gray-600">
            This demo showcases WebSocket connectivity with offline support.
            Try turning off your internet connection to see how it handles offline state.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;