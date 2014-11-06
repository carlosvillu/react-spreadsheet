'use strict';

var React = require( 'react' ),
    Spreadsheet = require( './spreadsheet' ),
    Toolbar = require( './toolbar' ),
    SpreadsheetStore = require( '../stores/spreadsheet' ),
    spreadsheetStore = new SpreadsheetStore( 50, 50 );

var Application = React.createClass( {
  render: function(){
    return (
      <div className="col-md-12">
        <div className="row">
          <Toolbar spreadsheetStore={spreadsheetStore} />
          <Spreadsheet spreadsheetStore={spreadsheetStore} />
        </div>
      </div>
    )
  }
} );

module.exports = Application;
