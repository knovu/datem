import { AuthLayout } from '@src/components';
import Register from '@src/features/auth/pages/register/register';
import SignIn from '@src/features/auth/pages/sign-in/sign-in';
import { Navigate, Route, Routes } from 'react-router';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'auth'} element={<AuthLayout />}>
                <Route path={'sign-in'} element={<SignIn />} />
                <Route path={'register'} element={<Register />} />
            </Route>
            <Route path={'*'} element={<Navigate to="/auth/sign-in" />} />
        </Routes>
    );
};

export default AppRoutes;
