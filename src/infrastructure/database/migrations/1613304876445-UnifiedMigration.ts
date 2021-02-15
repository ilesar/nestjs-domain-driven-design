import {MigrationInterface, QueryRunner} from "typeorm";

export class UnifiedMigration1613304876445 implements MigrationInterface {
    name = 'UnifiedMigration1613304876445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `todo_items` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `completed` tinyint NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `todo_items`");
    }

}
