export interface LoginResponseDto {
  refreshToken: string | undefined;
  sessionToken: string | undefined;
  refreshTokenExpires: number | undefined;
  sessionTokenExpires: number | undefined;
}
