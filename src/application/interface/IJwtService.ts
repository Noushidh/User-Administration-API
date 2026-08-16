export interface IJwtService {
  generateToken(payload: { id: string; name: string; email: string }): string;

  verifyToken(token: string): {
    id: string;
    name: string;
    email: string;
  };
}
