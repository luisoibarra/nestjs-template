export interface TokenPayloadDto {
  // Common JWT Claims

  // Identifies the subject of the JWT. This is usually the user ID.
  sub: string;
  // Identifies the expiration time on or after which the JWT must not be accepted for processing.
  exp?: number;
  // Identifies the time before which the JWT must not be accepted for processing.
  nbf?: number;
  // Identifies the time at which the JWT was issued.
  iat?: number;
  // Identifies the principal that issued the JWT.
  iss?: string | undefined;
  // Identifies the recipients that the JWT is intended for.
  aud?: string | undefined;

  // Custom Common Claims
  email?: string;
  refresh: boolean; // If is refresh token
}
