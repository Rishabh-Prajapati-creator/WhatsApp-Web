import { Dialog, Box, styled } from "@mui/material";
import { useContext } from "react";

import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";
import { AccountContext } from "../../context/AccountProvider";

const Component = styled(Box) `
    display: flex;
`;

const LeftComponent = styled(Box) `
    min-width: 300px;
`;

const RightComponent = styled(Box)`
    widht: 73%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0,0,0,0.14);
`;

// make dialogStyle for all
const dialogStyle = {
    height: '96%',
    width: '100%',
    margin: '20px',
    borderRadius: 0,
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    overflow: 'hidden',
}

export default function ChatDialog() {

    const { person } = useContext(AccountContext);

    return(
        <Dialog 
            open={true}  PaperProps={{ sx: dialogStyle }} hideBackdrop = {true}
            maxWidth={'md'}
        > 
        <Component>

            <LeftComponent>
                <Menu />
            </LeftComponent>

            <RightComponent>
                { Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
            </RightComponent>

        </Component>

        </Dialog>
    )
}