import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

def send_otp_email(email_to, otp, user_name="User"):
    """
    Sends verification OTP using Twilio SendGrid Transactional Email API.
    """
    api_key = os.getenv("SENDGRID_API_KEY")
    mail_from = os.getenv("MAIL_FROM")

    if not all([api_key, mail_from]):
        print("SendGrid configuration is incomplete. Skipping email.")
        return False

    try:
        message = Mail(
            from_email=mail_from,
            to_emails=email_to,
            subject="Verification OTP - Jobify",
            html_content=f"""
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h1 style="color: #00B074; text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 20px;">Jobify Verification</h1>
                        <p style="text-align: center; color: #555555; font-size: 16px;">Hello, <strong>{user_name}</strong>!</p>
                        <p style="text-align: center; color: #555555; font-size: 16px;">Welcome to Jobify! Your email verification code is:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <span style="font-size: 36px; font-weight: 900; background-color: #f0fdf4; color: #00B074; padding: 15px 30px; border-radius: 15px; letter-spacing: 5px; border: 2px dashed #00B074;">
                                {otp}
                            </span>
                        </div>
                        <p style="text-align: center; color: #555555; font-size: 14px;">
                            Please enter this OTP on the verification page to activate your account.
                        </p>
                        <p style="text-align: center; color: #999999; font-size: 13px; margin-top: 20px;">
                            This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.
                        </p>
                        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
                        <p style="text-align: center; color: #bbbbbb; font-size: 12px;">
                            &copy; 2026 Jobify. All rights reserved. | This is an automated message, please do not reply.
                        </p>
                    </div>
                </body>
            </html>
            """
        )
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        return response.status_code in [200, 201, 202]
    except Exception as e:
        print(f"SendGrid Error sending email: {str(e)}")
        return False

def send_shortlist_email(email_to, candidate_name, job_title, company_name):
    """
    Sends shortlist notification using Twilio SendGrid Transactional Email API.
    """
    api_key = os.getenv("SENDGRID_API_KEY")
    mail_from = os.getenv("MAIL_FROM")

    if not all([api_key, mail_from]):
        print("SendGrid configuration is incomplete. Skipping email.")
        return False

    try:
        message = Mail(
            from_email=mail_from,
            to_emails=email_to,
            subject=f"Congratulations! You are shortlisted for {job_title} - Jobify",
            html_content=f"""
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f7f6; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h1 style="color: #00B074; text-align: center; font-size: 28px; font-weight: 800; margin-bottom: 20px;">Congratulations! 🎉</h1>
                        <p style="color: #555555; font-size: 16px;">Hello <strong>{candidate_name}</strong>,</p>
                        <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                            Great news! You have been <strong>shortlisted</strong> by <strong>{company_name}</strong> for the position of <strong>{job_title}</strong>.
                        </p>
                        <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                            The hiring team will contact you shortly regarding the next steps in the interview process. Please keep an eye on your email inbox and dashboard notifications.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="http://localhost:5173/candidate/dashboard" style="background-color: #00B074; color: white; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 176, 116, 0.2);">
                                Go to Dashboard
                            </a>
                        </div>
                        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
                        <p style="text-align: center; color: #bbbbbb; font-size: 12px;">
                            &copy; 2026 Jobify. All rights reserved. | This is an automated message, please do not reply.
                        </p>
                    </div>
                </body>
            </html>
            """
        )
        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        return response.status_code in [200, 201, 202]
    except Exception as e:
        print(f"SendGrid Error sending shortlist email: {str(e)}")
        return False
