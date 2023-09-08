class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="footer-container">
            <p class="footer-name">API Developed by <em>Ibrahim Abdulkarim</em></p>
                <div class="footer-icons">
                    <a href="https://github.com/aliveevie" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/ibrahim193" target="_blank">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://twitter.com/iabdulkarim472" target="_blank">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <span class="phone-number">
                        <i class="fas fa-phone"></i>
                        +234 813 830 0357
                    </span>
                
                </div>
            
            </div>
        `;
    }
    
}

customElements.define('footer-element', Footer);