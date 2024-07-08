import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from "@mui/icons-material";
import { useEffect } from "react";

import { uploadFile } from "../../../service/api";


const Container = styled(Box)`
    height: 50px;
    background: #ededed;
    display: flex;
    widht: 100%;
    align-items: center;
    padding: 0 15px;
    & > {
        margin: 15px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    background-color: #FFFFFF;
    border-radius: 18px;
    width: calc(95% - 50px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    height: 20px;
    padding-left: 30px; 
    font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
    cursor: pointer;
    padding: 2px;
`;

export default function Footer({ sendText, setValue, value, file, setFile, setImage }) {

    useEffect(() => {
        const getImage = async () => {
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

               let response = await uploadFile(data);
               setImage(response.data);
                // console.log("dataaaaaa ",data);
            }
        }
        getImage();
    }, [file]);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setValue(e.target.files[0].name);
    }

    return(
        <Container>
            <EmojiEmotionsOutlined />
            <label htmlFor="fileInput">
            <ClipIcon />
            </label>
            <input 
            type="file" 
            id="fileInput"
            style={{ display: "none"}}
            onChange={(e) => onFileChange(e)}
            />
            <Search>
                <InputField placeholder="Type a message" 
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => sendText(e)}
                value={value}
                />
            </Search>
            <Mic />
        </Container>
    )
}