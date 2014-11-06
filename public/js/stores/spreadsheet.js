var Cell = require( '../entities/cell' ),
    debug = require( 'debug' )('Spreadsheet:spreadsheetStore'),
    SpreadsheetDispatcher = require( '../dispatchers/spreadsheet' ),
    EventEmitter = require( 'events' ).EventEmitter,
    inherits = require( 'util' ).inherits,
    _ = require( 'lodash' );

var SpreadsheetStore = function( width, height, def ){
  this._dispatcherToken = SpreadsheetDispatcher.register( _.bind( this.dispatcherCallback, this ) );
  this._grid = _.range( width ).map( function(row ){
    return _.range( height ).map( function( cell ){
      return new Cell( def );
    } );
  } );
};
inherits( SpreadsheetStore, EventEmitter );

SpreadsheetStore.prototype.dispatcherCallback = function( payload ){
  switch( payload.actionType ){
    case 'cell-update':
      this.cell( payload.cell ).content( payload.value );
      break;
    default:
      debug( 'payload.actiontype %s unkown', payload.actionType );
  }
};

SpreadsheetStore.prototype.grid = function(){
  return this._grid;
};

SpreadsheetStore.prototype.cell = function( coords ){
  return this._grid[coords[0]][coords[1]];
};

SpreadsheetStore.prototype.updateFromCSV = function( csv ){
  this._grid = csv.split(/\n/)
                  .filter(function(row){ return row !== "" })
                  .map( function( row ){ return row.split(',').map( function( content ){ return new Cell( content ); } ); } );
};

SpreadsheetStore.prototype.toString = function(){
  return _.reduce( this._grid, function( memo, row ){
    return memo + row.map( function( cell ){ return cell.toString(); } ).join(',') + '\n';
  }, '\n' );
};

module.exports = SpreadsheetStore;
