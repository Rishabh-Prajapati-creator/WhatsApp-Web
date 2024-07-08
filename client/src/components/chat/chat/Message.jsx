import { useContext } from 'react';

import { Box, Typography, styled } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

import { formateDate, downloadMedia } from '../../../utils/common-utils';
import { AccountContext } from '../../../context/AccountProvider';
import { iconPDF } from '../../../constants/data';

const Own = styled(Box)`
    background: #dcf8c6;
    max-width: 60%;
    margin-left: auto;
    padding: 5xp;
    width: fit-content;
    display: flex;
    border-radius: 8px;
    word-break: break-word;

`;
const Wrapper = styled(Box)`
    background: #FFFFFF;
    max-width: 60%;
    padding: 5xp;
    width: fit-content;
    display: flex;
    border-radius: 8px;
    word-break: break-word;

`;

const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 22px 1px 11px;
    margin: 2px;
`;

const Time = styled(Typography)`
    font-size: 10px;
    color: #919191;
    margin-top: 5px;
    word-break: keep-all;
    margin-top: auto;
`;

export default function Message({ message }) {

    const { account } = useContext(AccountContext);

    return (
        <>
            {
                account.sub === message.senderId ?
                    <Own>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }

                    </Own>

                    :

                    <Wrapper>
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </Wrapper>
            }
        </>
    )
}

const ImageMessage = ({ message }) => {
    return (
        <Box style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <Box style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }}>{message.text.split('/').pop()}</Typography>
                    </Box>
                    :
                    <img style={{ width: 300, height: '100%', objectFit: 'cover' }} src={message.text} alt={message.text} />
            }
            <Time style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <GetAppIcon
                    onClick={(e) => downloadMedia(e, message.text)}
                    style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%', cursor: 'pointer' }}
                    fontSize='small'

                />
                {formateDate(message.createdAt)}
            </Time>
        </Box>
    )
}

const TextMessage = ({ message }) => {
    return (
        <>
            <Text>
                {message.text}
            </Text>
            <Time>{formateDate(message.createdAt)}</Time>
        </>
    )
}