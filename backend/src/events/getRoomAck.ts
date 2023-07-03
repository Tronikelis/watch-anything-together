import { GET_ROOM_ACK } from "~/config/events.js";
import { GetRoomClient, GetRoomServer } from "~/types/socket.io.js";

import { EventCb, SocketAck } from "./types.js";

const getRoomAck: EventCb = (_socket, db) => {
    return ({ roomId }: GetRoomClient, ack: SocketAck<GetRoomServer>) => {
        console.log(GET_ROOM_ACK);
        console.log({ roomId });

        const room = db.get(roomId) || undefined;
        ack({ room });
    };
};

export default getRoomAck;
