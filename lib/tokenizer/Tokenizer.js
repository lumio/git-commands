class Tokenizer {
  constructor( text ) {
    this.text = text;
    this.rules = [];
    this.tokens = [];
    this.hasChanged = true;
  }

  update( text ) {
    this.text = text;
    this.hasChanged = true;
  }

  setRules( rules ) {
    this.rules = rules;
  }

  pushText( content, at, tokens ) {
    tokens.push( {
      content,
      at,
      type: 'text',
    } );
  }

  fillGaps( unfilledTokens ) {
    const tokens = [];
    let text = this.text;
    let currentPosition = 0;

    for ( const token of unfilledTokens ) {
      const partialText = text.substring( currentPosition, token.at );
      if ( partialText ) {
        this.pushText( partialText, currentPosition, tokens );
      }

      tokens.push( token );
      currentPosition = token.at + token.content.length;
    }

    const tailText = text.substr( currentPosition );
    if ( tailText ) {
      this.pushText( tailText, currentPosition, tokens );
    }

    return tokens;
  }

  getTokens() {
    if ( !this.hasChanged && this.tokens.length ) {
      return this.tokens;
    }

    const tokens = [];
    const rulesInPlace = {};

    for ( const rule of this.rules ) {
      const test = new RegExp( rule.test, 'g' );

      let matched = [];
      while ( ( matched = test.exec( this.text ) ) !== null ) {
        // If another rule is already at the same index, skip this one.
        if ( rulesInPlace[ matched.index ] ) {
          continue;
        }

        rulesInPlace[ matched.index ] = true;
        tokens.push( {
          content: matched[ 0 ],
          at: matched.index,
          type: rule.name,
        } );
      }
    }

    tokens.sort( ( a, b ) => a.at - b.at );
    this.tokens = this.fillGaps( tokens );
    this.hasChanged = false;
    return this.tokens;
  }
}

module.exports = Tokenizer;
