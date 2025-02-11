import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import { GraphQLProvider, tokenStorage } from './providers';

// Custom fonts
import '@fontsource-variable/outfit/index.css';

// Initializes the local token storage
tokenStorage.init();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <GraphQLProvider>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </GraphQLProvider>
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>,
);
