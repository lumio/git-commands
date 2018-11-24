const tokenizer = require( './lib/tokenizer' );
const formatTokens = require( './lib/formatTokens' );
const input = require( './lib/input' );

input.init( tokenizer( 'jira' ), {
  limit: 50,
  onEnter: ( text ) => {
    if ( text.substr( -1 ) === '\n' ) {
      console.log( text.trim() );
      return false;
    }
  },
} );

// const t1 = tokenizer( 'JIRA' )( 'GITC-9 Some commit message and a #smart-command with a message GITC-10 over the limit' );
// console.log( formatTokens( t1.getTokens(), { limit: 50 } ) );
//
// const t2 = tokenizer( 'github' )( 'Some text referring issue and closes #1' );
// console.log( formatTokens( t2.getTokens(), { limit: 50 } ) );
