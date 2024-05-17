import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_SITE_URL}/emailverification?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ? process.env.RESEND_FROM_EMAIL : "",
    to: email,
    subject: "Confirm your email address",
    html: `
        <p>Click the link below to confirm your email address:</p>
        <p><a href="${confirmLink}">${confirmLink}</a></p>
        `,
  });
};
