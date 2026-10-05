import {Channel} from "amqplib"
import { PostgresUserRepository } from "../database/postgresql/postgres-user.repository"

import { UserConsumer } from "../rabbitmq/user.consumer"

const postgresUserRepository =new PostgresUserRepository()

export function createWorkerContainer(channel:Channel){
    const userConsumer = new UserConsumer(channel,postgresUserRepository)
    return {
        userConsumer
    }
}