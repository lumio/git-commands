const blessed = require( 'blessed' );

const screen = blessed.screen( {
  smartCSR: true,
  autoPadding: true,
} );

screen.title = 'my window title';
screen.height = 3;
const box = blessed.box( {
  top: 'center',
  left: 'center',
  width: '80%',
  height: '20%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'gray',
    border: {
      fg: '#f0f0f0',
    },
    hover: {
      bg: 'green',
    },
  },
} );

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function(ch, key) {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

screen.append( box );

// Quit on Escape, q, or Control-C.
screen.key( [ 'escape', 'q', 'C-c' ], function( ch, key ) {
  return process.exit( 0 );
} );

// box.focus();
screen.render();
