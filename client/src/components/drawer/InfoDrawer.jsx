import { Drawer, Box, Typography, styled } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Profile from './Profile';


const Header = styled(Box)`
    background: #008069;
    height: 107px;
    color: #ffffff;
    display: flex;
    & > svg, & > p {
        margin-top: auto;
        padding: 15px;
        font-weight: 600;
    }  
`;

const Text = styled(Typography)`
    font-size:16px;
`;

const Component = styled(Box)`
    background: #ededed;
    height: 85%;

`;

const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    widht: '30%',
    boxShadow: 'none',

}

export default function InfoDrawer({ open, setOpen }) {


    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Drawer
              open={open} 
              style={{ zIndex: 1500}}
               onClose={handleClose}
                 PaperProps={{ sx: drawerStyle }}
        > 
            <Header>
                <ArrowBack onClick={() => setOpen(false)} />
                <Text>Profile</Text>
            </Header>

            <Component>
                <Profile />
            </Component>

        </Drawer>
    )
}