const chalk = require( 'chalk' );
const hasUnicode = require( 'has-unicode' );
const stringWidth = require( 'string-width' );
const windowSize = require( 'window-size' );
const sliceAnsi = require( 'slice-ansi' );

if ( hasUnicode() ) {
  console.log( 'Supports unicode... probably' );
}
else {
  console.log( 'Does not supports unicode... probably' );
}

console.log( 'Size' );
console.log( windowSize.get() );

console.log( 'String width', stringWidth( '😇 test' ) );

const input =
  chalk.blue( 'Hello world' ) + chalk.red( 'testing' );
console.log( sliceAnsi( input, 2, 12 ) );
