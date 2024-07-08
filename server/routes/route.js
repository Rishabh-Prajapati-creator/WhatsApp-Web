
import express from "express";
import { addUser, getUsers } from "../controller/user-controller.js";
import { getConversation, newConversation } from "../controller/conversation-controller.js";
// import { newMessage } from "../../client/src/service/api.js";
import { mewMessage, getMessages } from "../controller/message-controller.js";
import { uploadFile, getImage } from "../controller/image-controller.js";

import upload from '../utils/upload.js'

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUsers);

route.post('/conversation/add', newConversation); 
route.post('/conversation/get', getConversation);

route.post('/message/add', mewMessage);
route.get('/message/get/:id', getMessages);

route.post('/file/uplaod', upload.single("file"), uploadFile);
route.get('/file/:filename', getImage);

export default route;