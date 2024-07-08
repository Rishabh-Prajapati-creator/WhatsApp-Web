import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import LoginDialog from "./account/LoginDialog";
import ChatDialog from './chat/ChatDialog';

// AppBar styled func
const Header = styled(AppBar)`
height: 125px;
background-color: #00A884;
box-shadow: none;
`;

// AppBar styled func
const LoginHeader = styled(AppBar)`
height: 220px;
background-color: #00bfa5;
box-shadow: none;
`;

// Box styled func
const Component = styled(Box)`
height: 100vh;
background-color: #dcdcdc;
`;

export default function Messenger() {

    const { account } = useContext(AccountContext);

    return (
        <Component>
            {
                account ?
                    <>
                        <Header>
                            <Toolbar>

                            </Toolbar>
                        </Header>
                        <ChatDialog />
                    </>
                    :
                    <>
                        <LoginHeader>
                            <Toolbar>

                            </Toolbar>
                        </LoginHeader>
                        <LoginDialog />
                    </>
            }

        </Component>
    )
}