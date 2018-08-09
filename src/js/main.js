/**************************************
 * App bar
 **************************************/

const appBars = document.getElementsByClassName( 'app-bar' );
let container = document.getElementsByClassName( 'container' )[0];

if( appBars )
{
	for( let i = 0; i < appBars.length; i++ )
	{
		let appBar = appBars[i];

		['resize', 'load'].forEach( ( e ) => {
			window.addEventListener( e, function () {
				let height = appBar.getBoundingClientRect().height;
				container.style.setProperty( '--app-bar-height', `${height}px` );
			});
		});

		/*
		TODO turn back on when browser support is better
		new ResizeObserver( () => {
			let height = appBar.getBoundingClientRect().height;
			container.style.setProperty( '--app-bar-height', `${height}px` );
		}).observe(appBar);
		*/	 
	}
}

/**************************************
* Buttons
/**************************************/

const buttons = document.getElementsByClassName( 'button' );

if( buttons )
{
	for( let i = 0; i < buttons.length; i++ )
	{
		let button = buttons[i];

		button.addEventListener( 'click', e => {
			let rect = e.target.getBoundingClientRect(),
			x = Math.ceil( e.clientX - rect.left ),
			y = Math.ceil( e.clientY - rect.top );

			console.log(x, y);
		});
	}
}

/**************************************
* Data tables
**************************************/

const dataTables = document.getElementsByClassName( 'data-table' );

if( dataTables )
{
	for( let i = 0; i < dataTables.length; i ++ )
	{
		let dataTable = dataTables[i];

		let container = document.createElement( 'div' );
		dataTable.parentNode.insertBefore( container, dataTable );
		container.classList.add( 'data-table--responsive' );
		container.appendChild(dataTable);
	}
}

/**************************************
* Navigation drawer
**************************************/

const drawers = document.getElementsByClassName( 'drawer' );

if( drawers )
{
	for( let i = 0 ; i < drawers.length; i++ )
	{
		let drawer = drawers[i];
		let parents = drawer.querySelectorAll( '.drawer__item--parent' );
		let children = drawer.querySelectorAll( '.drawer__item__children' );

		children.forEach( child => {
			let height = child.getBoundingClientRect().height;
			child.style.setProperty( '--drawer__item__children-height', `${height}px` );
			child.style.height = 0;
		});
	}
}

/**************************************
 * Menu
 **************************************/

const menus = document.getElementsByClassName( 'menu' );

if( menus )
{
	for( let i = 0; i < menus.length; i++ )
	{
		let menu = menus[i];
		let style = menu.getBoundingClientRect();
		let width = style.width;
		let height = style.height;

		menu.style.setProperty( '--menu-max-width', 0 );
		menu.style.setProperty( '--menu-max-height', 0 );

		let observer = new MutationObserver( ( mutations ) => {
			mutations.forEach( ( mutation ) => {
				if( mutation.attributeName === 'class' ) {
					let attributeValue = document.getElementById( mutation.target.id ).getAttribute( mutation.attributeName );

					if( attributeValue.indexOf('active') > -1 )
					{
						menu.style.setProperty( '--menu-max-width', `${width}px` );
						menu.style.setProperty( '--menu-max-height', `${height}px` );
					} else {
						menu.style.setProperty( '--menu-max-width', 0 );
						menu.style.setProperty( '--menu-max-height', 0 );
					}
				}
			});
		});
		observer.observe( menu, {
			attributes: true
		});
/*
		menu.addEventListener( 'active', () => {
			console.log(1);
			menu.style.setProperty( '--menu-max-width', `${width}px`);
			menu.style.setProperty( '--menu-max-height', `${height}px` );
		});

		menu.addEventListener( 'inactive', () => {
			console.log(2);
			menu.style.setProperty( '--menu-max-width', 0 );
			menu.style.setProperty( '--menu-max-height', 0 );
		});*/
	}
}

/**************************************
* Tabs
**************************************/

const tabs = document.getElementsByClassName( 'tabs__tab' );

if( tabs )
{
	for( let i = 0; i < tabs.length; i++ )
	{
		let tab = tabs[i];
		let width = tab.getBoundingClientRect().width;

		tab.style.setProperty( '--tabs__tab-width', `${width}px` );

		tab.addEventListener( 'click', e => {
			let rect = e.target.getBoundingClientRect(),
			left = Math.ceil( e.clientX - rect.left ),
			top = Math.ceil( e.clientY - rect.top );

			tab.style.setProperty( '--tabs__tab__ripple-left', `${left}px` );
			tab.style.setProperty( '--tabs__tab__ripple-top', `${top}px` );
		});
	}
}

/**************************************
* Text fields
**************************************/

const textFields = document.getElementsByClassName( 'text-field__input' );

if( textFields )
{
	for( let i = 0; i < textFields.length; i++ ) 
	{
		let textField = textFields[i];
		let value = textField.value;
		let container = textField.parentElement;

		if( !container ) 
		{
			console.error('Input does not have a container');
		}

		value !== '' && value.length > 0 ? container.classList.add( 'text-field--active' ) : container.classList.remove( 'text-field--active' );

		textField.addEventListener( 'focus', () => {
			container.classList.add( 'text-field--focus' );
		});

		textField.addEventListener( 'blur', () => {
			container.classList.remove( 'text-field--focus' );
		});

		textField.addEventListener( 'input', () => {
			value = textField.value;

			if( value !== '' && value.length > 0 )
			{
				container.classList.add( 'text-field--active' );
			} else {
				container.classList.remove( 'text-field--active' );
			}
		});
	}
}

/**************************************
* Tooltips
**************************************/

const tooltips = document.getElementsByClassName( 'tooltip__content' );

if( tooltips )
{
	for( let i = 0; i < tooltips.length; i++ )
	{
		let tooltip = tooltips[i];
		let width = tooltip.getBoundingClientRect().width;
		tooltip.style.setProperty( '--tooltip-width', `${width}px` );
	}
}

/**************************************
* Triggers
**************************************/

const triggers = document.querySelectorAll( '[data-trigger]' );
const active = new Event('active', {'bubbles': true, 'cancelable': true});
const inactive = new Event('inactive', {'bubbles': true, 'cancelable': true});
let triggered = []; // Store all elements that are triggered

if( triggers )
{
	for( let i = 0; i < triggers.length; i++ )
	{
		let trigger = triggers[i];
		let id = trigger.dataset.trigger;
		let element = document.getElementById( id );

		trigger.classList.add('cursor--pointer');

		if( !element )
		{
			console.error('Trigger element not found');
		}

		if( element ) {
			let className = `${element.classList[ 0 ]}--active`;

			trigger.addEventListener( 'click', () =>
			{
			// Set the currently triggered element(s) in array
			triggered.indexOf( element ) < 0 ? triggered.push( element ) : '';

			if( element.classList.contains( className ) ) {
				element.classList.remove( className );
				document.dispatchEvent( inactive );
			} else {
				element.classList.add( className );
				document.dispatchEvent( active );
				}
			} );

			document.addEventListener( 'mouseup', ( e ) =>
			{
				for( let i = 0; i < triggered.length; i++ ) 
				{
					let trigger = triggered[ i ];

					if( trigger === e.target || trigger !== e.target && !trigger.contains( e.target ) ) {
						trigger.classList.remove( className );
						document.dispatchEvent( inactive );

						// Remove element from array
						i === 0 ? triggered.shift() : triggered.slice( i, 1 );
					}
				}
			});
		}
	}
}