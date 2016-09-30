import React from 'react';

export default class ibox extends React.Component {
  static propTypes = {
    onCheck: React.PropTypes.func.isRequired,
    checked: React.PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state={checked:props.checked}
  }

  render() {
    const {checked}=this.state;
    return (
      <div>ibox:{checked?"true":"false"}
      <input type="checkbox" checked={checked} onChange={this.click.bind(this)}/>
      </div>
    );
  }
  click(e){
    var checked=e.target.checked;
    this.props.onCheck(checked);
    // this.setState({checked});
  }

  componentDidMount() {
    console.log('ibox componentDidMount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('ibox componentWillReceiveProps')
    this.state.checked=nextProps.checked;
  }


}


