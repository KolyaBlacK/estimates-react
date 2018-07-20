import React, {Component} from 'react'
import TrEstimate from './TrEstimate'

class ItemEstimates extends Component {
  render() {
    return (
      <tbody>
      {
        this.props.estimates.map((estimate, index) => {
          return (
            <TrEstimate noBtns={this.props.noBtns} key={index} {...estimate} onShowModal={this.props.onShowModal}
                        onShowExpertsModal={this.props.onShowExpertsModal} noExperts={this.props.noExperts}/>
          )
        })
      }
      </tbody>
    )
  }
}

export default ItemEstimates
