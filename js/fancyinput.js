class fancyInput {
	static initialized = false;
	constructor(selector, options) {
		this.options = Object.assign({
			allowLineBreaks: false,
			className: 'fancyinput',
			classNameFocus: 'focus',
			copyComputedStyle: true,
			copyStyle: true,
			onChange: (value, evt, elm) => { return value; }
		}, options)
		if (typeof selector === 'string')
			selector = document.querySelectorAll(selector);
		if (typeof selector === 'object' && selector.length > 1) {
			let instances = [];
			selector.forEach(element => {
				instances.push(new fancySlider(element))
			});
			return instances;
		}
		if(!selector[0] || selector[0].type !== 'text') { return; }

		this.input = selector[0];
		this.element = document.createElement('div');
		this.input.parentNode.insertBefore(this.element, this.input.nextSibling);
		this.element.className = this.options.className;
		this.element.innerHTML = this.input.value;
		if(this.options.copyComputedStyle){
			const inputComputedStyle = window.getComputedStyle(this.input);
			const elementComputedStyle = window.getComputedStyle(this.element);
			for (let s of inputComputedStyle) {
				if(inputComputedStyle[s] !== elementComputedStyle[s]){
					this.element.style.setProperty(s, inputComputedStyle.getPropertyValue(s), inputComputedStyle.getPropertyPriority(s));
				}
			}
		}
		this.element.style['vertical-align']='top';
		this.element.style['-webkit-user-modify']='read-write';
		this.element.style['user-modify']='read-write';
		this.element.style['user-select']='initial';
		this.element.style['overflow-y']='hidden';
		if(this.options.copyStyle){
			this.element.style['height']=`${this.input.offsetHeight}px`;
			for (let s of this.input.style) {
				this.element.style[s] = this.input.style[s]
			}
		}
		this.element.contentEditable = true;
		['focus', 'blur', 'paste', 'keyup', 'keypress', 'keydown'].forEach((e) => {
			this.element.addEventListener(e, (evt) => {
				if (!this.options.allowLineBreaks && evt.which === 13) {
					evt.preventDefault();
				}
				if (evt.type==='keydown' && (evt.ctrlKey || evt.metaKey)) {
					switch (String.fromCharCode(evt.which).toLowerCase()) {
						case 'b':
							evt.preventDefault();
							document.execCommand('Bold', false, null);
							break;
						case 'u':
							evt.preventDefault();
							document.execCommand('Underline', false, null);
							break;
						case 'i':
							evt.preventDefault();
							document.execCommand('Italic', false, null);
							break;
					}
				}
				if (evt.type==='focus'){
					this.element.classList.add(this.options.classNameFocus);
				}
				if (evt.type==='blur'){
					this.element.classList.remove(this.options.classNameFocus);
				}
				// evt.target.innerHTML = validTags(evt.target.innerHTML, 'b', 'i', 'u', 'em', 'strong')
				this.input.value = this.options.onChange.call(this,evt.target.innerHTML, evt, this.input);
				if(evt.type==='blur' && this.input.value !== evt.target.innerHTML){
					evt.target.innerHTML = this.input.value;
				}
				if(evt.type==='blur'){
					this.input.dispatchEvent(new Event('change'));
				}
			});
		});
		// this.input.parentNode.insertBefore(this.element, this.input.nextSibling);
		this.input.type = 'hidden';
		this.initialized = true;
		return this;
	}
	validTags(html, ...args) {
		return html.replace(/<(\/?)(\w+)[^>]*\/?>/g, (_, endMark, tag) => {
			return args.includes(tag) ? '<' + endMark + tag + '>' : '';
		}).replace(/<!--.*?-->/g, '');
	}
}

(() => {

})();