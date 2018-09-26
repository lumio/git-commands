const chalk = require( 'chalk' );
const Terminal = require( './lib/terminal' );

const t = new Terminal();

t.start();
t.render( [
  chalk.cyan( 'GOR-1' ) + ' A rather long commit message that exceeds th'
  + chalk.bgRed( 'e 50 char limit' )
] );
