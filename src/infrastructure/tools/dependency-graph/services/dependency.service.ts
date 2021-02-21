import { INestApplication } from '@nestjs/common';
import { ModulesContainer } from '@nestjs/core';
import { Module } from '@nestjs/core/injector/module';
import { TreeModel } from '@infrastructure/tools/dependency-graph/model/tree.model';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalCoreModule } from '@nestjs/core/injector/internal-core-module';
import { CoreModule } from '../../../../core/core.module';

export class DependencyService {
  private applicationModule: Module;

  private ignoredModules: string[] = [
    ConfigModule.name,
    TypeOrmModule.name,
    InternalCoreModule.name,
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
    return {
      name: module.metatype.name,
      // type: nodeType,
      children: filteredImportedModules.map((module: Module) =>
        this.buildTree(module),
      ),
    };
  }

  private cleanIgnoredImportedModules(importedModules: Module[]) {
    return importedModules.filter((importedModule: Module) => {
      this.ignoredModules.find(
        (ignoredModuleName: string) =>
          ignoredModuleName !== importedModule.metatype.name,
      );
    });
  }

  private cleanIgnoredRootNodes(tree: TreeModel) {
    tree.children = tree.children.filter((childNode: TreeModel) =>
      this.ignoredModules.find(
        (ignoredModuleName: string) => ignoredModuleName !== childNode.name,
      ),
    );
  }
}
