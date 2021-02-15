import { DriverType, StorageModuleOptions } from '@codebrew/nestjs-storage';

const storageConfig: StorageModuleOptions = {
  default: 'local',
  disks: {
    local: {
      driver: DriverType.LOCAL,
      config: {
        root: process.cwd(),
      },
    },
  },
};

export = storageConfig;
