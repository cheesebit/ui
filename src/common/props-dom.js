import PropTypes from 'prop-types';

// Based on @types/react/index.d.ts

//  WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
export const AriaAttributesPropTypes = {
	'aria-activedescendant': PropTypes.string,
	'aria-atomic': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-autocomplete': PropTypes.oneOf( [ 'none', 'inline', 'list', 'both' ] ),
	'aria-busy': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-checked': PropTypes.oneOf( [ true, false, 'true', 'false', 'mixed' ] ),
	'aria-colcount': PropTypes.number,
	'aria-colindex': PropTypes.number,
	'aria-colspan': PropTypes.number,
	'aria-controls': PropTypes.string,
	'aria-current': PropTypes.oneOf( [
		true,
		false,
		'true',
		'false',
		'page',
		'step',
		'location',
		'date',
		'time',
	] ),
	'aria-describedby': PropTypes.string,
	'aria-details': PropTypes.string,
	'aria-disabled': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-dropeffect': PropTypes.oneOf( [
		'none',
		'copy',
		'execute',
		'link',
		'move',
		'popup',
	] ),
	'aria-errormessage': PropTypes.string,
	'aria-expanded': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-flowto': PropTypes.string,
	'aria-grabbed': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-haspopup': PropTypes.oneOf( [
		true,
		false,
		'true',
		'false',
		'menu',
		'listbox',
		'tree',
		'grid',
		'dialog',
	] ),
	'aria-hidden': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-invalid': PropTypes.oneOf( [
		true,
		false,
		'true',
		'false',
		'grammar',
		'spelling',
	] ),
	'aria-keyshortcuts': PropTypes.string,
	'aria-label': PropTypes.string,
	'aria-labelledby': PropTypes.string,
	'aria-level': PropTypes.number,
	'aria-live': PropTypes.oneOf( [ 'off', 'assertive', 'polite' ] ),
	'aria-modal': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-multiline': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-multiselectable': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-orientation': PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
	'aria-owns': PropTypes.string,
	'aria-placeholder': PropTypes.string,
	'aria-posinset': PropTypes.number,
	'aria-readonly': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-relevant': PropTypes.oneOf( [
		'additions',
		'additions removals',
		'additions text',
		'all',
		'removals',
		'removals additions',
		'removals text',
		'text',
		'text additions',
		'text removals',
	] ),
	'aria-required': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-roledescription': PropTypes.string,
	'aria-rowcount': PropTypes.number,
	'aria-rowindex': PropTypes.number,
	'aria-rowspan': PropTypes.number,
	'aria-selected': PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	'aria-setsize': PropTypes.number,
	'aria-sort': PropTypes.oneOf( [ 'none', 'ascending', 'descending', 'other' ] ),
	'aria-valuemax': PropTypes.number,
	'aria-valuemin': PropTypes.number,
	'aria-valuenow': PropTypes.number,
	'aria-valuetext': PropTypes.string,
};

export const DOMAttributesPropTypes = {
	children: PropTypes.node,
	dangerouslySetInnerHTML: PropTypes.shape( {
		__html: PropTypes.string,
	} ),
	// Clipboard Events
	onCopy: PropTypes.func,
	onCopyCapture: PropTypes.func,
	onCut: PropTypes.func,
	onCutCapture: PropTypes.func,
	onPaste: PropTypes.func,
	onPasteCapture: PropTypes.func,

	// Composition Events
	onCompositionEnd: PropTypes.func,
	onCompositionEndCapture: PropTypes.func,
	onCompositionStart: PropTypes.func,
	onCompositionStartCapture: PropTypes.func,
	onCompositionUpdate: PropTypes.func,
	onCompositionUpdateCapture: PropTypes.func,

	// Focus Events
	onFocus: PropTypes.func,
	onFocusCapture: PropTypes.func,
	onBlur: PropTypes.func,
	onBlurCapture: PropTypes.func,

	// Form Events
	onChange: PropTypes.func,
	onChangeCapture: PropTypes.func,
	onBeforeInput: PropTypes.func,
	onBeforeInputCapture: PropTypes.func,
	onInput: PropTypes.func,
	onInputCapture: PropTypes.func,
	onReset: PropTypes.func,
	onResetCapture: PropTypes.func,
	onSubmit: PropTypes.func,
	onSubmitCapture: PropTypes.func,
	onInvalid: PropTypes.func,
	onInvalidCapture: PropTypes.func,

	// Image Events
	onLoad: PropTypes.func,
	onLoadCapture: PropTypes.func,
	onError: PropTypes.func,
	onErrorCapture: PropTypes.func,

	// Keyboard Events
	onKeyDown: PropTypes.func,
	onKeyDownCapture: PropTypes.func,
	onKeyPress: PropTypes.func,
	onKeyPressCapture: PropTypes.func,
	onKeyUp: PropTypes.func,
	onKeyUpCapture: PropTypes.func,

	// Media Events
	onAbort: PropTypes.func,
	onAbortCapture: PropTypes.func,
	onCanPlay: PropTypes.func,
	onCanPlayCapture: PropTypes.func,
	onCanPlayThrough: PropTypes.func,
	onCanPlayThroughCapture: PropTypes.func,
	onDurationChange: PropTypes.func,
	onDurationChangeCapture: PropTypes.func,
	onEmptied: PropTypes.func,
	onEmptiedCapture: PropTypes.func,
	onEncrypted: PropTypes.func,
	onEncryptedCapture: PropTypes.func,
	onEnded: PropTypes.func,
	onEndedCapture: PropTypes.func,
	onLoadedData: PropTypes.func,
	onLoadedDataCapture: PropTypes.func,
	onLoadedMetadata: PropTypes.func,
	onLoadedMetadataCapture: PropTypes.func,
	onLoadStart: PropTypes.func,
	onLoadStartCapture: PropTypes.func,
	onPause: PropTypes.func,
	onPauseCapture: PropTypes.func,
	onPlay: PropTypes.func,
	onPlayCapture: PropTypes.func,
	onPlaying: PropTypes.func,
	onPlayingCapture: PropTypes.func,
	onProgress: PropTypes.func,
	onProgressCapture: PropTypes.func,
	onRateChange: PropTypes.func,
	onRateChangeCapture: PropTypes.func,
	onSeeked: PropTypes.func,
	onSeekedCapture: PropTypes.func,
	onSeeking: PropTypes.func,
	onSeekingCapture: PropTypes.func,
	onStalled: PropTypes.func,
	onStalledCapture: PropTypes.func,
	onSuspend: PropTypes.func,
	onSuspendCapture: PropTypes.func,
	onTimeUpdate: PropTypes.func,
	onTimeUpdateCapture: PropTypes.func,
	onVolumeChange: PropTypes.func,
	onVolumeChangeCapture: PropTypes.func,
	onWaiting: PropTypes.func,
	onWaitingCapture: PropTypes.func,

	// MouseEvents
	onAuxClick: PropTypes.func,
	onAuxClickCapture: PropTypes.func,
	onClick: PropTypes.func,
	onClickCapture: PropTypes.func,
	onContextMenu: PropTypes.func,
	onContextMenuCapture: PropTypes.func,
	onDoubleClick: PropTypes.func,
	onDoubleClickCapture: PropTypes.func,
	onDrag: PropTypes.func,
	onDragCapture: PropTypes.func,
	onDragEnd: PropTypes.func,
	onDragEndCapture: PropTypes.func,
	onDragEnter: PropTypes.func,
	onDragEnterCapture: PropTypes.func,
	onDragExit: PropTypes.func,
	onDragExitCapture: PropTypes.func,
	onDragLeave: PropTypes.func,
	onDragLeaveCapture: PropTypes.func,
	onDragOver: PropTypes.func,
	onDragOverCapture: PropTypes.func,
	onDragStart: PropTypes.func,
	onDragStartCapture: PropTypes.func,
	onDrop: PropTypes.func,
	onDropCapture: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseDownCapture: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseMove: PropTypes.func,
	onMouseMoveCapture: PropTypes.func,
	onMouseOut: PropTypes.func,
	onMouseOutCapture: PropTypes.func,
	onMouseOver: PropTypes.func,
	onMouseOverCapture: PropTypes.func,
	onMouseUp: PropTypes.func,
	onMouseUpCapture: PropTypes.func,

	// Selection Events
	onSelect: PropTypes.func,
	onSelectCapture: PropTypes.func,

	// Touch Events
	onTouchCancel: PropTypes.func,
	onTouchCancelCapture: PropTypes.func,
	onTouchEnd: PropTypes.func,
	onTouchEndCapture: PropTypes.func,
	onTouchMove: PropTypes.func,
	onTouchMoveCapture: PropTypes.func,
	onTouchStart: PropTypes.func,
	onTouchStartCapture: PropTypes.func,

	// Pointer Events
	onPointerDown: PropTypes.func,
	onPointerDownCapture: PropTypes.func,
	onPointerMove: PropTypes.func,
	onPointerMoveCapture: PropTypes.func,
	onPointerUp: PropTypes.func,
	onPointerUpCapture: PropTypes.func,
	onPointerCancel: PropTypes.func,
	onPointerCancelCapture: PropTypes.func,
	onPointerEnter: PropTypes.func,
	onPointerEnterCapture: PropTypes.func,
	onPointerLeave: PropTypes.func,
	onPointerLeaveCapture: PropTypes.func,
	onPointerOver: PropTypes.func,
	onPointerOverCapture: PropTypes.func,
	onPointerOut: PropTypes.func,
	onPointerOutCapture: PropTypes.func,
	onGotPointerCapture: PropTypes.func,
	onGotPointerCaptureCapture: PropTypes.func,
	onLostPointerCapture: PropTypes.func,
	onLostPointerCaptureCapture: PropTypes.func,

	// UI Events
	onScroll: PropTypes.func,
	onScrollCapture: PropTypes.func,

	// Wheel Events
	onWheel: PropTypes.func,
	onWheelCapture: PropTypes.func,

	// Animation Events
	onAnimationStart: PropTypes.func,
	onAnimationStartCapture: PropTypes.func,
	onAnimationEnd: PropTypes.func,
	onAnimationEndCapture: PropTypes.func,
	onAnimationIteration: PropTypes.func,
	onAnimationIterationCapture: PropTypes.func,

	// Transition Events
	onTransitionEnd: PropTypes.func,
	onTransitionEndCapture: PropTypes.func,
};

export const HTMLAttributesPropTypes = {
	// React-specific Attributes
	defaultChecked: PropTypes.bool,
	defaultValue: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
	suppressContentEditableWarning: PropTypes.bool,
	suppressHydrationWarning: PropTypes.bool,

	// Standard HTML Attributes
	accessKey: PropTypes.string,
	className: PropTypes.string,
	contentEditable: PropTypes.oneOf( [ true, false, 'true', 'false', 'inherit' ] ),
	contextMenu: PropTypes.string,
	dir: PropTypes.string,
	draggable: PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	hidden: PropTypes.bool,
	id: PropTypes.string,
	lang: PropTypes.string,
	placeholder: PropTypes.string,
	slot: PropTypes.string,
	spellCheck: PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	style: PropTypes.object,
	tabIndex: PropTypes.number,
	title: PropTypes.string,
	translate: PropTypes.oneOf( [ 'yes', 'no' ] ),

	// Unknown
	radioGroup: PropTypes.string, // <command>, <menuitem>

	// WAI-ARIA
	role: PropTypes.string,

	// RDFa Attributes
	about: PropTypes.string,
	datatype: PropTypes.string,
	inlist: PropTypes.any,
	prefix: PropTypes.string,
	property: PropTypes.string,
	resource: PropTypes.string,
	typeof: PropTypes.string,
	vocab: PropTypes.string,

	// Non-standard Attributes
	autoCapitalize: PropTypes.string,
	autoCorrect: PropTypes.string,
	autoSave: PropTypes.string,
	color: PropTypes.string,
	itemProp: PropTypes.string,
	itemScope: PropTypes.bool,
	itemType: PropTypes.string,
	itemID: PropTypes.string,
	itemRef: PropTypes.string,
	results: PropTypes.number,
	security: PropTypes.string,
	unselectable: PropTypes.oneOf( [ 'on', 'off' ] ),

	// Living Standard
	/**
	 * Hints at the type of data that might be entered by the user while editing the element or its contents
	 *
	 * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
	 */
	inputMode: PropTypes.oneOf( [
		'none',
		'text',
		'tel',
		'url',
		'email',
		'numeric',
		'decimal',
		'search',
	] ),
	/**
	 * Specify that a standard HTML element should behave like a defined custom built-in element
	 *
	 * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
	 */
	is: PropTypes.string,
};

export const AnchorHTMLAttributes = {
	...HTMLAttributesPropTypes,
	download: PropTypes.any,
	href: PropTypes.string,
	hrefLang: PropTypes.string,
	media: PropTypes.string,
	ping: PropTypes.string,
	rel: PropTypes.string,
	target: PropTypes.string,
	type: PropTypes.string,
	referrerPolicy: PropTypes.string,
};

// tslint:disable-next-line:no-empty-interface
export const AudioHTMLAttributes = {
	...HTMLAttributesPropTypes,
};

export const AreaHTMLAttributes = {
	...HTMLAttributesPropTypes,
	alt: PropTypes.string,
	coords: PropTypes.string,
	download: PropTypes.any,
	href: PropTypes.string,
	hrefLang: PropTypes.string,
	media: PropTypes.string,
	rel: PropTypes.string,
	shape: PropTypes.string,
	target: PropTypes.string,
};

export const BaseHTMLAttributes = {
	...HTMLAttributesPropTypes,
	href: PropTypes.string,
	target: PropTypes.string,
};

export const BlockquoteHTMLAttributes = {
	...HTMLAttributesPropTypes,
	cite: PropTypes.string,
};

export const ButtonHTMLAttributes = {
	...HTMLAttributesPropTypes,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	formAction: PropTypes.string,
	formEncType: PropTypes.string,
	formMethod: PropTypes.string,
	formNoValidate: PropTypes.bool,
	formTarget: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.oneOf( [ 'submit', 'reset', 'button' ] ),
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const CanvasHTMLAttributes = {
	...HTMLAttributesPropTypes,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

export const ColHTMLAttributes = {
	...HTMLAttributesPropTypes,
	span: PropTypes.number,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

export const ColgroupHTMLAttributes = {
	...HTMLAttributesPropTypes,
	span: PropTypes.number,
};

export const DataHTMLAttributes = {
	...HTMLAttributesPropTypes,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const DetailsHTMLAttributes = {
	...HTMLAttributesPropTypes,
	open: PropTypes.bool,
	onToggle: PropTypes.func,
};

export const DelHTMLAttributes = {
	...HTMLAttributesPropTypes,
	cite: PropTypes.string,
	dateTime: PropTypes.string,
};

export const DialogHTMLAttributes = {
	...HTMLAttributesPropTypes,
	open: PropTypes.bool,
};

export const EmbedHTMLAttributes = {
	...HTMLAttributesPropTypes,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	src: PropTypes.string,
	type: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

export const FieldsetHTMLAttributes = {
	...HTMLAttributesPropTypes,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	name: PropTypes.string,
};

export const FormHTMLAttributes = {
	...HTMLAttributesPropTypes,
	acceptCharset: PropTypes.string,
	action: PropTypes.string,
	autoComplete: PropTypes.string,
	encType: PropTypes.string,
	method: PropTypes.string,
	name: PropTypes.string,
	noValidate: PropTypes.bool,
	target: PropTypes.string,
};

export const HtmlHTMLAttributes = {
	...HTMLAttributesPropTypes,
	manifest: PropTypes.string,
};

export const IframeHTMLAttributes = {
	...HTMLAttributesPropTypes,
	allow: PropTypes.string,
	allowFullScreen: PropTypes.bool,
	allowTransparency: PropTypes.bool,
	frameBorder: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	loading: PropTypes.oneOf( [ 'eager', 'lazy' ] ),
	marginHeight: PropTypes.number,
	marginWidth: PropTypes.number,
	name: PropTypes.string,
	referrerPolicy: PropTypes.string,
	sandbox: PropTypes.string,
	scrolling: PropTypes.string,
	seamless: PropTypes.bool,
	src: PropTypes.string,
	srcDoc: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

export const ImgHTMLAttributes = {
	...HTMLAttributesPropTypes,
	alt: PropTypes.string,
	crossOrigin: PropTypes.oneOf( [ 'anonymous', 'use-credentials', '' ] ),
	decoding: PropTypes.oneOf( [ 'async', 'auto', 'sync' ] ),
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	loading: PropTypes.oneOf( [ 'eager', 'lazy' ] ),
	referrerPolicy: PropTypes.oneOf( [ 'no-referrer', 'origin', 'unsafe-url' ] ),
	sizes: PropTypes.string,
	src: PropTypes.string,
	srcSet: PropTypes.string,
	useMap: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

export const InsHTMLAttributes = {
	...HTMLAttributesPropTypes,
	cite: PropTypes.string,
	dateTime: PropTypes.string,
};

export const InputHTMLAttributes = {
	...HTMLAttributesPropTypes,
	accept: PropTypes.string,
	alt: PropTypes.string,
	autoComplete: PropTypes.string,
	autoFocus: PropTypes.bool,
	capture: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.string ] ), // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
	checked: PropTypes.bool,
	crossOrigin: PropTypes.string,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	formAction: PropTypes.string,
	formEncType: PropTypes.string,
	formMethod: PropTypes.string,
	formNoValidate: PropTypes.bool,
	formTarget: PropTypes.string,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	list: PropTypes.string,
	max: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	maxLength: PropTypes.number,
	min: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	minLength: PropTypes.number,
	multiple: PropTypes.bool,
	name: PropTypes.string,
	pattern: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	required: PropTypes.bool,
	size: PropTypes.number,
	src: PropTypes.string,
	step: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	type: PropTypes.string,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),

	onChange: PropTypes.func,
};

export const KeygenHTMLAttributes = {
	...HTMLAttributesPropTypes,
	autoFocus: PropTypes.bool,
	challenge: PropTypes.string,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	keyType: PropTypes.string,
	keyParams: PropTypes.string,
	name: PropTypes.string,
};

export const LabelHTMLAttributes = {
	...HTMLAttributesPropTypes,
	form: PropTypes.string,
	htmlFor: PropTypes.string,
};

export const LiHTMLAttributes = {
	...HTMLAttributesPropTypes,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const LinkHTMLAttributes = {
	...HTMLAttributesPropTypes,
	as: PropTypes.string,
	crossOrigin: PropTypes.string,
	href: PropTypes.string,
	hrefLang: PropTypes.string,
	integrity: PropTypes.string,
	media: PropTypes.string,
	rel: PropTypes.string,
	sizes: PropTypes.string,
	type: PropTypes.string,
	charSet: PropTypes.string,
};

export const MapHTMLAttributes = {
	...HTMLAttributesPropTypes,
	name: PropTypes.string,
};

export const MenuHTMLAttributes = {
	...HTMLAttributesPropTypes,
	type: PropTypes.string,
};

export const MediaHTMLAttributes = {
	...HTMLAttributesPropTypes,
	autoPlay: PropTypes.bool,
	controls: PropTypes.bool,
	controlsList: PropTypes.string,
	crossOrigin: PropTypes.string,
	loop: PropTypes.bool,
	mediaGroup: PropTypes.string,
	muted: PropTypes.bool,
	playsInline: PropTypes.bool,
	preload: PropTypes.string,
	src: PropTypes.string,
};

export const MetaHTMLAttributes = {
	...HTMLAttributesPropTypes,
	charSet: PropTypes.string,
	content: PropTypes.string,
	httpEquiv: PropTypes.string,
	name: PropTypes.string,
};

export const MeterHTMLAttributes = {
	...HTMLAttributesPropTypes,
	form: PropTypes.string,
	high: PropTypes.number,
	low: PropTypes.number,
	max: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	min: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	optimum: PropTypes.number,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const QuoteHTMLAttributes = {
	...HTMLAttributesPropTypes,
	cite: PropTypes.string,
};

export const ObjectHTMLAttributes = {
	...HTMLAttributesPropTypes,
	classID: PropTypes.string,
	data: PropTypes.string,
	form: PropTypes.string,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	name: PropTypes.string,
	type: PropTypes.string,
	useMap: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	wmode: PropTypes.string,
};

export const OlHTMLAttributes = {
	...HTMLAttributesPropTypes,
	reversed: PropTypes.bool,
	start: PropTypes.number,
	type: PropTypes.oneOf( [ '1', 'a', 'A', 'i', 'I' ] ),
};

export const OptgroupHTMLAttributes = {
	...HTMLAttributesPropTypes,
	disabled: PropTypes.bool,
	label: PropTypes.string,
};

export const OptionHTMLAttributes = {
	...HTMLAttributesPropTypes,
	disabled: PropTypes.bool,
	label: PropTypes.string,
	selected: PropTypes.bool,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const OutputHTMLAttributes = {
	...HTMLAttributesPropTypes,
	form: PropTypes.string,
	htmlFor: PropTypes.string,
	name: PropTypes.string,
};

export const ParamHTMLAttributes = {
	...HTMLAttributesPropTypes,
	name: PropTypes.string,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const ProgressHTMLAttributes = {
	...HTMLAttributesPropTypes,
	max: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
};

export const SlotHTMLAttributes = {
	...HTMLAttributesPropTypes,
	name: PropTypes.string,
};

export const ScriptHTMLAttributes = {
	...HTMLAttributesPropTypes,
	async: PropTypes.bool,
	charSet: PropTypes.string,
	crossOrigin: PropTypes.string,
	defer: PropTypes.bool,
	integrity: PropTypes.string,
	noModule: PropTypes.bool,
	nonce: PropTypes.string,
	src: PropTypes.string,
	type: PropTypes.string,
};

export const SelectHTMLAttributes = {
	...HTMLAttributesPropTypes,
	autoComplete: PropTypes.string,
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	multiple: PropTypes.bool,
	name: PropTypes.string,
	required: PropTypes.bool,
	size: PropTypes.number,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
	onChange: PropTypes.func,
};

export const SourceHTMLAttributes = {
	...HTMLAttributesPropTypes,
	media: PropTypes.string,
	sizes: PropTypes.string,
	src: PropTypes.string,
	srcSet: PropTypes.string,
	type: PropTypes.string,
};

export const StyleHTMLAttributes = {
	...HTMLAttributesPropTypes,
	media: PropTypes.string,
	nonce: PropTypes.string,
	scoped: PropTypes.bool,
	type: PropTypes.string,
};

export const TableHTMLAttributes = {
	...HTMLAttributesPropTypes,
	cellPadding: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	cellSpacing: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	summary: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
};

export const TextareaHTMLAttributes = {
	...HTMLAttributesPropTypes,
	autoComplete: PropTypes.string,
	autoFocus: PropTypes.bool,
	cols: PropTypes.number,
	dirName: PropTypes.string,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	required: PropTypes.bool,
	rows: PropTypes.number,
	value: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf( PropTypes.string ),
	] ),
	wrap: PropTypes.string,

	onChange: PropTypes.func,
};

export const TdHTMLAttributes = {
	...HTMLAttributesPropTypes,
	align: PropTypes.oneOf( [ 'left', 'center', 'right', 'justify', 'char' ] ),
	colSpan: PropTypes.number,
	headers: PropTypes.string,
	rowSpan: PropTypes.number,
	scope: PropTypes.string,
	abbr: PropTypes.string,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	valign: PropTypes.oneOf( [ 'top', 'middle', 'bottom', 'baseline' ] ),
};

export const ThHTMLAttributes = {
	...HTMLAttributesPropTypes,
	align: PropTypes.oneOf( [ 'left', 'center', 'right', 'justify', 'char' ] ),
	colSpan: PropTypes.number,
	headers: PropTypes.string,
	rowSpan: PropTypes.number,
	scope: PropTypes.string,
	abbr: PropTypes.string,
};

export const TimeHTMLAttributes = {
	...HTMLAttributesPropTypes,
	dateTime: PropTypes.string,
};

export const TrackHTMLAttributes = {
	...HTMLAttributesPropTypes,
	default: PropTypes.bool,
	kind: PropTypes.string,
	label: PropTypes.string,
	src: PropTypes.string,
	srcLang: PropTypes.string,
};

export const VideoHTMLAttributes = {
	...HTMLAttributesPropTypes,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	playsInline: PropTypes.bool,
	poster: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	disablePictureInPicture: PropTypes.bool,
};

export const SVGAttributes = {
	...AriaAttributesPropTypes,
	...DOMAttributesPropTypes,
	// Attributes which also defined in HTMLAttributes
	// See comment in SVGDOMPropertyConfig.js
	className: PropTypes.string,
	color: PropTypes.string,
	height: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	id: PropTypes.string,
	lang: PropTypes.string,
	max: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	media: PropTypes.string,
	method: PropTypes.string,
	min: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	name: PropTypes.string,
	style: PropTypes.object,
	target: PropTypes.string,
	type: PropTypes.string,
	width: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),

	// Other HTML properties supported by SVG elements in browsers
	role: PropTypes.string,
	tabIndex: PropTypes.number,
	crossOrigin: PropTypes.oneOf( [ 'anonymous', 'use-credentials', '' ] ),

	// SVG Specific attributes
	accentHeight: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	accumulate: PropTypes.oneOf( [ 'none', 'sum' ] ),
	additive: PropTypes.oneOf( [ 'replace', 'sum' ] ),
	alignmentBaseline: PropTypes.oneOf( [
		'auto',
		'baseline',
		'before-edge',
		'text-before-edge',
		'middle',
		'central',
		'after-edge',
		'text-after-edge',
		'ideographic',
		'alphabetic',
		'hanging',
		'mathematical',
		'inherit',
	] ),
	allowReorder: PropTypes.oneOf( [ 'no', 'yes' ] ),
	alphabetic: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	amplitude: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	arabicForm: PropTypes.oneOf( [ 'initial', 'medial', 'terminal', 'isolated' ] ),
	ascent: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	attributeName: PropTypes.string,
	attributeType: PropTypes.string,
	autoReverse: PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	azimuth: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	baseFrequency: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	baselineShift: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	baseProfile: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	bbox: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	begin: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	bias: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	by: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	calcMode: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	capHeight: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	clip: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	clipPath: PropTypes.string,
	clipPathUnits: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	clipRule: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	colorInterpolation: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	colorInterpolationFilters: PropTypes.oneOf( [
		'auto',
		'sRGB',
		'linearRGB',
		'inherit',
	] ),
	colorProfile: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	colorRendering: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	contentScriptType: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	contentStyleType: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	cursor: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	cx: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	cy: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	d: PropTypes.string,
	decelerate: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	descent: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	diffuseConstant: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	direction: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	display: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	divisor: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	dominantBaseline: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	dur: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	dx: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	dy: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	edgeMode: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	elevation: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	enableBackground: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	end: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	exponent: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	externalResourcesRequired: PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	fill: PropTypes.string,
	fillOpacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fillRule: PropTypes.oneOf( [ 'nonzero', 'evenodd', 'inherit' ] ),
	filter: PropTypes.string,
	filterRes: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	filterUnits: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	floodColor: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	floodOpacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	focusable: PropTypes.oneOf( [ true, false, 'true', 'false', 'auto' ] ),
	fontFamily: PropTypes.string,
	fontSize: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fontSizeAdjust: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fontStretch: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fontStyle: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fontVariant: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fontWeight: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	format: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	from: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fx: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	fy: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	g1: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	g2: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	glyphName: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	glyphOrientationHorizontal: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	glyphOrientationVertical: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	glyphRef: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	gradientTransform: PropTypes.string,
	gradientUnits: PropTypes.string,
	hanging: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	horizAdvX: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	horizOriginX: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	href: PropTypes.string,
	ideographic: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	imageRendering: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	in2: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	in: PropTypes.string,
	intercept: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	k1: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	k2: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	k3: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	k4: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	k: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	kernelMatrix: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	kernelUnitLength: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	kerning: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	keyPoints: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	keySplines: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	keyTimes: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	lengthAdjust: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	letterSpacing: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	lightingColor: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	limitingConeAngle: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	local: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	markerEnd: PropTypes.string,
	markerHeight: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	markerMid: PropTypes.string,
	markerStart: PropTypes.string,
	markerUnits: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	markerWidth: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	mask: PropTypes.string,
	maskContentUnits: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	maskUnits: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	mathematical: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	mode: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	numOctaves: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	offset: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	opacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	operator: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	order: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	orient: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	orientation: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	origin: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	overflow: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	overlinePosition: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	overlineThickness: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	paintOrder: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	panose1: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	path: PropTypes.string,
	pathLength: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	patternContentUnits: PropTypes.string,
	patternTransform: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	patternUnits: PropTypes.string,
	pointerEvents: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	points: PropTypes.string,
	pointsAtX: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	pointsAtY: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	pointsAtZ: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	preserveAlpha: PropTypes.oneOf( [ true, false, 'true', 'false' ] ),
	preserveAspectRatio: PropTypes.string,
	primitiveUnits: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	r: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	radius: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	refX: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	refY: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	renderingIntent: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	repeatCount: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	repeatDur: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	requiredExtensions: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	requiredFeatures: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	restart: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	result: PropTypes.string,
	rotate: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	rx: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	ry: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	scale: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	seed: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	shapeRendering: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	slope: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	spacing: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	specularConstant: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	specularExponent: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	speed: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	spreadMethod: PropTypes.string,
	startOffset: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	stdDeviation: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	stemh: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	stemv: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	stitchTiles: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	stopColor: PropTypes.string,
	stopOpacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	strikethroughPosition: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	strikethroughThickness: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	string: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	stroke: PropTypes.string,
	strokeDasharray: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	strokeDashoffset: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	strokeLinecap: PropTypes.oneOf( [ 'butt', 'round', 'square', 'inherit' ] ),
	strokeLinejoin: PropTypes.oneOf( [ 'miter', 'round', 'bevel', 'inherit' ] ),
	strokeMiterlimit: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	strokeOpacity: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	strokeWidth: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	surfaceScale: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	systemLanguage: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	tableValues: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	targetX: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	targetY: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	textAnchor: PropTypes.string,
	textDecoration: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	textLength: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	textRendering: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	to: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	transform: PropTypes.string,
	u1: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	u2: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	underlinePosition: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	underlineThickness: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	unicode: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	unicodeBidi: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	unicodeRange: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	unitsPerEm: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	vAlphabetic: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	values: PropTypes.string,
	vectorEffect: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	version: PropTypes.string,
	vertAdvY: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	vertOriginX: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	vertOriginY: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	vHanging: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	vIdeographic: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	viewBox: PropTypes.string,
	viewTarget: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	visibility: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	vMathematical: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	widths: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	wordSpacing: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	writingMode: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	x1: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	x2: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	x: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	xChannelSelector: PropTypes.string,
	xHeight: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	xlinkActuate: PropTypes.string,
	xlinkArcrole: PropTypes.string,
	xlinkHref: PropTypes.string,
	xlinkRole: PropTypes.string,
	xlinkShow: PropTypes.string,
	xlinkTitle: PropTypes.string,
	xlinkType: PropTypes.string,
	xmlBase: PropTypes.string,
	xmlLang: PropTypes.string,
	xmlns: PropTypes.string,
	xmlnsXlink: PropTypes.string,
	xmlSpace: PropTypes.string,
	y1: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	y2: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	y: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	yChannelSelector: PropTypes.string,
	z: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	zoomAndPan: PropTypes.string,
};
