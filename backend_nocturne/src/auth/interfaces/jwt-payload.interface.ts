// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  sub: number;
  role?: 'empleado' | 'cliente';
  iat?: number;
  exp?: number;
}
