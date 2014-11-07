var Cell = require( '../entities/cell' ),
    debug = require( 'debug' )('Spreadsheet:spreadsheetStore'),
    SpreadsheetDispatcher = require( '../dispatchers/spreadsheet' ),
    EventEmitter = require( 'events' ).EventEmitter,
    inherits = require( 'util' ).inherits,
    _ = require( 'lodash' );

var SpreadsheetStore = function( width, height, def ){
  var self = this;
  this._dispatcherToken = SpreadsheetDispatcher.register( _.bind( this.dispatcherCallback, this ) );
  this._grid = _.range( width ).map( function(row ){
    return _.range( height ).map( function( cell ){
      return new Cell( def, self );
    } );
  } );
};
inherits( SpreadsheetStore, EventEmitter );

SpreadsheetStore.prototype.dispatcherCallback = function( payload ){
  switch( payload.actionType ){
    
    case 'cell-update':
      this.cell( payload.cell ).content( payload.value );
      break;
    
    case 'cell-selected':
      this.emit( 'reset:status' );
      var cell = this.cell( payload.cell ),
          isSelect = cell.status( 'selected' );
      if( !isSelect ){
        cell.status( 'selected', true );
      }
      this.emit( 'change' );
      break;

    case 'cell-active':
      // FIXED: https://code.google.com/p/chromium/issues/detail?id=170148
      // When the content is editable the cursor is hidden until press a key
      this.emit( 'reset:status' );
      var cell = this.cell( payload.cell ),
          isActive = cell.status( 'active' );
      if( !isActive ){
        cell.status( 'selected', true );
        cell.status( 'active' , true );
      }else{
        cell.status( 'selected', false );
        cell.status( 'active' , false );
      }
      this.emit( 'change' );
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
  var self = this;
  this._grid = csv.split(/\n/)
                  .filter(function(row){ return row !== "" })
                  .map( function( row ){ return row.split(',').map( function( content ){ return new Cell( content, self ); } ); } );
};

SpreadsheetStore.prototype.toString = function( isExport ){
  return _.reduce( this._grid, function( memo, row ){
    return memo + row.map( function( cell ){ return cell.toString( isExport ); } ).join(',') + '\n';
  }, '\n' );
};

module.exports = SpreadsheetStore;
