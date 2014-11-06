'use strict';

var React = require( 'react' ),
    Cell = require( './cell' );

var Row = React.createClass( {
  render: function(){
    var self = this;
    return (
      <tr>
        {
          this.props.row.map( function( cell, index ){
            return <Cell key={index} cell={cell} cellIndex={index} {...self.props}/> 
          } )
        }
      </tr>
    )
  }
} );

module.exports = Row;
