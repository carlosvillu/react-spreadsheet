'use strict';

var React = require( 'react/addons' ),
    CellMixin = require( '../mixins/cell' ),
    SpreadsheetDispatcher = require( '../dispatchers/spreadsheet' ),
    debug = require( 'debug' )('Spreadsheet:cell');

var Cell = React.createClass( {
  mixins: [CellMixin],
  updateCell: function( evt ){
    var cell = this.coords( evt.target ),
        value = evt.target.innerHTML;
    SpreadsheetDispatcher.dispatch( {
      actionType: 'cell-update',
      cell: cell,
      value: value
    } );
  },

  selectCell: function( evt ){
    var cell = this.coords( evt.target );
    SpreadsheetDispatcher.dispatch( {
      actionType: 'cell-selected',
      cell: cell
    } );
  },

  activeCell: function( evt ){
    var cell = this.coords( evt.target );
    SpreadsheetDispatcher.dispatch( {
      actionType: 'cell-active',
      cell: cell
    } );
  },

  render: function(){
    var self = this,
        classes = React.addons.classSet({ 
          cell: true, 
          selected: this.props.cell.status( 'selected' ),
          active: this.props.cell.status( 'active' )
        });
    return (
      <td id={self.props.rowIndex+'-'+self.props.cellIndex } 
          className={classes}
          contentEditable={this.props.cell.status( 'active' )}
          onClick={this.selectCell}
          onDoubleClick={this.activeCell}
          onInput={this.updateCell}
          dangerouslySetInnerHTML= {{
            __html: this.props.cell.toString()
          }} />
    )
  }
} );

module.exports = Cell;
