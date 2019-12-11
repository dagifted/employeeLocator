import { IUser } from "./IUser";

export interface IProfile extends IUser{
    Department: string;
    MobilePhone?: string;
    PictureURL?:string;
    Title?: string;
    Location?:string;
    Status:string;
}