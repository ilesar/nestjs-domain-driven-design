import { INestApplication } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
import { TreeModel } from '@infrastructure/tools/dependency-graph/model/tree.model';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalCoreModule } from '@nestjs/core/injector/internal-core-module';
import { CoreModule } from '../../../../core/core.module';
import { ConfigHostModule } from '@nestjs/config/dist/config-host.module';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import { MailerCoreModule } from '@nestjs-modules/mailer/dist/mailer-core.module';
import { StorageCoreModule } from '@codebrew/nestjs-storage/dist/storage-core.module';
import { ScheduleModule } from 'nest-schedule';

export class DependencyService {
  private applicationModule: Module;

  private ignoredRootModules: string[] = [];

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

  constructor(private readonly application: INestApplication) {
    const container = this.application.get(ModulesContainer);
    const moduleWrappers = Array.from(container.values());
    this.applicationModule = moduleWrappers.find(
      (moduleWrapper) => moduleWrapper.metatype.name === CoreModule.name,
    );

    if (this.applicationModule === undefined) {
      throw Error('Core module missing');
    }
  }

  generateDependencyTree(): TreeModel {
    const tree = this.buildTree(this.applicationModule);
    this.cleanIgnoredRootNodes(tree);

    return tree;
  }

  private buildTree(module: Module): TreeModel {
    const importedModules = Array.from(module.imports);
    const filteredImportedModules = this.cleanIgnoredImportedModules(
      importedModules,
    );

    const tree = new TreeModel();
    tree.name = module.metatype.name;
    tree.children = filteredImportedModules.map((module: Module) =>
      this.buildTree(module),
    );

    return tree;
  }

  private cleanIgnoredImportedModules(importedModules: Module[]) {
    return importedModules.filter((importedModule: Module) => {
      return !this.ignoredModules.find(
        (ignoredModuleName: string) =>
          ignoredModuleName === importedModule.metatype.name,
      );
    });
  }

  private cleanIgnoredRootNodes(tree: TreeModel) {
    tree.children = tree.children.filter((childNode: TreeModel) => {
      return !this.ignoredRootModules.find(
        (ignoredModuleName: string) => ignoredModuleName === childNode.name,
      );
    });
  }
}
