import React, { Component, Fragment } from "react";
import Select from "react-select";

export default class SingleSelect extends Component {
  render() {
    return (
      <Fragment>
        <Select
          className="basic-single col-4 mx-auto"
          classNamePrefix="select"
          defaultValue={this.props.locations[0]}
          isSearchable="true"
          name="cities"
          options={this.props.locations}
          onChange={selectedOption =>
            this.props.handleOnChange(selectedOption.label, selectedOption.code)
          }
        />
      </Fragment>
    );
  }
}
