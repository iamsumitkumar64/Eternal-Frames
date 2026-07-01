import { MiddlewareConsumer, Module, NestModule, OnModuleDestroy, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSourceOptions } from 'typeorm';

// Common Module
import { AuthenticateMiddleware } from './common/infrastruture/middleware/authenticate.middleware';
import { createTransactionalDataSource } from './common/infrastruture/services/typeorm.transactional';
import { RabbitMQCommonModule } from './common/infrastruture/rabbit-mq/rabbit-mq.module';

// User Module
import { userDataSource } from './module/user-module/infrastructure/database/data-source';
import { UserRepository } from './module/user-module/infrastructure/repository/user.repository';
import { JwtHelperService } from './module/user-module/infrastructure/services/jwt.service';
import * as UserCronModule from './module/user-module/infrastructure/cron/cron.module';
import { UserModule } from './module/user-module/feature/user/user.module';

// Billing Module
import { billingDataSource } from './module/billing-module/infrastructure/database/data-source';
import { BillingRabbitMQModule } from './module/billing-module/infrastructure/rabbit-mq/rabbit-mq.module';
import * as BillingCronModule from './module/billing-module/infrastructure/cron/cron.module';

@Module({
  imports: [
    // common
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_REGISTER_SECRET,
      // signOptions: { expiresIn: '60m' },
    }),
    ScheduleModule.forRoot(),
    RabbitMQCommonModule,

    //User Module
    TypeOrmModule.forRootAsync({
      name: process.env.DB_POSTGRES_USER_SCHEMA || 'user_schema',
      useFactory: () => ({
        ...userDataSource.options,
        retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 10,
        retryDelay: Number(process.env.DB_RETRY_DELAY) || 5000,
      }),
      dataSourceFactory: async (options) =>
        createTransactionalDataSource(
          process.env.DB_POSTGRES_USER_SCHEMA || 'user_schema',
          options as DataSourceOptions,
        ),
    }),
    UserCronModule.CronModule,
    UserModule,

    // Billing Module
    TypeOrmModule.forRootAsync({
      name: process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
      useFactory: () => ({
        ...billingDataSource.options,
        retryAttempts: Number(process.env.DB_RETRY_ATTEMPTS) || 10,
        retryDelay: Number(process.env.DB_RETRY_DELAY) || 5000,
      }),
      dataSourceFactory: async (options) =>
        createTransactionalDataSource(
          process.env.DB_POSTGRES_BILLING_SCHEMA || 'billing_schema',
          options as DataSourceOptions,
        ),
    }),
    BillingRabbitMQModule,
    BillingCronModule.CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository, JwtHelperService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticateMiddleware)
      .exclude(
        { path: '/user/login', method: RequestMethod.ALL },
        { path: '/user/register', method: RequestMethod.ALL },
      )
      .forRoutes('/*path');
  }
}