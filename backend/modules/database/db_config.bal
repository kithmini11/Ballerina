import ballerina/sql;
import ballerinax/postgresql;

configurable string dbHost = "localhost";
configurable int dbPort = 5432;
configurable string dbUser = "postgres";
configurable string dbPassword = "your_password";
configurable string dbName = "dentix_db";

postgresql:Client dbClient = check new (dbHost, dbUser, dbPassword, dbName, dbPort);