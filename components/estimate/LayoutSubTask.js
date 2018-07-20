import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'

class SubTaskLayout extends Component {

  constructor(props) {
    super(props);

    this.showExpertModal = props.showExpertModal;
    this.showOptionModal = props.showOptionModal;
    this.editOptionBlock = props.editOptionBlock;
    this.removeBlock = props.removeBlock;
    this.copyBlock = props.copyBlock;
    this.collapseBlock = props.collapseBlock;
  }

  addExpertClick(e) {
    e.preventDefault();
    this.showExpertModal([...this.props.hierarchy, this.props.block.unique_id]);
  }

  headerDoubleClick(e) {
    e.preventDefault();
    const {target} = e;
    if (target.classList.contains('panel-heading')) {
      this.editOptionBlock([...this.props.hierarchy, this.props.block.unique_id]);
    }
  }

  removeClick(e) {
    e.preventDefault();
    this.removeBlock([...this.props.hierarchy, this.props.block.unique_id]);
  }

  collapseClick(e) {
    e.preventDefault();
    this.collapseBlock(this.props.block);
  }

  render() {

    const {
      block,
      hierarchy,
      editExpertBlock,
      removeBlock,
      collapseBlock,
      BlockLayout
    } = this.props;

    return (
      <div className="panel panel-info">
        <div className="panel-heading clearfix" style={{userSelect: 'none'}}
             onDoubleClick={this.headerDoubleClick.bind(this)}>
          {block.name}
          <button className="pull-right" style={{width: "25px", marginTop: "-2px"}}
                  onClick={this.collapseClick.bind(this)}>{!this.props.block.collapsed ? '−' : '+'}</button>
          <Button bsStyle="danger" className="pull-right" style={{marginTop: "-4px", marginRight: "10px"}}
                  onClick={this.removeClick.bind(this)}>Удалить подзадание</Button>
        </div>
        {!this.props.block.collapsed
          ?
          <div>
            <div className="panel-body">
              {block.blocks && block.blocks.map((subBlock, index) => <BlockLayout
                key={index}
                block={subBlock}
                hierarchy={[...hierarchy, block.unique_id]}
                editExpertBlock={editExpertBlock}
                removeBlock={removeBlock}
                collapseBlock={collapseBlock}
              />)}
            </div>
            <div className="panel-footer">
              <Button bsStyle="warning" style={{marginRight: "10px"}} onClick={this.addExpertClick.bind(this)}>Добавить
                специалиста</Button>
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default SubTaskLayout;
