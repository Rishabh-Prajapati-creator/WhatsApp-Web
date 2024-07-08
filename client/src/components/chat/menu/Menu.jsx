
import { Box } from "@mui/material";
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";
import { useState } from "react";


export default function Menu() {

    const [text, setText] = useState('');

    return (
        <Box>
            <Header />
            <Search setText={setText} />
            <Conversations text={text} />
        </Box>
    )
}