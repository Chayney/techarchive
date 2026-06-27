import { DataSource } from "typeorm";
import { User } from "../../domain/entity/users.entity";

export const UserData = async (dataSource: DataSource) => {
    const userRepository = dataSource.getRepository(User);

    const users = [
        {
            email: "admin@example.com",
            password: "hashed_pw_1",
            is_admin: true,
            is_active: true,
            email_verified_at: new Date("2025-01-01"),
            last_login_at: new Date(),
        },
        {
            email: "test@example.com",
            password: "hashed_pw_2",
            is_admin: false,
            is_active: true,
            email_verified_at: new Date("2025-01-01"),
            last_login_at: new Date(),
        }
    ];

    const entities = userRepository.create(users);
    await userRepository.save(entities);

    console.log("Users seed complete:", await userRepository.find());
};