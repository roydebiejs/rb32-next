"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, username, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    return { error: "Email address already exists" };
  }

  const existingUsername = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUsername) {
    return { error: "Username already exists" };
  }

  await db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Account created successfully" };
};
