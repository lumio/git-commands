const chalk = require( 'chalk' );

// Each item is a chalk command. (See https://github.com/chalk/chalk)
// So [ [ 'hex', '#f00' ], underline ] will print the text in red and underlined
const defaultOptions = {
  colors: {
    'text': [],
    'issue-number': [ 'cyan' ],
    'initial-issue-number': [ 'cyan', 'bold', 'underline' ],
    'smart-command': [ 'underline' ] ,
  },
};

const chainChalk = ( colorChain ) => {
  let chainedFn = chalk.reset;

  for ( const item of colorChain ) {
    let base = item;
    let args = [];

    if ( item.constructor === Array ) {
      base = item.shift();
      args = item;
    }

    if ( !chainedFn[ base ] ) {
      throw new Error( chalk.red( `The method "${ chalk.bold.italic( base ) }" does not exist on chalk or the current chalk chain.` ) );
    }
    chainedFn = chainedFn[ base ];

    if ( args.length ) {
      chainedFn = chainedFn.apply( chalk, args );
    }
  }

  return chainedFn;
};

const colorToken = ( token, options ) => {
  const chain = ( options.colors || {} )[ token.type ] || [];
  const colorFn = chainChalk( chain );

  return colorFn( token.content );
};

const formatTokens = ( tokens = [], options = {}, limit = 0 ) => {
  const defaultColor = [ '' ];

  const useOptions = {
    ...defaultOptions,
    ...options,
  };

  let result = '';
  for ( const token of tokens ) {
    result += colorToken( token, useOptions );
  }

  return result;
};

module.exports = formatTokens;
