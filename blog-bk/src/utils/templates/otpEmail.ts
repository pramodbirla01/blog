export const otpEmailTemplate = (name: string, otp: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Hello ${name},</h2>
      <p style="font-size: 16px; color: #555;">
        Use the OTP below to verify your email:
      </p>
      <div style="margin: 20px 0; text-align: center;">
        <span style="display: inline-block; padding: 15px 25px; font-size: 24px; font-weight: bold; color: #ffffff; background: #007bff; border-radius: 6px;">
          ${otp}
        </span>
      </div>
      <p style="font-size: 14px; color: #888;">
        This OTP will expire in <b>5 minutes</b>. If you did not request this, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #333;">Thank you, <br/> Pramod Blogs Team</p>
    </div>
  </body>
</html>
`;
