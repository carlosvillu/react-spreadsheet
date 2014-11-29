'use strict';

var React = require( 'react' ),
    SpreadsheetDispatcher = require( '../dispatchers/spreadsheet' ),
    saveAs = require( '../libs/filesaver' );

var Toolbar = React.createClass( {
  componentDidMount: function(){
  },
  dowloadSpreadsheet: function( evt ){
    var datas = this.props.spreadsheetStore.toString( true ).replace( /^\n/, '' ),
        name =  prompt("Please enter your name", "spreadsheet.csv");
    saveAs( new Blob( [datas], {type: "text/plain;charset=utf-8"} ), name || 'spreadsheet.csv' );
  },
  addRowSpreadsheet: function(){
    SpreadsheetDispatcher.dispatch( {
      actionType: 'spreadsheet-add-row',
    } );
  },
  addColumnSpreadsheet: function(){
    SpreadsheetDispatcher.dispatch( {
      actionType: 'spreadsheet-add-column',
    } );
  },
  render: function(){
    return (
      <div className="col-md-10 col-md-offset-1">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a ref="download" className="navbar-brand" href="#" onClick={this.dowloadSpreadsheet}><span className="glyphicon glyphicon-download-alt"></span></a>
              <a ref="addRow" className="navbar-brand" href="#" onClick={this.addRowSpreadsheet}><span className="glyphicon glyphicon-resize-vertical"></span></a>
              <a ref="addColumn" className="navbar-brand" href="#" onClick={this.addColumnSpreadsheet}><span className="glyphicon glyphicon-resize-horizontal"></span></a>
              <a className="navbar-brand" href="#"><span className="glyphicon glyphicon-info-sign"></span></a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
} );

module.exports = Toolbar;
