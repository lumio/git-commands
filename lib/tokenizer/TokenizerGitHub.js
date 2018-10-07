const Tokenizer = require( './Tokenizer' );

class TokenizerGitHub extends Tokenizer {
  constructor( text ) {
    super( text );

    this.setRules( [
      {
        name: 'issue-number',
        test: /(\#[\d]+)/,
      },
      {
        name: 'smart-command',
        test: /((close[sd]?|fixe[sd]{1}|fix(es)?|resolve[sd]?) )/i,
      },
    ] );
  }
}

module.exports = TokenizerGitHub;
