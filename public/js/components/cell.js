'use strict';

var React = require( 'react' );

var Cell = React.createClass( {
  render: function(){
    var self = this;
    return (
      <td id={self.props.rowIndex+'-'+self.props.cellIndex } contentEditable="true">
        {this.props.cell}
      </td>
    )
  }
} );

module.exports = Cell;
