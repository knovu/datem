import { App, Auth } from '@src/features';
import SignIn from '@src/features/auth/pages/sign-in/sign-in';
import SignUp from '@src/features/auth/pages/sign-up/sign-up';
import { Navigate, Route, Routes } from 'react-router';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path={'auth'} element={<Auth />}>
                <Route path={'sign-in'} element={<SignIn />} />
                <Route path={'sign-up'} element={<SignUp />} />
            </Route>

            {/* Protected routes */}
            <Route path={'app'} element={<App />}></Route>

            {/* Fallback route for unknown routes */}
            <Route path={'*'} element={<Navigate to="/auth/sign-in" />} />
        </Routes>
    );
};

export default AppRoutes;
