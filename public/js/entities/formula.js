'use strict';

var debug = require( 'debug' )( 'Spreadsheet:entity:formula' ),
    _ = require( 'lodash' ),
    mathjs = require( 'mathjs' );

var OPERANDOS = /([A-Z]+[0-9]+)/g;

var Formula = function( expression, spreadsheet ){
  this._expression = expression;
  this._spreadsheet = spreadsheet;
};

Formula.prototype.parse = function(){
  var self = this,
      dicc;
  dicc = this._expression.split( OPERANDOS )
    .filter( function( elem ){
      return elem.match( OPERANDOS );
    } )
    .reduce( function( dicc, oper ){
      dicc[oper] = self._spreadsheet.cell( [self.y(oper), self.x( oper )] ).content();
      return dicc;
    }, {} );

  return _.keys( dicc ).reduce( function( expression, entry ){
    return expression.replace( new RegExp( entry, 'g' ), dicc[entry] );
  }, this._expression ).replace( /^=/, '' );
};

Formula.prototype.x = function( oper ){
  var X = /[A-Z]+/,
      XAXY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z' ],
      literals = oper.match( X )[0].split( '' );

  return literals.reduce( function( x, literal, index ){
    return x + ( _.lastIndexOf(XAXY, literal) + ( XAXY.length * index ) );
  }, 0 );

};

Formula.prototype.y = function( oper ){
  var Y = /[0-9]+/;

  return parseInt( oper.match( Y )[0], 10 );
};

Formula.prototype.resolve = function(){
  var result;
  try{
    result = mathjs.eval( this.parse() );
  } catch( e ) {
    result = "#!ERROR";
  }
  return result;
};

module.exports = Formula;
