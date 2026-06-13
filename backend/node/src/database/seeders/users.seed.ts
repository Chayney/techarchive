import { DataSource } from "typeorm";
import { User } from "../../domain/entity/users.entity";

export const UserData = async (dataSource: DataSource) => {
    const userRepository = dataSource.getRepository(User);

    const users = [
        {
            email: "taro@example.com",
            password: "hashed_pw_1",
            is_admin: true,
            is_active: true,
            email_verified_at: new Date("2025-01-01"),
            last_login_at: new Date(),
        },
        {
            email: "hanako@example.com",
            password: "hashed_pw_2",
            is_admin: false,
            is_active: true,
        },
        {
            email: "john@example.com",
            password: "hashed_pw_3",
            is_admin: false,
            is_active: true,
        },
        {
            email: "sara@example.com",
            password: "hashed_pw_4",
            is_admin: false,
            is_active: true,
        },
        {
            email: "mike@example.com",
            password: "hashed_pw_5",
            is_admin: false,
            is_active: false,
        },
    ];

    const entities = userRepository.create(users);
    await userRepository.save(entities);

    console.log("Users seed complete:", await userRepository.find());
};