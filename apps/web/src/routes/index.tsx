import { Navigate, Route, Routes } from 'react-router';
import { App, Auth } from '@src/features';
import { Dashboard } from '@src/features/app/pages';
import { SignIn, SignUp } from '@src/features/auth/pages';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={'auth'} element={<Auth />}>
                <Route index element={<Navigate to="sign-in" />} />
                <Route path={'sign-in'} element={<SignIn />} />
                <Route path={'sign-up'} element={<SignUp />} />
            </Route>

            {/* Protected routes */}
            <Route path={'app'} element={<App />}>
                <Route index element={<Navigate to="dashboard" />} />
                <Route index path={'dashboard'} element={<Dashboard />} />
            </Route>

            {/* Fallback route for unknown routes */}
            <Route path={'*'} element={<Navigate to="/auth/sign-in" />} />
        </Routes>
    );
};

export default AppRoutes;
