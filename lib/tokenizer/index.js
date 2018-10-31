const TokenizerJira = require( './tokenizerJira' );
const TokenizerGitHub = require( './tokenizerGitHub' );

const tokenizer = ( dialect ) => ( text ) => {
  switch ( dialect.toLowerCase() ) {
    case 'jira':
      return new TokenizerJira( text );
    case 'github':
      return new TokenizerGitHub( text );

    default:
      throw new Error( 'Unknown dialect' );
  }
};

module.exports = tokenizer;
