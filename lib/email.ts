import { Resend } from 'resend';

// Initialize Resend only when API key is available (prevents build errors)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = 'Cemetery Near Me <noreply@cemeterynearbyme.com>';

// Brand colors
const colors = {
  primary: '#2D4A3E',
  primaryLight: '#394C44',
  accent: '#C4A35A',
  accentLight: '#DFA94A',
  background: '#F8F6F1',
  foreground: '#2A3B32',
  muted: '#6B7B6E',
  border: '#DDD8CC',
  white: '#FFFFFF',
};

export async function sendVerificationEmail(
  to: string,
  code: string,
  type: 'register' | 'login' | 'claim'
): Promise<{ success: boolean; error?: string }> {
  const subjects = {
    register: 'Verify your email address - Cemetery Near Me',
    login: 'Your login code - Cemetery Near Me',
    claim: 'Verification code for your claim - Cemetery Near Me',
  };

  const titles = {
    register: 'Welcome to Cemetery Near Me',
    login: 'Your login code',
    claim: 'Verify your claim',
  };

  const descriptions = {
    register: 'Thank you for registering. Use the code below to verify your email address.',
    login: 'Use the code below to log in to your account.',
    claim: 'Use the code below to verify your claim.',
  };

  try {
    if (!resend) {
      console.warn('Resend API key not configured, skipping email send');
      return { success: false, error: 'Email service not configured' };
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: subjects[type],
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${colors.foreground}; max-width: 600px; margin: 0 auto; padding: 20px; background-color: ${colors.background};">
  <div style="background-color: ${colors.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(45, 74, 62, 0.08);">
    <div style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-family: Georgia, 'Times New Roman', serif;">
        <span style="color: ${colors.white};">Cemetery</span><span style="color: ${colors.accent};">NearMe</span>
      </h1>
    </div>

    <div style="padding: 32px;">
      <h2 style="color: ${colors.foreground}; margin-top: 0; font-family: Georgia, 'Times New Roman', serif;">${titles[type]}</h2>
      <p style="color: ${colors.muted};">${descriptions[type]}</p>

      <div style="background: ${colors.background}; border: 2px dashed ${colors.accent}; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
        <p style="margin: 0 0 10px 0; color: ${colors.muted}; font-size: 14px;">Your verification code:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: ${colors.primary};">
          ${code}
        </div>
      </div>

      <p style="color: ${colors.muted}; font-size: 14px;">
        This code is valid for 15 minutes. Do not share this code with anyone.
      </p>

      <hr style="border: none; border-top: 1px solid ${colors.border}; margin: 24px 0;">

      <p style="color: ${colors.muted}; font-size: 12px; text-align: center;">
        If you did not request this email, you can safely ignore it.
      </p>
    </div>

    <div style="text-align: center; padding: 24px; color: ${colors.muted}; font-size: 12px; background-color: ${colors.background}; border-top: 1px solid ${colors.border};">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Cemetery Near Me</p>
      <p style="margin: 5px 0 0 0;">
        <a href="https://www.cemeterynearbyme.com" style="color: ${colors.accent};">cemeterynearbyme.com</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendWelcomeEmail(
  to: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resend) {
      console.warn('Resend API key not configured, skipping email send');
      return { success: false, error: 'Email service not configured' };
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: 'Welcome to Cemetery Near Me!',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${colors.foreground}; max-width: 600px; margin: 0 auto; padding: 20px; background-color: ${colors.background};">
  <div style="background-color: ${colors.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(45, 74, 62, 0.08);">
    <div style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-family: Georgia, 'Times New Roman', serif;">
        <span style="color: ${colors.white};">Cemetery</span><span style="color: ${colors.accent};">NearMe</span>
      </h1>
    </div>

    <div style="padding: 32px;">
      <h2 style="color: ${colors.foreground}; margin-top: 0; font-family: Georgia, 'Times New Roman', serif;">Welcome, ${name}!</h2>

      <p style="color: ${colors.muted}; font-size: 16px;">
        Thank you for creating an account at Cemetery Near Me.
        We're glad to have you as part of our community!
      </p>

      <div style="background: ${colors.background}; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid ${colors.border};">
        <h3 style="color: ${colors.primary}; margin-top: 0; font-size: 16px;">What can you do with your account?</h3>
        <ul style="color: ${colors.muted}; padding-left: 20px; margin: 0;">
          <li style="margin-bottom: 8px;">Claim and manage cemetery listings</li>
          <li style="margin-bottom: 8px;">Update your contact information and hours</li>
          <li style="margin-bottom: 8px;">Add photos to your listing</li>
          <li style="margin-bottom: 8px;">Receive messages from visitors</li>
        </ul>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="https://www.cemeterynearbyme.com/dashboard"
           style="background: ${colors.accent}; color: ${colors.foreground}; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">
          Go to your Dashboard
        </a>
      </div>

      <p style="color: ${colors.muted}; font-size: 14px;">
        Do you manage a cemetery? Search for your location and click "Claim this listing"
        to manage the information.
      </p>

      <hr style="border: none; border-top: 1px solid ${colors.border}; margin: 24px 0;">

      <p style="color: ${colors.muted}; font-size: 14px;">
        Questions? Feel free to contact us via
        <a href="https://www.cemeterynearbyme.com/contact" style="color: ${colors.accent};">our contact form</a>.
      </p>
    </div>

    <div style="text-align: center; padding: 24px; color: ${colors.muted}; font-size: 12px; background-color: ${colors.background}; border-top: 1px solid ${colors.border};">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Cemetery Near Me</p>
      <p style="margin: 5px 0 0 0;">
        <a href="https://www.cemeterynearbyme.com" style="color: ${colors.accent};">cemeterynearbyme.com</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendClaimApprovedEmail(
  to: string,
  cemeteryName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resend) {
      console.warn('Resend API key not configured, skipping email send');
      return { success: false, error: 'Email service not configured' };
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: `Your claim has been approved - ${cemeteryName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${colors.foreground}; max-width: 600px; margin: 0 auto; padding: 20px; background-color: ${colors.background};">
  <div style="background-color: ${colors.white}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(45, 74, 62, 0.08);">
    <div style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%); padding: 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-family: Georgia, 'Times New Roman', serif;">
        <span style="color: ${colors.white};">Cemetery</span><span style="color: ${colors.accent};">NearMe</span>
      </h1>
    </div>

    <div style="padding: 32px;">
      <h2 style="color: ${colors.foreground}; margin-top: 0; font-family: Georgia, 'Times New Roman', serif;">Your claim has been approved!</h2>
      <p style="color: ${colors.muted};">
        Great news! Your claim for <strong style="color: ${colors.foreground};">${cemeteryName}</strong> has been approved.
      </p>

      <p style="color: ${colors.muted};">
        You can now log in to your dashboard to manage your cemetery's information.
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="https://www.cemeterynearbyme.com/dashboard"
           style="background: ${colors.accent}; color: ${colors.foreground}; padding: 14px 35px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px;">
          Go to Dashboard
        </a>
      </div>
    </div>

    <div style="text-align: center; padding: 24px; color: ${colors.muted}; font-size: 12px; background-color: ${colors.background}; border-top: 1px solid ${colors.border};">
      <p style="margin: 0;">&copy; ${new Date().getFullYear()} Cemetery Near Me</p>
      <p style="margin: 5px 0 0 0;">
        <a href="https://www.cemeterynearbyme.com" style="color: ${colors.accent};">cemeterynearbyme.com</a>
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
