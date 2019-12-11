import { string } from "prop-types"

export interface IUser{
    ID?: Number | string;
    FirstName: string;
    LastName: string;
    Email : string;
}