'use strict';

var React = require( 'react' ),
    SpreadsheetDispatcher = require( '../dispatchers/spreadsheet' ),
    debug = require( 'debug' )('Spreadsheet:cell');

var Cell = React.createClass( {
  updateCell: function( evt ){
    var cell = evt.target
                  .id
                  .split('-')
                  .map( function( number ){ return parseInt( number, 10 ) } ),
        value = evt.target.innerHTML;
    SpreadsheetDispatcher.dispatch( {
      actionType: 'cell-update',
      cell: cell,
      value: value
    } );
  },
  render: function(){
    var self = this;
    return (
      <td id={self.props.rowIndex+'-'+self.props.cellIndex } 
          contentEditable={true}
          onInput={this.updateCell}
          dangerouslySetInnerHTML= {{
            __html: this.props.cell 
          }} />
    )
  }
} );

module.exports = Cell;
