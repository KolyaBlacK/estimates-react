import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {Link} from 'react-router'
import LeftForm from '../components/estimate/LeftForm';
import RightForm from '../components/estimate/RightForm';

import {
  estimateDraftLoad,
  estimateCreate,
  estimateEdit,
  estimateChangeData,
  estimateProductionCreate,
  estimateProductionEdit,
  estimateProductionDelete,
  estimateProductionChangeData,
  estimateClearData
} from '../actions/index';

const loadData = (props, id) => {
  props.estimateDraftLoad(id);
};

class EstimateDraftEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      experts: [],
    }
  }

  componentWillMount() {
    loadData(this.props, parseInt(this.props.params.id, 10));
  }

  componentWillUnmount() {
    this.props.estimateClearData();
  }

  updateExperts(experts) {
    this.setState({experts});
  }

  onSubmitFormData() {
    const {estimateEdit, estimateCreate, estimateId, data} = this.props;
    if (estimateId) {
      estimateEdit(this.props.estimateId, data);
    } else {
      estimateCreate(data);
    }
  }

  onChangeFormData(data) {
    const {estimateChangeData} = this.props;
    estimateChangeData(data);
  }

  onSubmitProductData(productionId, index) {
    const {estimateProductionEdit, estimateProductionCreate, prodData} = this.props;
    const tab = prodData.tabs[index];
    if (prodData.tabs[index].id) {
      estimateProductionEdit(prodData.tabs[index].id, prodData.tabs[index]);
    } else {
      prodData.tabs[index].tmp_field = `${prodData.tabs[index].unique_id}`;
      estimateProductionCreate(this.props.estimateId, prodData.tabs[index]);
    }
  }

  onChangeProductData(data) {
    const {estimateProductionChangeData} = this.props;
    estimateProductionChangeData(data);
  }

  onDeleteProduct(productionId) {
    const {estimateProductionDelete} = this.props;
    estimateProductionDelete(productionId);
  }

  render() {

    const {isLoading, isUpdating, data, estimateId, productionId, productionUId} = this.props;

    return (
      <div className="container">
        <Row>
          <Col xs={12}>
            <Link className="btn btn-primary" to="/">Назад</Link>
          </Col>
        </Row>
        <hr/>
        {isLoading && data.sys_name === '' ? (
          <p>Идет загрузка...</p>
        ) : (
          <Row>
            <Col xs={3}>
              {isUpdating ? <p>Идет отправка данных...</p> : null}
              <LeftForm
                {...data}
                experts={this.state.experts}
                isLoading={isUpdating}
                submit={this.onSubmitFormData.bind(this)}
                change={this.onChangeFormData.bind(this)}
              />
            </Col>
            <Col xs={9}>
              <RightForm
                {...data}
                experts={this.state.experts}
                estimateId={estimateId}
                productionId={productionId}
                productionUId={productionUId}
                isLoading={isUpdating}
                submit={this.onSubmitProductData.bind(this)}
                change={this.onChangeProductData.bind(this)}
                remove={this.onDeleteProduct.bind(this)}
                updateExperts={this.updateExperts.bind(this)}
              />
            </Col>
          </Row>
        )}
      </div>
    );

  }

}

EstimateDraftEdit.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  estimateDraftLoad: PropTypes.func.isRequired,
  estimateCreate: PropTypes.func.isRequired,
  estimateEdit: PropTypes.func.isRequired,
  estimateChangeData: PropTypes.func.isRequired,
  estimateProductionCreate: PropTypes.func.isRequired,
  estimateProductionEdit: PropTypes.func.isRequired,
  estimateProductionDelete: PropTypes.func.isRequired,
  estimateProductionChangeData: PropTypes.func.isRequired,
  estimateClearData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const {isLoading, isUpdating, isLoad, data, prodData, estimateId, productionId, productionUId} = state.estimate;

  return {
    isLoading,
    isUpdating,
    data,
    prodData,
    estimateId,
    productionId,
    productionUId,
  };
};

export default connect(mapStateToProps, {
  estimateDraftLoad,
  estimateCreate,
  estimateEdit,
  estimateChangeData,
  estimateProductionCreate,
  estimateProductionEdit,
  estimateProductionDelete,
  estimateProductionChangeData,
  estimateClearData
})(EstimateDraftEdit);
