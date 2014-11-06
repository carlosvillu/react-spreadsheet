'use strict';

var React = require( 'react' ),
    debug = require('debug'),
    SpreadsheetStore = require( './stores/spreadsheet' ),
    Spreadsheet = require( './components/spreadsheet' ),
    spreadsheetStore = new SpreadsheetStore( 50, 50 );

debug.enable( 'Spreadsheet:*' );

React.render( <Spreadsheet spreadsheetStore={spreadsheetStore} />, document.getElementById( 'spreadsheet-container' ) );
