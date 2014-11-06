'use strict';

var React = require( 'react' ),
    saveAs = require( '../libs/filesaver' );

var Toolbar = React.createClass( {
  componentDidMount: function(){
  },
  dowloadSpreadsheet: function( evt ){
    var datas = this.props.spreadsheetStore.toString().replace( /^\n/, '' );
    saveAs( new Blob( [datas], {type: "text/plain;charset=utf-8"} ), 'spreadsheet.csv' );
  },
  render: function(){
    return (
      <div className="col-md-10 col-md-offset-1">
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a ref="download" className="navbar-brand" href="#" onClick={this.dowloadSpreadsheet}><span className="glyphicon glyphicon-download-alt"></span></a>
              <a className="navbar-brand" href="#"><span className="glyphicon glyphicon-info-sign"></span></a>
            </div>
          </div>
        </nav>
      </div>
    )
  }
} );

module.exports = Toolbar;
