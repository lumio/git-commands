const Tokenizer = require( './Tokenizer' );

class TokenizerJira extends Tokenizer {
  constructor( text ) {
    super( text );

    this.setRules( [
      {
        name: 'initial-issue-number',
        test: /^([\w]+\-[\d]+)/,
      },
      {
        name: 'issue-number',
        test: /[\w]+\-[\d]+/,
      },
      {
        name: 'smart-command',
        test: /(\#[^\s]+)/,
      },
    ] );
  }
}

module.exports = TokenizerJira;
