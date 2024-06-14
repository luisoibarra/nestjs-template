export interface LoginResponseDto {
  refreshToken?: string | undefined;
  sessionToken?: string | undefined;
  refreshTokenExpires?: Date | undefined;
  sessionTokenExpires?: Date | undefined;
}
