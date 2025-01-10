import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';
import AppRoutes from './routes';

// Custom fonts
import '@fontsource-variable/outfit/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    </StrictMode>,
);
