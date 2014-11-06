'use strict';

var Cell = function( content ){
  this._content = content || '';
};

Cell.prototype.content = function( content ){
  return this._content = content ? content : this._content;
};

Cell.prototype.toString = function(){
  return this._content;
};

module.exports = Cell;
