const tokenizer = require( './lib/tokenizer' );
const formatTokens = require( './lib/formatTokens' );

const t1 = tokenizer( 'GITC-9 Some commit message and a #smart-command', 'JIRA' );
console.log( formatTokens( t1.getTokens() ) );

const t2 = tokenizer( 'Some text referring issue and closes #1', 'github' );
console.log( formatTokens( t2.getTokens() ) );
