import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TechnologyModule } from './technology/technology.module';
import { ProjectListingModule } from './project-listing/project-listing.module';
import { SeedController } from './seed/seed.controller';
import { ProjectListingSeedService } from './seed/seed';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }),
  TypeOrmModule.forRootAsync(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      })
    }), UserModule, AuthModule, TechnologyModule, ProjectListingModule, SeedModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {


}
