import { IUserRepository } from "../../../application/interface/IUserRepository";
import { User } from "../../../domain/entities/User";
import { pool } from "./connection";

export class PostgresUserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const result = await pool.query(
      `INSERT INTO users (id, name, email, password, created_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user.id, user.name, user.email, user.password, user.createdAt]
    );

    const created = result.rows[0];

    return new User(
      created.id,
      created.name,
      created.email,
      created.password,
      created.created_at
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.created_at
    );
  }
}