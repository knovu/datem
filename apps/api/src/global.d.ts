import { DeviceInfo } from './@types';
import { User } from './models';

declare global {
    namespace Express {
        interface Request {
            deviceInfo?: DeviceInfo; // Adding the deviceInfo property
            user: User;
        }
    }
}
