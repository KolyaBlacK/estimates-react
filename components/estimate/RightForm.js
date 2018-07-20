import React, {Component} from 'react';
import TabsCustom from '../TabsCustom';

function filterBlocks(element) {
  return element.type === 'block' || element.type === 'sub' || element.type === 'invisible';
}

function filterTasks(element) {
  return element.type === 'task' || element.type === 'subTask' || element.type === 'blockTask';
}

function filterExperts(element) {
  return element.type === 'expert';
}

function normalizeExpert(array) {
  return array.map(element => {
    const {data} = element;
    Object.keys(data).forEach(key => element[key] = data[key]);
    return element;
  });
}

function normalizeData(data) {
  if (data.blocks && data.blocks.length > 0) {
    let blocks = [];
    let tasks = [];
    let experts = [];
    data.blocks.forEach((block) => {
      if (filterBlocks(block)) {
        blocks.push(block)
      } else if (filterTasks(block)) {
        tasks.push(block)
      } else if (filterExperts(block)) {
        experts.push(block)
      }
    });
    if (blocks.length > 0) {
      data.blocks = blocks;
    } else {
      delete data.blocks;
    }
    if (tasks.length > 0) {
      data.tasks = tasks;
    } else {
      data.tasks = [];
    }
    if (experts.length > 0) {
      data.experts = normalizeExpert(experts);
    } else {
      data.experts = [];
    }
    [...blocks, ...tasks].forEach(normalizeData);
    return data;
  } else {
    data.tasks = [];
    data.experts = [];
    return data;
  }
}

class RightForm extends Component {
  constructor() {
    super();
  }

  changeTabs(data) {
    const {change} = this.props;
    const tabs = data.tabs.slice().map(normalizeData);
    change({tabs});
  }

  render() {

    const {
      isLoading,
      submit,
      update,
      remove,
      estimateId,
      updateExperts,
      productions,
      productionId,
      productionUId,
      lock
    } = this.props;

    return (
      <TabsCustom
        tabs={productions}
        submit={submit}
        update={update}
        remove={remove}
        lock={lock}
        isLoading={isLoading}
        estimateId={estimateId}
        productionId={productionId}
        productionUId={productionUId}
        changeTabs={this.changeTabs.bind(this)}
        updateExperts={updateExperts}
      />
    );

  }
}

export default RightForm;
