import { AppModule } from './app.module';
import { config } from 'dotenv';

import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { UsersResolver } from './users/users.resolver';
import * as fs from 'fs';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  const result = config();
  if (result.error) {
    throw result.error;
  }
  await app.listen(process.env.PORT || 3000);

  // const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  // await app.init();

  // const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  // const schema = await gqlSchemaFactory.create([UsersResolver]);
  // const printedSchema = printSchema(schema);

  // fs.writeFileSync(
  //   __dirname + '/../../aaalq-app/schema.graphql',
  //   printedSchema,
  // );
}
bootstrap();
