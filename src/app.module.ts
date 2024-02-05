import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './typeorm/entities/user.entity';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './core/interceptors/response';
import { TodoModule } from './features/todo/todo.module';
import { TodoEntity } from './typeorm/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        database: configService.get('USER_DATABASE'),
        host: configService.get('USER_HOST'),
        port: +configService.get('USER_PORT'),
        username: configService.get('USER_NAME'),
        password: configService.get('USER_PASSWORD'),
        entities: [UserEntity, TodoEntity],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get('secrets.jwt');
        return { secret, signOptions: { expiresIn: '3600s' } };
      },
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
