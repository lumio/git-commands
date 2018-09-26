const windowSize = require( 'window-size' );
const sliceAnsi = require( 'slice-ansi' );
const keypress = require( 'keypress' );
const ansiEscapes = require( 'ansi-escapes' );
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
    this.currentLines = [];

    this.state = {
      cursorPos: null,
      size: null,
    };

    this.onResize();
  }

  onData( ch, key ) {
    process.stdout.write( ch );

    if ( key && key.ctrl && key.name === 'c' ) {
      process.stdin.pause();
    }
  }

  onResize() {
    this.state.size = windowSize.get();
    this.refresh();
  }

  initCursorPos() {
    return new Promise( ( resolve ) => {
      process.stdin.setRawMode( true );
      process.stdin.once( 'data', ( data ) => {
        const match = /\[(\d+)\;(\d+)R$/.exec( data.toString() );
        if ( !match ) {
          resolve(this.setCursorPos(
            this.state.size.height,
            1,
            true
          ) );
        }

        resolve( this.setCursorPos(
          parseInt( match[ 1 ], 10 ),
          parseInt( match[ 2 ], 10 ),
          true
        ) );
      } );
      this.print( ansiEscapes.cursorGetPosition );
    } )
  }

  setCursorPos( row, col, skipActualSet = false ) {
    const newPos = {
      row,
      col,
    };
    this.state.cursorPos = newPos;

    if ( !skipActualSet ) {
      this.print( ansiEscapes.cursorTo( col - 1, row - 1 ) );
    }

    return newPos;
  }

  async start() {
    process.stdin.setRawMode( true );
    await this.initCursorPos();
    process.stdout.on( 'resize', this.onResize );
    process.stdin.on( 'keypress', this.onData );
    process.stdin.resume();
  }

  print( val ) {
    process.stdout.write( val );
  }

  refresh() {
    this.render( this.currentLines );
  }

  render( lines ) {
    this.currentLines = lines;
    if ( !lines || !lines.length ) {
      return;
    }

    for ( const line of lines ) {
      this.print( sliceAnsi( line, 0, this.state.size.width ) );
    }
  }
}

module.exports = Terminal;
