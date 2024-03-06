import { TypeOrmModuleOptions } from '@nestjs/typeorm';

console.log(process.env.DB_NAME);

const ormconfig: TypeOrmModuleOptions = {

  type: "postgres",
  host: 'host.docker.internal',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default ormconfig;