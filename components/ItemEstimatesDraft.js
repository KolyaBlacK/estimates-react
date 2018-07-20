import React, {Component} from 'react'
import TrEstimateDraft from './TrEstimateDraft'

class ItemEstimatesDraft extends Component {
  render() {
    return (
      <tbody>
      {
        this.props.estimates.map((estimate, index) => {
          return (
            <TrEstimateDraft key={index} {...estimate} onShowModal={this.props.onShowModal}
                             onShowExpertsModal={this.props.onShowExpertsModal}/>
          )
        })
      }
      </tbody>
    )
  }
}

export default ItemEstimatesDraft
