import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {Link} from 'react-router'
import LeftForm from '../components/estimate/LeftForm';
import RightForm from '../components/estimate/RightForm';
import ModalSuccess from '../components/ModalSuccess';
import ModalError from '../components/ModalError';

import {
  estimateLoad,
  estimateCreate,
  estimateEdit,
  estimateChangeData,
  estimateProductionCreate,
  estimateProductionEdit,
  estimateProductionDelete,
  estimateProductionChangeData,
  estimateClearData,
  estimateProductionLocked,
  estimateProductionUnlocked,
  estimateUpdatePrice
} from '../actions/index';

const loadData = (props, id) => {
  props.estimateLoad(id);
};

class EstimateEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      experts: [],
      showSuccessModal: false,
      textSuccessModal: 'Save',
      showErrorModal: false,
      error: false
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
      estimateEdit(this.props.estimateId, data).then(
        responce => {
          if (responce.error) {
            this.setState({
              error: response.response.errors,
              showErrorModal: true
            });
          }
        }
      );
    } else {
      estimateCreate(data).then(
        responce => {
          if (responce.error) {
            this.setState({
              error: response.response.errors,
              showErrorModal: true
            });
          }
        }
      );
    }
  }

  onChangeFormData(data) {
    const {estimateChangeData} = this.props;
    estimateChangeData(data);
  }

  onSubmitProductData(productionId, index) {
    const {estimateProductionEdit, estimateProductionCreate, prodData, isError} = this.props;
    if (prodData.tabs[index].id) {
      estimateProductionEdit(prodData.tabs[index].id, prodData.tabs[index]).then(
        responce => {
          if (responce.error) {
            this.setState({
              showSuccessModal: true,
              textSuccessModal: responce.error
            });
          } else {
            this.setState({
              showSuccessModal: true
            });
          }
        }
      );
    } else {
      prodData.tabs[index].tmp_field = `${prodData.tabs[index].unique_id}`;
      estimateProductionCreate(this.props.estimateId, prodData.tabs[index]).then(
        responce => {
          if (responce.error) {
            this.setState({
              showSuccessModal: true,
              textSuccessModal: responce.error
            });
          } else {
            this.setState({
              showSuccessModal: true
            });
          }
        }
      );
    }
  }

  onSubmitLock(index, lock) {
    const {estimateProductionLocked, estimateProductionUnlocked, prodData} = this.props;
    const id = prodData.tabs[index].id;

    lock ? estimateProductionLocked(id) : estimateProductionUnlocked(id);

    setTimeout(() => {
      loadData(this.props, parseInt(this.props.params.id, 10));
    }, 0);
  }

  onChangeProductData(data) {
    const {estimateProductionChangeData} = this.props;
    estimateProductionChangeData(data);
  }

  onDeleteProduct(productionId) {
    const {estimateProductionDelete} = this.props;
    estimateProductionDelete(productionId);
  }

  hideSuccessModal() {
    this.setState({
      showSuccessModal: false,
      textSuccessModal: 'Save'
    });
  }

  hideErrorModal() {
    this.setState({
      showErrorModal: false
    });
  }

  handleEstimateUpdatePrice() {
    this.props.estimateUpdatePrice(this.props.estimateId).then(
      responce => {
        if (responce.type === 'ESTIMATE_UPDATE_PRICE_SUCCESS') {
          location.reload();
        }
      }
    );
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
                handleEstimateUpdatePrice={this.handleEstimateUpdatePrice.bind(this)}
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
                lock={this.onSubmitLock.bind(this)}
                change={this.onChangeProductData.bind(this)}
                remove={this.onDeleteProduct.bind(this)}
                updateExperts={this.updateExperts.bind(this)}
              />
            </Col>
          </Row>
        )}
        <ModalSuccess onShowModal={this.state.showSuccessModal} onHideModal={this.hideSuccessModal.bind(this)}
                      actionTitle={this.state.textSuccessModal}/>
        {this.state.error ?
          <ModalError onShowModal={this.state.showErrorModal} onHideModal={this.hideErrorModal.bind(this)}
                      errors={this.state.error}/> : null}
      </div>
    );

  }

}

EstimateEdit.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  estimateLoad: PropTypes.func.isRequired,
  estimateCreate: PropTypes.func.isRequired,
  estimateEdit: PropTypes.func.isRequired,
  estimateChangeData: PropTypes.func.isRequired,
  estimateProductionCreate: PropTypes.func.isRequired,
  estimateProductionEdit: PropTypes.func.isRequired,
  estimateProductionDelete: PropTypes.func.isRequired,
  estimateProductionChangeData: PropTypes.func.isRequired,
  estimateClearData: PropTypes.func.isRequired,
  estimateProductionLocked: PropTypes.func.isRequired,
  estimateProductionUnlocked: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const {isError, isLoading, isUpdating, isLoad, data, prodData, estimateId, productionId, productionUId} = state.estimate;

  return {
    isError,
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
  estimateLoad,
  estimateCreate,
  estimateEdit,
  estimateChangeData,
  estimateProductionCreate,
  estimateProductionEdit,
  estimateProductionDelete,
  estimateProductionChangeData,
  estimateClearData,
  estimateProductionLocked,
  estimateProductionUnlocked,
  estimateUpdatePrice
})(EstimateEdit);
