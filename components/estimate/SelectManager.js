import React, {Component} from 'react';
import Checkbox from 'react-bootstrap/lib/Checkbox';

class ManagerSelect extends Component {

  onChange(e) {
    const {target} = e;
    this.props.change(parseInt(target.getAttribute('data-id')), 10);
  }

  render() {

    const {users, selected} = this.props;
    const managers = users.data;

    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{fontWeight: "bold"}}>
          Менеджеры:
        </div>
        <div className="panel-body" style={{overflow: 'auto', maxHeight: "15.5em"}}>
          {users.isLoading || users.data.length <= 0 ? (
            <p>Идет загрузка...</p>
          ) : (
            managers.map((user, index) => (
              <Checkbox
                key={index}
                data-id={user.id}
                onChange={this.onChange.bind(this)}
                checked={selected.indexOf(user.id) > -1}
              >{user.name}</Checkbox>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ManagerSelect;
