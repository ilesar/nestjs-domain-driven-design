export interface AccessTokenPayloadInterface {
  username: string;
  id: string;
  iat: number;
  exp: number;
  iss: string;
  role: string;
}
