import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Tab, NavItem, Nav} from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button'
import ProductLayout from './ProductLayout';
import ModalTab from './estimate/ModalTab';
import ModalOption from './estimate/ModalOption';
import ModalExpert from './estimate/ModalExpert';
import ModalConfirmation from './ModalConfirmation'
import ModalNoSaved from './ModalNoSaved'
import 'lodash'

import {
  loadBlocks,
  loadDivisions,
  loadTasks,
  loadAvaliableProductions,
  loadProductions,
} from '../actions';

const loadData = (props) => {
  props.loadBlocks();
  props.loadDivisions();
  props.loadTasks();
  props.loadAvaliableProductions(props.estimateId);
};

function findArray(start, hierarchy) {
  let result;
  let blocks = start;
  hierarchy.forEach((element) => {
    blocks.some((block) => {
      const condition = block.unique_id === element;
      if (condition) {
        result = block;
        blocks = block.blocks;
      }
      return condition;
    })
  });
  return result;
}

function findBlock(blocks, unique_id) {
  let result;
  blocks.some((item, index) => {
    const condition = item.unique_id === unique_id;
    if (condition) {
      result = index
    }
    return condition;
  });
  return result;
}

function getExperts(acc, data, index) {
  if (data.blocks && data.blocks.length > 0) {
    return data.blocks.reduce(getExperts, acc);
  } else {
    if (data.type === 'expert') {
      acc.push(data);
    }
    return acc;
  }
}

function generateUniqueId() {
  return new Date().valueOf() + Math.floor(Math.random() * 100);
}

function claculateHeight(element) {
  return element.clientHeight;
}

function makeTabElement(element) {
  element.type = 'tab';
  element.name = element.production.name;
  element.production_id = element.production.id;
  element.saved = true;
  element.unique_id = generateUniqueId();
}

function makeTask(element) {
  element.name = element.name || '';
  element.type = 'task';
  element.unique_id = generateUniqueId();
  element.collapsed = false;
}

function makeExpert(element) {
  element.name = element.name || '';
  element.type = 'expert';
  element.unique_id = generateUniqueId();
  element.collapsed = false;
  element.data = {
    amount: parseFloat(element.amount),
    hours: parseFloat(element.hours),
    months: element.months ? parseFloat(element.months) : 1,
    hours_in_month: element.hours_in_month ? parseFloat(element.hours_in_month) : parseFloat(element.hours),
    sum: parseFloat(element.sum)
  };
}

function makeBlock(element) {
  element.name = element.name || '';
  element.type = element.name === '' ? 'invisible' : 'block';
  element.unique_id = generateUniqueId();
  element.collapsed = false;
}

function makeTab(data) {
  if (data.division) {
    makeTabElement(data);
  }
  if (data.blocks || data.tasks || data.experts) {
    if (data.tasks) {
      data.tasks.forEach(makeTask);
    }
    if (data.experts) {
      data.experts.forEach(makeExpert);
    }
    if (data.blocks) {
      data.blocks.forEach(makeBlock);
    }
    const tabBlocks = [].concat((data.tasks || []), (data.experts || []), (data.blocks || []));
    data.blocks = tabBlocks;
    data.blocks.forEach(makeTab);
    return data;
  } else {
    return data;
  }
}

function makeTabs(tabs) {
  const newTabs = tabs.slice().map(makeTab);
  return newTabs;
}

class TabsCustom extends Component {
  constructor(props) {
    super(props);

    const blocksData = {
      mainTitle: 'Выберите тип блока',
      title: 'Тип блока',
    }

    const tasksData = {
      mainTitle: 'Выберите задание',
      title: 'Задание',
    }

    const tabs = props.tabs ? makeTabs(props.tabs) : [];

    this.state = {
      tabs: tabs,
      experts: (tabs.length > 0 ? tabs.reduce(getExperts, []) : []),
      activeKey: (tabs.length > 0 ? tabs[0].unique_id : null),
      showTabModal: false,
      showOptionModal: false,
      showExpertModal: false,
      showConfirmation: false,
      showNoSavedModal: false,
      optionModalData: blocksData,
      optionModalType: 'block',
      optionModalId: null,
      optionModalName: null,
      optionModalOptions: {
        block: blocksData,
        sub: blocksData,
        task: tasksData,
        subTask: tasksData,
        blockTask: tasksData,
      },
      expertModalData: null,
      textTitle: null
    };

    this.dataChange = this.dataChange.bind(this);
    this.headerMouseMove = this.headerMouseMove.bind(this);
    this.headerMouseUp = this.headerMouseUp.bind(this);
    this.addTab = this.addTab.bind(this);
    this.deleteTab = this.deleteTab.bind(this);
    this.changeActiveKey = this.changeActiveKey.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
    this.closeTabModal = this.closeTabModal.bind(this);
    this.showTabModal = this.showTabModal.bind(this);
    this.newTabModal = this.newTabModal.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
    this.closeOptionModal = this.closeOptionModal.bind(this);
    this.showOptionModal = this.showOptionModal.bind(this);
    this.newOptionModal = this.newOptionModal.bind(this);
    this.updateOptionModal = this.updateOptionModal.bind(this);
    this.editOptionBlock = this.editOptionBlock.bind(this);
    this.closeExpertModal = this.closeExpertModal.bind(this);
    this.showExpertModal = this.showExpertModal.bind(this);
    this.newExpertModal = this.newExpertModal.bind(this);
    this.updateExpertModal = this.updateExpertModal.bind(this);
    this.editExpertBlock = this.editExpertBlock.bind(this);
    this.createInvisibleBlock = this.createInvisibleBlock.bind(this);
    this.updateExperts = props.updateExperts;
    this.onToggleLock = this.onToggleLock.bind(this);
    this.closeNoSavedModal = this.closeNoSavedModal.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
    if (this.state.tabs.length > 0) {
      this.dataChange(false);
      this.updateExperts(this.state.experts);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.productionId && newProps.productionUId) {
      const index = this.state.tabs.findIndex(item => item.unique_id == newProps.productionUId);
      this.state.tabs[index].id = newProps.productionId;
    }
  }

  findActiveIndex(tabs) {
    let result;
    tabs.some((item, index) => {
      const condition = item.unique_id === this.state.activeKey;
      if (condition) {
        result = index
      }
      return condition;
    });
    return result;
  }

  findElement(hierarchy) {
    const elementHierarchy = hierarchy.slice();
    const unique_id = elementHierarchy.pop();
    const {tabs} = this.state;
    const tabIndex = this.findActiveIndex(tabs);
    const array = (elementHierarchy && elementHierarchy.length > 0) ? findArray(tabs[tabIndex].blocks, elementHierarchy).blocks : tabs[tabIndex].blocks;
    const index = findBlock(array, unique_id);
    return {
      array,
      index
    };
  }

  // Data

  dataChange(check = true) {
    const {changeTabs} = this.props;
    changeTabs({
      tabs: JSON.parse(JSON.stringify(this.state.tabs))
    });

    if (check) {
      const tabs = this.state.tabs.slice();
      tabs.find(({unique_id}) => unique_id === this.state.activeKey).saved = false;
      this.setState({
        tabs
      })
    }
  }

  changeActiveKey(key, check = true) {
    if (key) {
      const {tabs} = this.state;
      const index = this.findActiveIndex(tabs);
      if (check) {
        if (tabs.find(({unique_id}) => unique_id === this.state.activeKey).saved) {
          this.setState({
            activeKey: key,
          });
        } else {
          this.setState({
            showNoSavedModal: true
          })
        }
      } else {
        this.setState({
          activeKey: key,
        });
      }
    }
  }

  addTab(e) {
    e.preventDefault();
    e.stopPropagation();
    const {tabs} = this.state;
    if (tabs.length > 0) {
      if (tabs.find(({unique_id}) => unique_id === this.state.activeKey).saved) {
        const newTab = {
          unique_id: generateUniqueId(),
          name: "Name " + Math.random(),
          content: "text " + Math.random(),
          blocks: [],
          type: 'tab',
          saved: true,
          lock: false
        };
        tabs.push(newTab);
        this.setState({
          tabs: tabs,
        });
        this.changeActiveKey(newTab.unique_id);
        this.showTabModal();
      } else {
        this.setState({
          showNoSavedModal: true
        })
      }
    } else {
      const newTab = {
        unique_id: generateUniqueId(),
        name: "Name " + Math.random(),
        content: "text " + Math.random(),
        blocks: [],
        type: 'tab',
        saved: true,
        lock: false
      };
      tabs.push(newTab);
      this.setState({
        tabs: tabs,
      });
      this.changeActiveKey(newTab.unique_id, false);
      this.showTabModal();
    }


  }

  deleteTab() {
    const {tabs, tabToRemove} = this.state;
    const {remove} = this.props;
    const index = this.state.tabs.findIndex(item => item.unique_id == tabToRemove);
    if (index > -1) {
      const {id, production_id} = this.state.tabs[index];
      if (id) {
        remove(id);
      }
      tabs.splice(index, 1);
      const newExperts = tabs.reduce(getExperts, []);
      if (production_id) {
        const prod = this.props.productions.data.find(option => option.id === production_id);
        if (prod) {
          prod.unavaliable = false;
        }
      }
      this.updateExperts(newExperts);
      if (index !== 0 && `${tabToRemove}` === `${this.state.activeKey}`) {
        this.changeActiveKey(tabs[index - 1].unique_id, false);
      }
      this.setState({
        tabs: tabs,
        experts: newExperts,
        tabToRemove: null,
        showConfirmation: false,
      });
    }
  }

  udpateActiveAdvTab(name, subDivision) {
    const {tabs} = this.state;
    const index = this.findActiveIndex(tabs);
    tabs[index].name = name,
      tabs[index].content = subDivision;
    this.dataChange();
    return tabs;
  }

  udpateActiveTab(name, id, experts, template) {
    const {tabs} = this.state;
    const index = this.findActiveIndex(tabs);
    tabs[index].name = name,
      tabs[index].production_id = id;
    tabs[index].available_experts = experts;

    this.props.productions.data.find(option => option.id === id).unavaliable = true;
    this.dataChange();
    return tabs;
  }

  showTabModal() {
    this.setState({
      showTabModal: true
    });
  }

  closeTabModal() {
    const {tabs} = this.state;
    const index = this.findActiveIndex(tabs);
    this.state.tabToRemove = tabs[index].unique_id;
    this.deleteTab();
    this.setState({
      showTabModal: false
    });
  }


  newTabModal(target, experts, adv) {
    let newTabs;

    if (adv) {
      const targetName = target.name.value;
      const targetSubDivision = target.subDivision.value;
      newTabs = this.udpateActiveAdvTab(targetName, targetSubDivision);
    } else {
      const targetName = target.name.options[target.name.selectedIndex].textContent;
      const targetId = parseInt(target.name.value, 10);
      newTabs = this.udpateActiveTab(targetName, targetId, experts);
    }
    this.setState({
      showTabModal: false,
      tabs: newTabs,
    });


  }

  onDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showConfirmation: true,
      tabToRemove: e.target.attributes.getNamedItem('data-id').value
    });
  }

  closeConfirmation() {
    this.setState({
      showConfirmation: false,
    });
  }

  createBlock(id, name, data, division = null) {
    const hierarchy = this.state.optionModalHierarchy;
    const {tabs} = this.state;
    const index = this.findActiveIndex(tabs);
    const array = (hierarchy && hierarchy.length > 0) ? findArray(tabs[index].blocks, hierarchy).blocks : tabs[index].blocks;
    const newBlock = {
      id: parseInt(id, 10),
      name,
      unique_id: generateUniqueId(),
      type: this.state.optionModalType,
      data: data || null,
      collapsed: false,
      blocks: [],
      division_info: division
    }
    array.push(newBlock);
    this.dataChange();
    return newBlock;
  }

  createInvisibleBlock() {
    const {tabs} = this.state;
    const index = this.findActiveIndex(tabs);
    const newBlock = {
      id: 0,
      name: '',
      unique_id: generateUniqueId(),
      type: 'invisible',
      collapsed: false,
      blocks: [],
    }
    tabs[index].blocks.push(newBlock);
    return newBlock.unique_id;
  }

  removeBlock(hierarchy) {
    const element = this.findElement(hierarchy);
    const {array, index} = element;
    if (array[index].data) {
      const expertIndex = this.state.experts.indexOf(array[index]);
      this.state.experts.splice(expertIndex, 1);
    }
    element.array.splice(element.index, 1);
    this.setState({
      tabs: this.state.tabs,
      optionModalHierarchy: null
    });
    this.dataChange();
  }

  copyBlock(hierarchy) {
    const element = this.findElement(hierarchy);
    const {array, index} = element;
    const copy = JSON.parse(JSON.stringify(array[index]));
    copy.unique_id = generateUniqueId();
    array.splice(index, 0, copy);
    this.setState({
      tabs: this.state.tabs
    });
    this.dataChange();
  }

  collapseBlock(block) {
    block.collapsed = !block.collapsed;
    this.setState({
      tabs: this.state.tabs
    });
  }

  updateBlock(id, name, data) {
    const hierarchy = this.state.optionModalHierarchy;
    const {tabs} = this.state;
    const index = this.findActiveIndex(tabs);
    const block = findArray(tabs[index].blocks, hierarchy);
    block.id = id;
    block.name = name;
    block.data = data || null;
    this.dataChange();
  }

  editOptionBlock(hierarchy) {
    const element = this.findElement(hierarchy);
    this.showOptionModal(element.array[element.index], hierarchy);
  }

  headerMouseMove(e) {
    const delta = e.clientY - this.state.movingStartY;
    if (Math.abs(delta) > 0) {
      const hierarchy = this.state.movingHierarchy;
      const element = this.findElement(hierarchy);
      const {array, index} = element;
      const height = delta > 0 ? this.state.movingHeights[index + 1] : this.state.movingHeights[index - 1];
      const positionShift = Math.abs(delta) > (height + 20) ? 1 : 0;
      const positionDirection = delta > 0 ? positionShift : -positionShift;
      let newPosition = index + positionDirection;
      array[index].transform = delta - ((height || 0) * positionDirection);
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition >= array.length) {
        newPosition = array.length - 1;
      }
      if (index !== newPosition) {
        const oldElement = array.splice(index, 1);
        array.splice(newPosition, 0, ...oldElement);
        array[index].transform = 0;
        this.setState({
          movingStartY: e.clientY,
        });
      }
      this.setState({
        tabs: this.state.tabs
      });
    }
  }

  headerMouseUp(e) {
    document.removeEventListener('mousemove', this.headerMouseMove);
    document.removeEventListener('mouseup', this.headerMouseUp);
    const hierarchy = this.state.movingHierarchy;
    const element = this.findElement(hierarchy);
    element.array[element.index].transform = 0;
    this.setState({
      tabs: this.state.tabs
    });
    this.dataChange();
  }

  moveBlock(hierarchy, elements, startY) {
    this.setState({
      movingHierarchy: hierarchy,
      movingStartY: startY,
      movingHeights: [].slice.call(elements).map(claculateHeight)
    });
    document.addEventListener('mousemove', this.headerMouseMove);
    document.addEventListener('mouseup', this.headerMouseUp);
  }

  showOptionModal(typeObject, hierarchy, id, textTitle) {
    const isObject = typeof typeObject === 'object';
    const optionType = isObject ? typeObject.type : typeObject;
    const optionId = isObject ? typeObject.id : id;
    const optionName = isObject ? typeObject.name : null;
    this.setState({
      optionModalType: optionType,
      optionModalData: this.state.optionModalOptions[optionType],
      optionModalId: optionId || null,
      optionModalName: optionName,
      optionModalHierarchy: hierarchy,
      optionModalEdit: isObject,
      showOptionModal: true,
      textTitle: textTitle
    });
  }

  closeOptionModal() {
    this.setState({
      showOptionModal: false,
      optionModalType: null,
      optionModalHierarchy: null
    });
  }

  newOptionModal(id, name) {
    this.createBlock(id, name);
    this.setState({
      showOptionModal: false,
    });
  }

  updateOptionModal(id, name) {
    this.updateBlock(id, name);
    this.setState({
      showOptionModal: false,
    });
  }

  editExpertBlock(hierarchy) {
    const element = this.findElement(hierarchy);
    this.showExpertModal(hierarchy, element.array[element.index]);
  }

  showExpertModal(hierarchy, object) {
    this.setState({
      optionModalHierarchy: hierarchy,
      optionModalId: object ? object.id : null,
      optionModalType: 'expert',
      optionModalEdit: object ? true : false,
      expertModalData: object ? object.data : null,
      showExpertModal: true
    });
  }

  closeExpertModal() {
    this.setState({
      showExpertModal: false,
      optionModalHierarchy: null
    });
  }

  newExpertModal(id, name, data, division) {
    const expert = this.createBlock(id, name, data, division);
    this.state.experts.push(expert);
    this.updateExperts(this.state.experts);
    this.setState({
      showExpertModal: false,
    });
  }

  updateExpertModal(id, name, data) {
    this.updateBlock(id, name, data);
    this.setState({
      showExpertModal: false,
    });
  }

  onSubmit(e) {
    const {submit, estimateId} = this.props;
    const {tabs} = this.state;
    const tabIndex = this.findActiveIndex(tabs);
    submit(estimateId, tabIndex);

    const tempTabs = this.state.tabs.slice();
    tempTabs.find(({unique_id}) => unique_id === this.state.activeKey).saved = true;
    this.setState({
      tabs: tempTabs
    })
  }

  onToggleLock(toggleLock) {
    const {lock} = this.props;
    const {tabs} = this.state;
    const tabIndex = this.findActiveIndex(tabs);
    const activeTab = tabs[this.findActiveIndex(tabs)];

    lock(tabIndex, toggleLock);

    activeTab.lock = toggleLock;
  }

  closeNoSavedModal() {
    this.setState({
      showNoSavedModal: false
    })
  }

  render() {
    const {tabs} = this.state;
    const {blocks, divisions, productions, tasks, isLoading} = this.props;
    const options = (this.state.optionModalType === 'block' || this.state.optionModalType === 'sub') ? blocks : tasks;
    const mainTitle = this.state.optionModalType === 'block' ? 'Выберите блок' : this.state.optionModalType === 'sub' ? 'Выберите подблок' : this.state.optionModalType === 'subTask' ? 'Выберите подзадачу' : 'Выберите задачу';
    const title = this.state.optionModalType === 'block' ? 'Блок' : this.state.optionModalType === 'sub' ? 'Подблок' : this.state.optionModalType === 'subTask' ? 'Подзадача' : 'Задача';
    const experts = tabs.length > 0 ? (tabs[this.findActiveIndex(tabs)].available_experts || []) : [];
    const activeTab = tabs[this.findActiveIndex(tabs)];

    return (
      <div>
        <Tab.Container
          id="tabs-custom"
          activeKey={this.state.activeKey}
          onSelect={this.changeActiveKey}>
          <div>
            <Nav bsStyle="tabs">
              {tabs.map((tab, index) => (
                <NavItem key={index} eventKey={tab.unique_id}>
                  {tab.name}
                  <button data-id={tab.unique_id} onClick={this.onDelete.bind(this)}
                          style={{marginLeft: "10px"}}>&minus;</button>
                </NavItem>
              ))}
              <NavItem>
                <button onClick={this.addTab}>+</button>
              </NavItem>
            </Nav>
            <Tab.Content animation>
              {tabs.map((tab, index) => (
                <Tab.Pane key={index} eventKey={tab.unique_id}>
                  <ProductLayout
                    position={index}
                    blocks={tab.blocks}
                    lockAction={this.onToggleLock}
                    lock={tab.lock}
                    lockPermission={tab.actions ? tab.actions.locked : true}
                    showExpertModal={this.showExpertModal}
                    showOptionModal={this.showOptionModal}
                    editOptionBlock={this.editOptionBlock}
                    editExpertBlock={this.editExpertBlock}
                    createInvisibleBlock={this.createInvisibleBlock}
                    removeBlock={this.removeBlock.bind(this)}
                    copyBlock={this.copyBlock.bind(this)}
                    collapseBlock={this.collapseBlock.bind(this)}
                    moveBlock={this.moveBlock.bind(this)}
                  />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </Tab.Container>
        <hr/>

        <Button
          style={{marginRight: "10px"}}
          bsStyle="success"
          onClick={this.onSubmit.bind(this)}
          disabled={isLoading || tabs.length === 0 || !productions.permissions || activeTab.lock || activeTab.saved}
        >{activeTab && !activeTab.saved ? "Сохранить продукт" : "Сохранено"}</Button>
        {productions.data.length > 0 ? (
          <ModalTab
            showTabModal={this.state.showTabModal}
            closeTabModal={this.closeTabModal}
            newTabModal={this.newTabModal}
            productions={productions}
            divisions={divisions}
          />
        ) : null}

        <ModalOption
          showOptionModal={this.state.showOptionModal}
          closeOptionModal={this.closeOptionModal}
          newOptionModal={this.newOptionModal}
          updateOptionModal={this.updateOptionModal}
          options={options}
          mainTitle={mainTitle}
          title={title}
          id={this.state.optionModalId}
          name={this.state.optionModalName}
          edit={this.state.optionModalEdit}
          textTitle={this.state.textTitle}
        />
        <ModalExpert
          showExpertModal={this.state.showExpertModal}
          closeExpertModal={this.closeExpertModal}
          newExpertModal={this.newExpertModal}
          updateExpertModal={this.updateExpertModal}
          options={experts}
          id={this.state.optionModalId}
          expertData={this.state.expertModalData}
          edit={this.state.optionModalEdit}
        />
        <ModalConfirmation
          onShowModal={this.state.showConfirmation}
          onHideModal={this.closeConfirmation}
          action={this.deleteTab}
          actionTitle="Удалить?"
        />
        <ModalNoSaved
          onShowModal={this.state.showNoSavedModal}
          onHideModal={this.closeNoSavedModal}
          actionTitle="Не сохранено"
        />
      </div>
    )

  }
}

TabsCustom.propTypes = {
  blocks: PropTypes.object.isRequired,
  divisions: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func.isRequired,
  loadDivisions: PropTypes.func.isRequired,
  loadTasks: PropTypes.func.isRequired,
  loadProductions: PropTypes.func.isRequired,
  loadAvaliableProductions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  const {blocks, divisions, productions, tasks} = state;

  return {
    blocks,
    divisions,
    productions,
    tasks
  };

};

export default connect(mapStateToProps, {
  loadBlocks,
  loadDivisions,
  loadTasks,
  loadProductions,
  loadAvaliableProductions
})(TabsCustom);
