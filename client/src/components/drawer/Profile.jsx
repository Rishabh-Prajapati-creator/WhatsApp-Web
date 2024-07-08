
import { useContext } from 'react';

import { Box, styled, Typography } from '@mui/material';

import { AccountContext } from '../../context/AccountProvider';


const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;

`;

const Image = styled('img')({
    borderRadius: '50%',
})

const BoxWrapper = styled(Box)`
    background: #ffffff;
    padding: 12px 130px 12px 15px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);

    & :first-child{
        font-size: 13px;
        color: #009688;
        font-weight: 200;
    }
    & :last-child {
        margin: 14px 0;
        color: 4a4a4a;
    }
`;

const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px
    margin-left: 7px;
 
    & > p {
        font-size: 12px;
        color: #8696a0;
        margin: 20px 10px;
    }
`;

const TypoFont = styled(Typography)`
    font-size: 14px;
    margin: 25px 0px;
`;

export default function Profile() {

    const { account } = useContext(AccountContext);

    return (
        <>
            <ImageContainer>
                <Image src={account.picture} alt="dp" />
            </ImageContainer>
            <BoxWrapper>
                <Typography>Your name</Typography>
                <Typography>{account.name}</Typography>
            </BoxWrapper>
            <DescriptionContainer>
                <TypoFont>This is not your username or pin. This name will be visible <br /> to your WhatsApp contacts.</TypoFont>
            </DescriptionContainer>
            <BoxWrapper>
                <Typography>About</Typography>
                <Typography>Eat! Sleep! Repeat!</Typography>
            </BoxWrapper>
        </>
    )
}