import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedEmailsMiddleware } from './common/middleware/used-emails.middleware';
import { UsersController } from './users/users.controller';
import { ProjectsModule } from './projects/projects.module';
import { KeysModule } from './keys/keys.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    KeysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsedEmailsMiddleware).forRoutes(UsersController);
  }
}
