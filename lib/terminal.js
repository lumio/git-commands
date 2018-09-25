const keypress = require( 'keypress' );
keypress( process.stdin );

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

  onData( ch, key ) {
    if ( !key ) {
      console.log( `char: ${ ch }` );
      return;
    }

    console.log( `key: ${ key.name } ctrl: ${ key.ctrl.toString() }` );

    if ( key && key.ctrl && key.name === 'c' ) {
      process.stdin.pause();
    }
  }

  start() {
    process.stdin.on( 'keypress', this.onData );
    process.stdin.setRawMode( true );
    process.stdin.resume();
  }
}

module.exports = Terminal;
