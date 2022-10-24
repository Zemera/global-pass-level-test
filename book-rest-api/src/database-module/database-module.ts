import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmModule } from "@nestjs/typeorm";


@Module({})

export class DatabaseModule {
    static regiterTypeOrm(options: TypeOrmModuleOptions): DynamicModule {
        console.log(options);
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRoot(options)
            ],
            providers: []
        }
    }
}