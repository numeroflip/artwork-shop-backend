import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import type { User } from "@prisma/client";

const DEFAULT_UNSAFE_PASSWORD = "password";
const saltRounds = 10;

const main = async () => {
  const passwordHash = await bcrypt.hash(DEFAULT_UNSAFE_PASSWORD, saltRounds);

  const usersData: Omit<User, "id">[] = [
    {
      email: "user1@email.com",
      password: passwordHash,
    },
    {
      email: "user2@email.com",
      password: passwordHash,
    },
  ];
  console.log("start seeding …");
  for (const _user of usersData) {
    const user = await prisma.user.create({
      data: _user,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log("seeding done");
};

main()
  .catch((e) => {
    console.error("error", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
