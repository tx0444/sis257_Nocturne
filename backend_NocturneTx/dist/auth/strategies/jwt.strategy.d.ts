import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: {
        sub: number;
        email: string;
        rol?: string;
    }): Promise<{
        userId: number;
        email: string;
        rol: string;
    }>;
}
export {};
