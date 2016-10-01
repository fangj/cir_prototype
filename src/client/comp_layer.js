import React from 'react';
var _=require('lodash');
import Component from './comp';

export default class comp_layer extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {comps}=this.props.layout;
    const compnents=_.values(comps);
    return (
      <div className="comp-layer">
        {compnents.map(comp=> <Component key={comp.id} data={comp}/>)}
      </div>
    );
  }
}
