import { Field, ObjectType } from '@nestjs/graphql';
import { RefreshTokenDto } from '@api/base/outputs/refresh-token.dto';

@ObjectType('AccessToken')
export class AccessTokenDto {
  @Field()
  token: string;
  @Field()
  expiresIn: number;
  @Field()
  refreshToken: RefreshTokenDto;
}
