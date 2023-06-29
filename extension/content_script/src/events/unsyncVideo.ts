import { LEAVE_ROOM_ACK } from "backend/src/config/events";
import { LeaveRoomClient } from "backend/src/types/socket.io";

import { UnsyncVideoData } from "~/comms";

import { VIDEO_ATTR_IS_SYNCING, VIDEO_EVENTS_LISTEN } from "../config/const";
import { socket } from "../socket.io";

import { references } from "./setSyncingVideo";

export default async function unsyncVideo(_input: UnsyncVideoData) {
    await socket.timeout(5e3).emitWithAck(LEAVE_ROOM_ACK, undefined satisfies LeaveRoomClient);

    const videos = Array.from(document.querySelectorAll("video"));

    for (const event of VIDEO_EVENTS_LISTEN) {
        for (const video of videos) {
            video.removeEventListener(event, references.onSyncVideo);
            video.setAttribute(VIDEO_ATTR_IS_SYNCING, "false");
        }
    }
}