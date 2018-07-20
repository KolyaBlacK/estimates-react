import React, {Component} from 'react'
import TrEstimateArchive from './TrEstimateArchive'

class ItemEstimatesArchive extends Component {
  render() {
    return (
      <tbody>
      {
        this.props.estimates.map((estimate, index) => {
          return (
            <TrEstimateArchive key={index} {...estimate} onShowModal={this.props.onShowModal}
                               onShowExpertsModal={this.props.onShowExpertsModal}/>
          )
        })
      }
      </tbody>
    )
  }
}

export default ItemEstimatesArchive
