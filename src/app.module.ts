  import { Module } from '@nestjs/common';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { GraphQLModule } from '@nestjs/graphql';
  import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
  import { SequelizeModule } from '@nestjs/sequelize';
  import { getSequelizeConfig } from './config/sequelize.config';
  import { UsersModule } from './users/users.module';
  import { AuthModule } from './auth/auth.module';
  import { TasksModule } from './tasks/tasks.module';
  import {
  ApolloServerPluginLandingPageLocalDefault,
} from "@apollo/server/plugin/landingPage/default";


  @Module({
    imports: [
      ConfigModule.forRoot({ isGlobal: true }),

  GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: true,
  sortSchema: true,
  playground: false,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault(),   // works with Apollo v5
  ],
}),
      SequelizeModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getSequelizeConfig,
      }),

      UsersModule,
      AuthModule,
      TasksModule,
    ],
  })
  export class AppModule {}
