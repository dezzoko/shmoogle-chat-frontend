import { BackendMessage } from "./backend-message";
import { BackendUser } from "./backend-user";

export interface BackendChat {
    id: string;
    name: string;
    isGroup: boolean;
    creatorId: string;
    users: BackendUser[];
    messages: BackendMessage[];
    createdAt: Date;
}