import { IKanban } from "./kanban";

export interface IWorkspace {
    idWorkspace: number;
    name: string;
    description: string;
    kanbans: IKanban[];
    /*
    visibility: {
        id: number;
        name: string;
    };
    kanban: [{
        id: number;
        visibility: {
            id: number;
            name: string;
        };
    }];
    workspace_users: [{
        id: number;
        name: string;
        surname: string;
        otchestvo: string;
    }];
    */
};