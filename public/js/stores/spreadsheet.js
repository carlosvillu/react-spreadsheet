var _ = require( 'lodash' )

var SpreadsheetStore = function( width, height, def ){
  this._grid = _.range( width ).map( function(row ){
    return _.range( height ).map( function( cell ){
      return def || '';
    } );
  } );
};

SpreadsheetStore.prototype.grid = function(){
  return this._grid;
};

SpreadsheetStore.prototype.updateFromCSV = function( csv ){
  this._grid = csv.split(/\n/)
                  .filter(function(row){ return row !== "" })
                  .map( function( row ){ return row.split(',') } );
};

SpreadsheetStore.prototype.toString = function(){
  return _.reduce( this._grid, function( memo, row ){
    return memo + row.join(',') + '\n';
  }, '\n' );
};

module.exports = SpreadsheetStore;
