import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { AccessTokenModel } from '@application/auth/models/access-token.model';
import { AccessTokenDto } from '@api/base/outputs/access-token.dto';

@Injectable()
export class AccessTokenProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(AccessTokenModel, AccessTokenDto);
    };
  }
}
