'use strict';

var React = require( 'react' ),
    debug = require('debug'),
    Application = require( './components/application' );

debug.enable( 'Spreadsheet:*' );

React.render( <Application />, document.getElementById( 'spreadsheet-container' ) );
