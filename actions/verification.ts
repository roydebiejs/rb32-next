"use server";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";
import { User, VerificationToken } from "@prisma/client";
import { redirect } from "next/navigation";

export const verification = async (token: string) => {
  const existingToken = (await getVerificationTokenByToken(
    token
  )) as VerificationToken;

  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = (await getUserByEmail(existingToken.email)) as User;

  if (!existingUser) {
    return { error: "Email does not exist" };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return redirect("/login");
};