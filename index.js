const chalk = require( 'chalk' );
const Terminal = require( './lib/terminal' );

const t = new Terminal();

( async () => {
  await t.start();
  const { cursorPos } = t.state;
  console.log( cursorPos );

  t.subscribe( 'data', ( { char, key } ) => {
    if ( key.name === 'return' ) {
      console.log();
    }
    else if ( key.name === 'backspace' ) {
      t.moveCursor( -1, 0 );
      t.print( ' ' );
      t.moveCursor( -1, 0 );
    }
    else {
      t.print( char );
    }
  } );
  t.render( [
    chalk.cyan( 'GITC-1' ) + ' A rather long commit message that exceeds th'
    + chalk.bgRed( 'e 50 char limit' )
  ] );
  t.setCursorPos( cursorPos.row, cursorPos.col );
} )();
