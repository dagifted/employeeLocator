import * as React from 'react';
import { IProfile } from '../../models';
import  * as Faker from 'faker';
import { EmployeeCard } from '../EmployeeCard/EmployeeCard';
import './EmployeeGrid.css';
import * as _ from 'lodash'
export interface IEmployeeGridState{
    profiles:IProfile[];
}
export interface IEmployeeGridProps{
    profiles: IProfile[]
}

export class EmployeeGrid extends React.Component<IEmployeeGridProps,IEmployeeGridState>{
    constructor(props:IEmployeeGridProps){
        super(props);
        this.state = {
            profiles: this.props.profiles
        }
    }

    public render(){
        const { profiles} = this.props;
        const disp =  profiles.map((user) =><EmployeeCard {...user} />);
        return(
            <div className='grid'>
                {disp}
            </div>
        );
    }
}