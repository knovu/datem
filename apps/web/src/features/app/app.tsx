import { Layout } from '@src/components';
import { AuthProvider } from '@src/providers';

const App = () => {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
};

export default App;
