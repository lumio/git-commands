const chalk = require( 'chalk' );
const stringWidth = require( 'string-width' );
const sliceAnsi = require( 'slice-ansi' );
const stripAnsi = require( 'strip-ansi' );

// Each item is a chalk command. (See https://github.com/chalk/chalk)
// So [ [ 'hex', '#f00' ], underline ] will print the text in red and underlined
const defaultOptions = {
  colors: {
    'text': [],
    'issue-number': [ 'cyan' ],
    'initial-issue-number': [ 'cyan', 'bold', 'underline' ],
    'smart-command': [ 'underline' ],
    'excess': [ [ 'hex', '#fff' ], [ 'bgHex', '#ef2f6f' ] ],
  },
  limit: 0,
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

const formatTokens = ( tokens = [], options = {} ) => {
  const defaultColor = [ '' ];

  const useOptions = {
    ...defaultOptions,
    ...options,
  };

  let result = '';
  for ( const token of tokens ) {
    result += colorToken( token, useOptions );
  }

  if ( options.limit > 0 && stringWidth( result ) > options.limit ) {
    const underLimit = sliceAnsi( result, 0, options.limit );
    const overLimit = sliceAnsi( result, options.limit );
    result = underLimit + colorToken( {
      content: stripAnsi( overLimit ),
      type: 'excess',
    }, useOptions );
  }

  return result;
};

module.exports = formatTokens;
