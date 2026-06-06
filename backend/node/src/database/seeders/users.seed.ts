import { DataSource } from "typeorm";
import { User } from "../../domain/entity/users.entity";

export const UserData = async (dataSource: DataSource) => {
    const userRepository = dataSource.getRepository(User);

    const users = [
        {
            email: "taro@example.com",
            password: "hashed_pw_1",
            isAdmin: true,
            isActive: true,
            emailVerifiedAt: new Date("2025-01-01"),
            lastLoginAt: new Date(),
        },
        {
            email: "hanako@example.com",
            password: "hashed_pw_2",
            isAdmin: false,
            isActive: true,
        },
        {
            email: "john@example.com",
            password: "hashed_pw_3",
            isAdmin: false,
            isActive: true,
        },
        {
            email: "sara@example.com",
            password: "hashed_pw_4",
            isAdmin: false,
            isActive: true,
        },
        {
            email: "mike@example.com",
            password: "hashed_pw_5",
            isAdmin: false,
            isActive: false,
        },
    ];

    const entities = userRepository.create(users);
    await userRepository.save(entities);

    console.log("Users seed complete:", await userRepository.find());
};