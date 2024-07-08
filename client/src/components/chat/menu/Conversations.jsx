import { useContext, useEffect, useState } from "react";
import { Box, styled, Divider } from "@mui/material";
import { getUsers } from "../../../service/api.js";
import { AccountContext } from "../../../context/AccountProvider";
import Conversation from "./Conversation";



const Component = styled(Box)`
    height: 81vh;
    overflow: overlay;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background: #e9edef;
    opacity: .6;
`;


const Conversations = ({ text }) => {

    const [users, setUsers] = useState([]);

    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        console.log("useEffect run");
        const fetchData = async () => {
           let response = await getUsers();
           const filteredData = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
           console.log(response);
           setUsers(filteredData );
        }
        fetchData();
    },[text]);

    useEffect(() => {
        socket.current.emit('addUsers', account);
        socket.current.on('getUsers', users => {
            setActiveUsers(users);
        })
    }, [account])

    return(
       <Component>
            {
                users.map(user => (
                    user.sub !== account.sub &&
                    <>
                    <Conversation user={user} />
                    <StyledDivider />
                    </>
                ))
            }
       </Component>
    )
}

export default Conversations;