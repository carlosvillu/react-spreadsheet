'use strict';

var CellMixin = {
  coords: function( node ){
    return node.id
                .split('-')
                .map( function( number ){ return parseInt( number, 10 ) } );
  }
};

module.exports = CellMixin;
