import { AuthLayout } from '@src/components';
import Register from '@src/features/auth/pages/register/register';
import SignIn from '@src/features/auth/pages/sign-in/sign-in';
import { Route, Routes } from 'react-router';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<AuthLayout />}>
                <Route path={'sign-in'} element={<SignIn />} />
                <Route path={'register'} element={<Register />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
