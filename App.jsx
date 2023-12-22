import { AuthProvider } from './context/AuthProvider';
import Root from './Root';

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};

export default App;
