import React, { Component } from 'react';
require ('./knight.less');

export default class Knight extends Component {
  static propTypes = {
    name: React.PropTypes.string,
  };
  render() {
    return <span className="horse">♘</span>;
  }
}