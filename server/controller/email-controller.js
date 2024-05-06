import Email from "../model/email.js";

export const saveSentEmails = async(request,response) => {
    try {
        const email=new Email(request.body);
        await email.save();
        email.save();

        response.status(200).json('email saved successfully');
    }catch(error) {
        response.status(500).json(error.message);
    }
}