import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = (await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    })) as PasswordResetToken;

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = (await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    })) as PasswordResetToken;

    return passwordResetToken;
  } catch {
    return null;
  }
};
