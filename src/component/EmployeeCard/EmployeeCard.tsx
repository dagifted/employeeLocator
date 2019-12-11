import * as React from 'react';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { IProfile } from '../../models/IProfile';

export interface IEmployeeCardProps{
    imageUrl?:string;
    imageInitials?:string;
    text: string;
    secondaryText?:string;
    tertiaryText?: string;
    optionalText?:string;
}
 
export class EmployeeCard extends React.Component<IProfile,{}>{
    constructor(props:IProfile){
        super(props);
    }

    public render(){
        return(
            <Persona text = {`${this.props.FirstName}  ${this.props.LastName}`}
                secondaryText= {this.props.Department}
                tertiaryText = {this.props.Location}
                optionalText = {this.props.Status}
                imageUrl = {this.props.PictureURL}
                size ={PersonaSize.large} //TODO : will be a prop
                imageShouldFadeIn = {false}
                imageShouldStartVisible = {true}

             />
        )
    }
}