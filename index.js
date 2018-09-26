const chalk = require( 'chalk' );
const Terminal = require( './lib/terminal' );

const t = new Terminal();

( async () => {
  await t.start();
  const { cursorPos } = t.state;
  console.log( cursorPos );

  t.render( [
    chalk.cyan( 'GITC-1' ) + ' A rather long commit message that exceeds th'
    + chalk.bgRed( 'e 50 char limit' )
  ] );
  t.setCursorPos( cursorPos.row, cursorPos.col );
} )();
