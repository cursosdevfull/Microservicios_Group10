export interface MySQLConfig {
    host: string;
    port: number;
    entities: string[];
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
    poolSize: number;
    maxQueryExecutionTime: number;
}