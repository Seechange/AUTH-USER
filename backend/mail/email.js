import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplete.js"
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);
        return new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWellcomeEmail = async (email, name) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "1307ba36-fa31-4655-8809-640cde94aad4",
            template_variables: {
                "name": name,
                "company_info_name": "SeeChangeIT",
                "company_info_address": "Q12 TP HCM",
                "company_info_city": "Technology",
                "company_info_zip_code": "700000",
                "company_info_country": "VIETNAM"
            }
        })
        console.log("Email sent successfully", response);

    } catch (error) {
        console.error(`Error sending wellcome`, error);
        return new Error(`Error sending wellcome email: ${error}`);
    }
}