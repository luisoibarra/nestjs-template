import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvConfig {
  @IsEnum(Environment)
  env: Environment;

  @IsString()
  @IsNotEmpty()
  version: string;
}
