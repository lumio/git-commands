// const chalk = require( 'chalk' );
// const hasUnicode = require( 'has-unicode' );
// const stringWidth = require( 'string-width' );
// const windowSize = require( 'window-size' );
// const sliceAnsi = require( 'slice-ansi' );
//
// if ( hasUnicode() ) {
  // console.log( 'Supports unicode... probably' );
// }
// else {
  // console.log( 'Does not supports unicode... probably' );
// }
//
// console.log( 'Size' );
// console.log( windowSize.get() );
//
// console.log( 'String width', stringWidth( '😇 test' ) );
//
// const input =
  // chalk.blue( 'Hello world' ) + chalk.red( 'testing' );
// console.log( sliceAnsi( input, 2, 12 ) );

class Terminal {
  constructor() {
    this.onData = this.onData.bind( this );
  }

  onData( data ) {
    const hex = data.toString( 'hex' );
    switch( hex ) {
      case '03': // ctrl-c
        console.log( 'ctrl-c', hex );
        return process.exit();

      case '1b': // ESC
        return console.log( 'esc', hex );

      case '7f': // backspace
        return console.log( 'backspace', hex );

      case '0d': // enter
        return console.log( 'enter', hex );

      // cursor
      case '1b5b44':
        return console.log( 'left', hex );
      case '1b5b43':
        return console.log( 'right', hex );
      case '1b5b42':
        return console.log( 'down', hex );
      case '1b5b41':
        return console.log( 'up', hex );
    }

    console.log( `key: ${ data.toString() }, hex: ${ data.toString( 'hex' ) }` );
  }

  start() {
    process.stdin.setRawMode( true );
    process.stdin.on( 'data', this.onData );
    process.stdin.resume();
  }
}

module.exports = Terminal;
