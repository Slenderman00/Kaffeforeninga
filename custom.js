class CustomElement extends HTMLElement {
    constructor() {
        super();
        this.shadow;
        this.tagMethod;
        this.attributes;
    }

    connectedCallback() {
        this.shadow = this.attachShadow({mode: "open"})

        let attributes = {}
        for(let i = 0; i < this.attributes.length; i++) {
            attributes[this.attributes[i]['name']] = this.attributes[i]['value'];
        }

        this.tagMethod(this.shadow, attributes)
    }
}

let createElement = (tag, tagMethod) => {
    customElements.define(tag, class extends CustomElement {
        constructor() {
            super();
            this.tagMethod = tagMethod;
        }
    });
}