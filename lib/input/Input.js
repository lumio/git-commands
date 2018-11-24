const chalk = require( 'chalk' );
const keypress = require( 'keypress' );
const ansiEscapes = require( 'ansi-escapes' );
const formatTokens = require( '../formatTokens' );

class Input {
  constructor() {
    this.lines = [];
    this.printed = '';
    this.tokenizerFn = () => [];
    this.position = [ 0, 0 ];
    this.options = {};
  }

  checkOnEnterCallback( key ) {
    if ( !key.name ) {
      return false;
    }

    // Start new line
    console.log();

    // Check if callback function exists
    this.lines.push( this.printed );
    const fn = this.options.onEnter;
    let result = undefined;
    if ( fn ) {
      result = fn( this.lines.join( '\n' ), key );
    }

    this.printed = '';
    this.position = [ 0, 0 ];

    if ( result === false ) {
      process.stdin.pause();
    }
  }

  backspace( positionDiff, x, deleteUnderCursor = false ) {
    const newPositionDiff = [ ...positionDiff ];
    const part1Sub = deleteUnderCursor ? 0 : 1;
    const part2Sub = deleteUnderCursor ? 1 : 0;

    this.printed = this.printed.substring( 0, x - part1Sub )
      + this.printed.substring( x + part2Sub, this.printed.length );
    newPositionDiff[ 0 ] -= part1Sub;

    return newPositionDiff;
  }

  update( ch, key ) {
    const oldPrinted = this.printed;
    const [ x, y ] = this.position;
    let add = '';
    let positionDiff = [ 0, 0 ];

    if ( key && key.name ) {
      switch ( key.name ) {
        case 'escape':
          break;
        case 'backspace':
          positionDiff = this.backspace( positionDiff, x );
          break;

        case 'up':
          positionDiff[ 1 ] -= 1;
          break;
        case 'down':
          positionDiff[ 1 ] += 1;
          break;
        case 'left':
          positionDiff[ 0 ] -= 1;
          break;
        case 'right':
          positionDiff[ 0 ] += 1;
          break;

        case 'return':
        case 'enter':
          this.checkOnEnterCallback( key );
          break;

        case 'a':
          if ( key.ctrl ) {
            positionDiff[ 0 ] = -x;
            break;
          }
        case 'e':
          if ( key.ctrl ) {
            positionDiff[ 0 ] = oldPrinted.length - x;
            break;
          }
        case 'd':
          if ( key.ctrl ) {
            positionDiff = this.backspace( positionDiff, x, true );
            break;
          }
        case 'h':
          if ( key.ctrl ) {
            positionDiff = this.backspace( positionDiff, x );
            break;
          }
        default:
          if ( key.ctrl ) {
            break;
          }

          add = ch ? ch : '';
      }
    }
    else {
      add = ch;
    }

    if ( add ) {
      this.printed = this.printed.substring( 0, x )
        + add
        + this.printed.substring( x, this.printed.length );
      positionDiff[ 0 ] += add.length;
    }

    if ( oldPrinted !== this.printed ) {
      this.render( this.printed, oldPrinted );
    }
    this.setPosition( positionDiff );
  }

  render( newState, oldState ) {
    const tokenObject = this.tokenizerFn( newState );
    const rendered = formatTokens( tokenObject.getTokens(), this.options );

    process.stdout.write(
      ansiEscapes.eraseLine
      + ansiEscapes.cursorLeft
      + rendered
    );
  }

  setPosition( positionDiff ) {
    const [ xDiff, yDiff ] = positionDiff;
    const [ x, y ] = this.position;
    const newXPos = Math.min(
      Math.max( x + xDiff, 0 ),
      this.printed.length
    );
    const newYPos = y;
    this.position = [ newXPos, newYPos ];
    process.stdout.write( ansiEscapes.cursorTo( newXPos ) );
  }

  init( tokenizerFn, options = {} ) {
    this.tokenizerFn = tokenizerFn;
    this.options = options;

    keypress( process.stdin );
    process.stdin.on( 'keypress', ( ch, key ) => {
      if ( key && key.ctrl && key.name === 'c' ) {
        process.stdin.pause();
        console.log( chalk.grey( '^C' ) );
        return;
      }

      this.update( ch, key );
    } );

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
}

module.exports = new Input();
