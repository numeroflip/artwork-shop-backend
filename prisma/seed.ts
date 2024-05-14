import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { User } from "@prisma/client";

const usersData: Omit<User, "id">[] = [
  {
    email: "user1@email.com",
  },
  {
    email: "user2@email.com",
  },
];

const main = async () => {
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
