'use strict';

var React = require( 'react' ),
    debug = require( 'debug' )('Spreadsheet:spreadsheet'),
    Row = require( './row' ),
    dragDrop = require('drag-drop/buffer');

var Spreadsheet = React.createClass( {
  componentDidMount: function(){
    var self = this;
    dragDrop( 'body', function( files ){
      files.forEach( function( file ){
        self.props.spreadsheetStore.updateFromCSV( file.toString( 'utf8' ) );
        self.forceUpdate();
        debug( self.props.spreadsheetStore.toString() );
      } );
    });
  },
  render: function(){
    return (
      <div className="col-md-12">
        <table className="table table-bordered">
          <tbody>
          {
            this.props.spreadsheetStore.grid().map( function( row, index ){
              return <Row key={index} row={row} rowIndex={index} />
            } )
          }
          </tbody>
        </table>
      </div>
    )
  }
} );

module.exports = Spreadsheet;
