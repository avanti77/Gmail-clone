import { useState } from 'react';
import { Dialog ,Box , Typography, styled, InputBase,TextField , Button } from '@mui/material';
import {Close, DeleteOutline} from '@mui/icons-material';
import useApi from '../hooks/useApi.js';
import { API_URLS } from '../services/api.url';

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxheight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0'
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#f2f6fc',
    '& > p' :{
        fontSize: 14,
        fontWeight: 500
    }
});

const RecepientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div': {
        fontSize: 14,
        borderBottom: '1px solid #F5f5F5',
        margintop: 10
    }
});
const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    alignitems: 'center',
});
const SendButton = styled(Button)({
    background: '#0B57D0',
    color: '#fff',
    fontWeight: 500,
    textTransform: 'none',
    borderRadius: '18px',
    width: 100
});
const ComposeMail = ({openDialog , setOpenDialog}) => {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const config = {
        Host : "smtp.elasticemail.com",
        Username : process.env.REACT_APP_USERNAME,
        Password : process.env.REACT_APP_PASSWORD,
        Port: 2525
    }
    const closeComposeMail = (e) => {
        e.preventDefault();

        setOpenDialog(false);
    }
    // const sendMail = (e) => {
    //     e.preventDefault();

    //     if(window.Email){
    //         window.Email.send({
    //             ...config, 
    //             // To : data.to,
    //             To : "aonetikakhanna@gmail.com",
    //             From : "aonetikakhanna@gmail.com",
    //             // Subject : data.subject,
    //             // Body : data.body
    //             Subject : "bodyyyy",
    //             Body : "aman gupta is heere"
    //         }).then(
    //             message => alert(message)
    //         );
    //     }
        

    //     setOpenDialog(false);
    // }
    const sendMail = (event) => {
        event.preventDefault();
    
        if (window.Email) {
          const emailConfig = {
            ...config,
            From: "blurrysky00@gmail.com",
            To: data.to,
            Subject: data.subject,
            Body: data.body,
          };
    
          window.Email.send(emailConfig)
            .then((message) => alert(`Email sent successfully: ${message}`))
            .catch((error) => alert(`Error sending email: ${error}`));
        } else {
          alert("Email API not available");
        }
        const payload = {
            to: data.to,
            from: 'blurrysky00@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: 'Avantika Khanna',
            starred: false,
            type: 'sent'
        }
        sentEmailService.call(payload);
        if(!sentEmailService.error)
        {
            setOpenDialog(false);
            setData({});
        }
        else{

        }
      };
    

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
        console.log(data);
    }

    return (
        <Dialog
            open={openDialog}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>New Message</Typography>
                <Close fontSize="small" onClick={(e) => closeComposeMail(e)}/>
            </Header>
            <RecepientsWrapper>
                <InputBase placeholder ="Recepients" name="to" onChange={(e) => onValueChange(e)}/>
                <InputBase placeholder="Subject" name="subject" onChange={(e) => onValueChange(e)}/>
            </RecepientsWrapper>
            <TextField
                multiline
                rows={20}
                sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none'}}}
                onChange={(e) => onValueChange(e)}
                name="body"
            />
            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
                <DeleteOutline onClick={() => setOpenDialog(false)}/>
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;