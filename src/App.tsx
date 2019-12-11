import React from 'react';
import { Stack, Text, Link, FontWeights, ITag } from 'office-ui-fabric-react';
import { EmployeeGrid } from './component/EmployeeDisplay/EmployeeGrid'
import { EmployeeCard } from './component/EmployeeCard/EmployeeCard';
import { TagPicker, IBasePicker } from 'office-ui-fabric-react'
import { IProfile } from './models';
import * as Faker from 'faker';

const boldStyle = { root: { fontWeight: FontWeights.semibold } };

export interface IAppProps extends IProfile, ITag { }
export interface IAppState {
  profiles: IAppProps[];
}

export class App extends React.Component<{}, IAppState>{
  private _picker = React.createRef<IBasePicker<IAppProps>>();

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      profiles: []
    }
  }

  componentWillMount() {
    for (let i = 0; i < 20; i++) {
      const firstName = Faker.name.firstName(), lastName = Faker.name.lastName();
      const id = Faker.random.uuid();
      const profile: IAppProps = {
        ID: id,
        key: id,
        FirstName: firstName,
        LastName: lastName,
        Email: Faker.internet.email(),
        PictureURL: Faker.internet.avatar(),
        Department: Faker.commerce.department(),
        name: `${firstName} ${lastName}`,
        Status: 'teleworking' // TODO : create randomn function
      }
      this.setState(prevState => ({
        profiles: [...prevState.profiles, profile],
      }))
    }
  }
  public render() {
    return (
      <div style={{ maxWidth: '800px', margin: '200px auto' }}>
        <div className='filterPanel'>
          <div className="search">
          </div>
          <div className="filter">
            <TagPicker
              onResolveSuggestions={this._onFilterChanged}
              onItemSelected = {this._onItemSelected}
              getTextFromItem={this._getTextFromItem}
              pickerSuggestionsProps={{
                suggestionsHeaderText: 'Suggested Tags',
                noResultsFoundText: 'No Tags Found'
              }}
              itemLimit={2}
              // disabled={this.state.isPickerDisabled}
              inputProps={{
                onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
                onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
                'aria-label': 'Tag Picker'
              }}
            />
          </div>
          <div className="AddProfile"></div>
        </div>
        <EmployeeGrid profiles={this.state.profiles} />
      </div>

    );
  }

  private _getTextFromItem(item: ITag): string {
    return item.name;
  }

  /*
  private _onDisabledButtonClick = (): void => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled
    });
  };
  */
  private _onFilterChanged = (filterText: string, tagList?: ITag[]): ITag[] => {
    return filterText
      ? this.state.profiles
        .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
        .filter(tag => !this._listContainsDocument(tag, tagList))
      : [];
  };

  private _onFilterChangedNoFilter = (filterText: string, tagList?: ITag[]): ITag[] => {
    return filterText ? this.state.profiles.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  };
  private _onItemSelected = (item:ITag): ITag | null => {
    if (this._picker.current && this._listContainsDocument(item, this._picker.current.items)) {
      return null;
    }
    const result = this.state.profiles.filter((user) => user.name.toLowerCase() == item.name.toLowerCase());
    console.log("filtered User",result);
    this.setState({
      profiles:result
    });
    return item;
  }

  private _listContainsDocument(tag: ITag, tagList?: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
};
