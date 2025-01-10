import { Controller, Get } from '@nestjs/common';
import { DeviceInfo } from './@types';
import { Device } from './decorators';

@Controller()
export class AppController {
    constructor() {}

    @Get('device')
    public getDeviceInfo(@Device() device: DeviceInfo): DeviceInfo | undefined {
        return device;
    }
}
