import { z } from "zod";
import prisma from "./prisma.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const validatePasswordInputSchema = z.object({
  password: z.string().min(8),
  email: z.string().email(),
});

export async function validatePassword(
  options: z.infer<typeof validatePasswordInputSchema>
) {
  const { password, ...userInfoWithoutPassword } = options;
  const user = await prisma.user.findFirst({
    where: { email: userInfoWithoutPassword.email },
  });
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    if (!process.env.JWT_SECRET) {
      throw new Error("Missing env variable: JWT_SECRET");
    }

    return {
      token: jsonwebtoken.sign(
        {
          data: userInfoWithoutPassword,
          expiresIn: 60 * 30,
        },
        process.env.JWT_SECRET
      ),
    };
  }
}
