
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";

import { qrCodeImage } from '../../constants/data';
import { addUser } from '../../service/api';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

// change parents Box
const Component = styled(Box)`
    display: flex;
`;

// change first child box 
const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

// change second child box image
const QRCode = styled('img')({

    height: 270,
    width: 270,
    margin: '90px 0 0 90px',
})

// Change heading 
const Title = styled(Typography)`
    font-size: 2rem;
    color: #525252;
    font-weight: 300;
    font-family: inherit;
    margin-bottom: 25px;
`;

// change list item S
const StyledList = styled(List)`
    & > li {
        padding: 0;
        margin-top: 15px; 
        font-size: 18px;
        color: #4a4a4a
    }
`;

// make dialogStyle for all
const dialogStyle = {
    height: '96%',
    marginTop: '15%',
    width: '70%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden',
}

export default function LoginDialog() {

    const { setAccount } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        const decode = jwtDecode(res.credential);
        console.log(decode);
        setAccount(decode);
        await addUser(decode);
    }

    const onLoginError = (res) => {
        console.log('Login fail', res);
    }

    return (
        <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop = {true}>
            <Component>
                <Container>
                    <Title>
                        Use WhatsApp on your computer
                    </Title>
                    <StyledList>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu : on Android, or Settings on iPhone</ListItem>
                        <ListItem>3. Tap Linked devices and then Link a device</ListItem>
                        <ListItem>4. Point your phone at this screen to capture the QR code</ListItem>
                    </StyledList>
                </Container>
                <Box style={{ position: 'relative' }}>
                    <QRCode src={qrCodeImage} alt="qrcode" />
                    <Box style={{ position: 'absolute', top: '45%', transform: 'translateX(75%)' }} >
                        <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
                    </Box>
                </Box>
            </Component>
        </Dialog>
    )
}