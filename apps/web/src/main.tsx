import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';
import { GraphQLProvider } from './providers';

// Custom fonts
import '@fontsource-variable/outfit/index.css';

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
