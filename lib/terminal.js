const windowSize = require( 'window-size' );
const sliceAnsi = require( 'slice-ansi' );
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
    this.onResize = this.onResize.bind( this );
    this.print = this.print.bind( this );
    this.refresh = this.refresh.bind( this );
    this.render = this.render.bind( this );

    this.state = {
      cursorPos: null,
      size: null,
    };

    this.onResize();
    this.render();
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

  onResize() {
    this.state.size = windowSize.get();
    this.refresh();
  }

  start() {
    process.stdout.on( 'resize', this.onResize );
    process.stdin.on( 'keypress', this.onData );
    process.stdin.setRawMode( true );
    process.stdin.resume();
  }

  print( val ) {
    process.stdout.write( val );
  }

  refresh() {
    //
  }

  render( lines ) {
    if ( !lines || !lines.length ) {
      return;
    }

    for ( const line of lines ) {
      this.print( sliceAnsi( line, 0, this.state.size.width ) );
    }
  }
}

module.exports = Terminal;
