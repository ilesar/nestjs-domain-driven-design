import { INestApplication } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
import { TreeModel } from '@infrastructure/tools/dependency-graph/model/tree.model';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalCoreModule } from '@nestjs/core/injector/internal-core-module';
import { ConfigHostModule } from '@nestjs/config/dist/config-host.module';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { MailerCoreModule } from '@nestjs-modules/mailer/dist/mailer-core.module';
import { StorageCoreModule } from '@codebrew/nestjs-storage/dist/storage-core.module';
import { ScheduleModule } from 'nest-schedule';

export class DependencyService {
  private readonly applicationModule: Module;

  private ignoredModules: string[] = [
    ConfigModule.name,
    TypeOrmModule.name,
    InternalCoreModule.name,
    ConfigHostModule.name,
    TypeOrmCoreModule.name,
    MailerCoreModule.name,
    StorageCoreModule.name,
    ScheduleModule.name,
  ];

  constructor(
    private readonly application: INestApplication,
    appModuleName: string,
  ) {
    const container = this.application.get(ModulesContainer);
    const moduleWrappers = Array.from(container.values());
    this.applicationModule = moduleWrappers.find(
      (moduleWrapper) => moduleWrapper.metatype.name === appModuleName,
    );

    if (this.applicationModule === undefined) {
      throw Error(`${appModuleName} is not found`);
    }
  }

  generateDependencyTree(): TreeModel {
    return this.buildTree(this.applicationModule);
  }

  private buildTree(module: Module): TreeModel {
    const importedModules = Array.from(module.imports);
    const filteredImportedModules = this.removeIgnoredModulesFromPool(
      importedModules,
    );

    const tree = new TreeModel();
    tree.name = module.metatype.name;
    tree.children = filteredImportedModules.map((module: Module) =>
      this.buildTree(module),
    );

    return tree;
  }

  private removeIgnoredModulesFromPool(importedModules: Module[]) {
    return importedModules.filter((importedModule: Module) => {
      return !this.ignoredModules.find(
        (ignoredModuleName: string) =>
          ignoredModuleName === importedModule.metatype.name,
      );
    });
  }
}
