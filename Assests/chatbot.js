// ===== ENHANCED CHATBOT WITH HUMAN-LIKE RESPONSES =====

class PioneerChatbot {
    constructor() {
        this.container = document.getElementById('chatbotContainer');
        this.trigger = document.getElementById('chatbotTrigger');
        this.closeBtn = document.getElementById('chatbotClose');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
        this.companyData = null;
        this.isOpen = false;
        this.hasGreeted = false;
        this.conversationContext = [];
        this.userName = null;
        
        // Personality traits for more human responses
        this.personality = {
            name: "Ani",
            mood: "friendly",
            empathyPhrases: [
                "I totally understand!",
                "That's a great question!",
                "I'm glad you asked!",
                "Absolutely!",
                "Of course!",
                "Great thinking!"
            ],
            thinkingPhrases: [
                "Let me think...",
                "Hmm, good question!",
                "Ah, I see what you mean!",
                "Let me check that for you..."
            ],
            fillerWords: [
                "So,",
                "Well,",
                "Actually,",
                "You know what,",
                "Here's the thing -"
            ]
        };
        
        this.init();
    }
    
    async init() {
        await this.loadCompanyData();
        this.bindEvents();
    }
    
    async loadCompanyData() {
        try {
            const response = await fetch('chatbot.json');
            const data = await response.json();
            this.companyData = data.company;
        } catch (error) {
            console.error('Error loading chatbot data:', error);
            this.companyData = this.getFallbackData();
        }
    }
    
    getFallbackData() {
        return {
            name: "Pioneer Software Solutions",
            address: "Naag Pokhari, Kathmandu, Nepal",
            employee_count: 8,
            opening_time: "09:00 AM",
            closing_time: "06:00 PM",
            website: "https://pioneersoftware.com.np/",
            description: "Pioneer Software Solutions is a technology company providing web, mobile, and software development services. We have been a trusted name in accounting technology consulting since 2010.",
            tagline: "Your Trusted Technology Partner Since 2010",
            specialization: "Authorized Tally Partner",
            services: {
                featured: {
                    name: "Tally Solutions",
                    icon: "🧮",
                    description: "Nepal's trusted Tally Prime partner",
                    items: [
                        "Tally Prime Sales & Licensing",
                        "Tally Customization & Add-ons",
                        "Tally on Cloud",
                        "Tally Training & Implementation",
                        "Tally Data Migration",
                        "Annual Maintenance Support"
                    ]
                },
                regular: [
                    {name: "Web Development", icon: "💻", description: "Modern, responsive websites"},
                    {name: "Mobile App Development", icon: "📱", description: "iOS & Android apps"},
                    {name: "Software Solutions", icon: "⚙️", description: "Custom software development"},
                    {name: "Digital Marketing", icon: "📈", description: "SEO, Social Media & Ads"},
                    {name: "Graphic Design", icon: "🎨", description: "Branding & UI/UX design"}
                ]
            },
            employees: [
                {name: "Anil Munakarmi", phone: "+977-985-1141375", role: "CEO", expertise: "Business Strategy"},
                {name: "Mani Maharjan", phone: "+977-980-5533801", role: "Acc & Finance", expertise: "Acc & Finance"},
                {name: "Suman Mool", phone: "+977-980-5533802", role: "Support Officer", expertise: "Support Officer"},
                {name: "Krijan Maharjan", phone: "+977-980-5533803", role: "Support Officer", expertise: "Support"},
                {name: "Ashish Shrestha", phone: "+977-980-5533804", role: "Support Officer", expertise: "IT and Software Support"},
                {name: "Nhuja Maharjan", phone: "+977-980-5533805", role: "Support Lead", expertise: "Customer Success"},
                {name: "Om Pandey", phone: "+977-980-5533806", role: "Developer", expertise: "Frontend"}
            ],
            tallyInfo: {
                isAuthorized: true,
                partnerSince: 2012,
                certifications: ["Certified Tally Partner", "Tally Cloud Partner"],
                products: [
                    {name: "Tally Prime - Silver", price: "Single User", popular: false},
                    {name: "Tally Prime - Gold", price: "Multi User", popular: true},
                    {name: "Tally on Cloud", price: "Monthly/Yearly", popular: true},
                    {name: "Tally Customization", price: "Project Based", popular: false}
                ]
            }
        };
    }
    
    bindEvents() {
        this.trigger.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Event delegation for quick questions
        this.messagesContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.quick-question-btn');
            if (btn && !btn.disabled) {
                btn.disabled = true;
                const question = btn.dataset.question;
                const questionText = btn.textContent.trim();
                this.addUserMessage(questionText);
                this.handleQuickQuestion(question);
                setTimeout(() => { btn.disabled = false; }, 2000);
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target) && !this.trigger.contains(e.target)) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.container.classList.add('active');
        this.trigger.classList.add('active');
        this.isOpen = true;
        
        if (!this.hasGreeted) {
            this.showWelcomeMessage();
            this.hasGreeted = true;
        }
        
        setTimeout(() => this.input.focus(), 300);
    }
    
    close() {
        this.container.classList.remove('active');
        this.trigger.classList.remove('active');
        this.isOpen = false;
    }
    
    // ===== HUMAN-LIKE RESPONSE HELPERS =====
    
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    addPersonality(message) {
        const useEmpathy = Math.random() > 0.6;
        const useFiller = Math.random() > 0.7;
        
        let prefix = '';
        if (useEmpathy) prefix = this.getRandomItem(this.personality.empathyPhrases) + ' ';
        if (useFiller) prefix = this.getRandomItem(this.personality.fillerWords) + ' ' + prefix.toLowerCase();
        
        return prefix + message;
    }
    
    getTimeBasedGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        if (hour < 21) return "Good evening";
        return "Hey there";
    }
    
    getTypingDelay() {
        return 800 + Math.random() * 800; // 800-1600ms for natural feel
    }
    
    // ===== WELCOME MESSAGE =====
    
    showWelcomeMessage() {
        const greeting = this.getTimeBasedGreeting();
        const welcomeHTML = `
            <div class="welcome-section">
                <div class="welcome-wave">👋</div>
                <p style="margin-bottom: 8px;">${greeting}! I'm <span class="welcome-name">Ani</span>, your friendly assistant at <strong>Pioneer Software Solutions</strong>!</p>
                <p style="margin-bottom: 8px; color: #6b7280; font-size: 0.9rem;">I'm here to help you learn about our services, connect you with our team, or answer any questions you might have.</p>
                <p style="margin-bottom: 0;">What brings you here today? 😊</p>
            </div>
            
            <!-- FEATURED: Tally Section -->
            <div class="featured-service-banner">
                <div class="featured-badge">⭐ FEATURED</div>
                <div class="featured-content">
                    <div class="featured-icon">🧮</div>
                    <div class="featured-text">
                        <h4>Tally Prime Solutions</h4>
                        <p>Nepal's Authorized Tally Partner since 2012</p>
                    </div>
                </div>
                <button class="quick-question-btn featured-btn" data-question="tally">
                    Explore Tally Solutions →
                </button>
            </div>
            
            <div class="quick-questions-grid">
                <button class="quick-question-btn" data-question="services">🛠️ All Services</button>
                <button class="quick-question-btn" data-question="contact">📞 Contact Us</button>
                <button class="quick-question-btn" data-question="location">📍 Location</button>
                <button class="quick-question-btn" data-question="hours">🕐 Hours</button>
                <button class="quick-question-btn" data-question="team">👥 Our Team</button>
                <button class="quick-question-btn" data-question="about">ℹ️ About Us</button>
            </div>
        `;
        
        this.addBotMessage(welcomeHTML);
    }
    
    handleQuickQuestion(question) {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            
            switch(question) {
                case 'tally':
                    this.showTallyServices();
                    break;
                case 'services':
                    this.showServices();
                    break;
                case 'contact':
                    this.showContactInfo();
                    break;
                case 'location':
                    this.showLocation();
                    break;
                case 'hours':
                    this.showWorkingHours();
                    break;
                case 'team':
                    this.showTeam();
                    break;
                case 'about':
                    this.showAbout();
                    break;
                case 'tally-pricing':
                    this.showTallyPricing();
                    break;
                case 'tally-cloud':
                    this.showTallyCloud();
                    break;
                case 'tally-training':
                    this.showTallyTraining();
                    break;
                default:
                    this.addBotMessage(this.addPersonality("I'm not quite sure about that one. Let me show you what I can help with!"));
                    this.showQuickQuestionsOnly();
            }
        }, this.getTypingDelay());
    }
    
    // ===== TALLY SERVICES (FEATURED) =====
    
    showTallyServices() {
        const tallyHTML = `
            <div class="tally-hero">
                <div class="tally-hero-badge">🏆 Authorized Partner Since 2012</div>
                <h3>Tally Prime Solutions</h3>
                <p>Okay, so here's the thing - Tally is kind of our specialty! 😄 We've been helping businesses across Nepal manage their accounting with Tally for over a decade now.</p>
            </div>
            
            <div class="tally-features">
                <div class="tally-feature-item">
                    <div class="tally-feature-icon">📦</div>
                    <div class="tally-feature-content">
                        <h4>Tally Prime Licensing</h4>
                        <p>Silver (Single User) & Gold (Multi User) editions with genuine licenses</p>
                    </div>
                </div>
                
                <div class="tally-feature-item highlight">
                    <div class="tally-feature-icon">☁️</div>
                    <div class="tally-feature-content">
                        <h4>Tally on Cloud</h4>
                        <p>Access your Tally data from anywhere, anytime! Super popular with our clients.</p>
                        <span class="popular-tag">🔥 Popular</span>
                    </div>
                </div>
                
                <div class="tally-feature-item">
                    <div class="tally-feature-icon">🔧</div>
                    <div class="tally-feature-content">
                        <h4>Customization</h4>
                        <p>Custom reports, invoices, TDL development - we make Tally work YOUR way</p>
                    </div>
                </div>
                
                <div class="tally-feature-item">
                    <div class="tally-feature-icon">🎓</div>
                    <div class="tally-feature-content">
                        <h4>Training & Support</h4>
                        <p>From beginner to advanced - we'll get your team Tally-ready!</p>
                    </div>
                </div>
                
                <div class="tally-feature-item">
                    <div class="tally-feature-icon">🔄</div>
                    <div class="tally-feature-content">
                        <h4>Data Migration</h4>
                        <p>Moving from old software? We'll safely transfer all your data</p>
                    </div>
                </div>
                
                <div class="tally-feature-item">
                    <div class="tally-feature-icon">🛡️</div>
                    <div class="tally-feature-content">
                        <h4>Annual Maintenance</h4>
                        <p>Updates, backups, and priority support - we've got you covered</p>
                    </div>
                </div>
            </div>
            
            <p style="margin-top: 16px; font-style: italic; color: #6b7280;">
                "Honestly, I've seen so many businesses transform after proper Tally implementation. It's pretty amazing!" - Ani 💭
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn tally-btn" data-question="tally-pricing">💰 Pricing Info</button>
                <button class="quick-question-btn tally-btn" data-question="tally-cloud">☁️ Tally Cloud</button>
                <button class="quick-question-btn tally-btn" data-question="tally-training">🎓 Training</button>
                <button class="quick-question-btn" data-question="contact">📞 Talk to Expert</button>
            </div>
        `;
        
        this.addBotMessage(tallyHTML);
    }
    
    showTallyPricing() {
        const pricingHTML = `
            <p><strong>💰 Tally Pricing - Let's talk numbers!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                Alright, so pricing for Tally depends on a few things - like which edition you need and how many users. Let me break it down:
            </p>
            
            <div class="pricing-cards">
                <div class="pricing-card">
                    <div class="pricing-header silver">
                        <h4>Tally Prime Silver</h4>
                        <p>Single User</p>
                    </div>
                    <ul class="pricing-features">
                        <li>✅ Full Tally Prime features</li>
                        <li>✅ 1 Computer only</li>
                        <li>✅ Perfect for small business</li>
                        <li>✅ Free updates for 1 year</li>
                    </ul>
                </div>
                
                <div class="pricing-card popular">
                    <div class="popular-ribbon">Most Popular</div>
                    <div class="pricing-header gold">
                        <h4>Tally Prime Gold</h4>
                        <p>Multi User</p>
                    </div>
                    <ul class="pricing-features">
                        <li>✅ All Silver features</li>
                        <li>✅ Unlimited users</li>
                        <li>✅ Network sharing</li>
                        <li>✅ Remote access ready</li>
                    </ul>
                </div>
            </div>
            
            <div class="pricing-note">
                <p>📌 <strong>Quick tip:</strong> For exact pricing, I'd recommend chatting with our Tally team - they can also tell you about any ongoing offers!</p>
            </div>
            
            <div class="quick-questions">
                <button class="quick-question-btn" data-question="contact">📞 Get Quote</button>
                <button class="quick-question-btn" data-question="tally-cloud">☁️ Cloud Option</button>
            </div>
        `;
        
        this.addBotMessage(pricingHTML);
    }
    
    showTallyCloud() {
        const cloudHTML = `
            <p><strong>☁️ Tally on Cloud - This is actually really cool!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                Okay, imagine being able to access your Tally data from literally anywhere - your home, a coffee shop, another city - as long as you have internet. That's Tally on Cloud! ☕
            </p>
            
            <div class="cloud-benefits">
                <div class="cloud-benefit-item">
                    <span class="benefit-icon">🌍</span>
                    <div>
                        <strong>Access Anywhere</strong>
                        <p>Work from home, office, or on the go</p>
                    </div>
                </div>
                <div class="cloud-benefit-item">
                    <span class="benefit-icon">🔒</span>
                    <div>
                        <strong>Bank-Level Security</strong>
                        <p>Your data is encrypted and super safe</p>
                    </div>
                </div>
                <div class="cloud-benefit-item">
                    <span class="benefit-icon">💾</span>
                    <div>
                        <strong>Auto Backups</strong>
                        <p>Never worry about losing data again</p>
                    </div>
                </div>
                <div class="cloud-benefit-item">
                    <span class="benefit-icon">👥</span>
                    <div>
                        <strong>Team Collaboration</strong>
                        <p>Multiple users can work simultaneously</p>
                    </div>
                </div>
            </div>
            
            <p style="margin-top: 12px; padding: 10px; background: #f0fdf4; border-radius: 8px; color: #166534;">
                💡 <strong>Fun fact:</strong> Most of our clients who switch to Tally Cloud say they can't imagine going back! The flexibility is just... *chef's kiss* 👌
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn" data-question="tally-pricing">💰 Pricing</button>
                <button class="quick-question-btn" data-question="contact">📞 Learn More</button>
            </div>
        `;
        
        this.addBotMessage(cloudHTML);
    }
    
    showTallyTraining() {
        const trainingHTML = `
            <p><strong>🎓 Tally Training - From Zero to Hero!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                Whether you're completely new to Tally or just want to level up your skills, we've got training programs for everyone. And trust me, our trainers are really patient - no question is a silly question! 😊
            </p>
            
            <div class="training-levels">
                <div class="training-card beginner">
                    <div class="level-badge">Beginner</div>
                    <h4>Foundation Course</h4>
                    <p>Perfect for Tally newbies. We start from the very basics.</p>
                    <ul>
                        <li>Company creation</li>
                        <li>Basic accounting entries</li>
                        <li>Simple reports</li>
                        <li>Day-to-day operations</li>
                    </ul>
                </div>
                
                <div class="training-card intermediate">
                    <div class="level-badge">Intermediate</div>
                    <h4>Professional Course</h4>
                    <p>For those who know the basics but want to do more.</p>
                    <ul>
                        <li>Inventory management</li>
                        <li>GST/VAT handling</li>
                        <li>Advanced reporting</li>
                        <li>Multi-company setup</li>
                    </ul>
                </div>
                
                <div class="training-card advanced">
                    <div class="level-badge">Advanced</div>
                    <h4>Expert Course</h4>
                    <p>Become a Tally power user!</p>
                    <ul>
                        <li>TDL customization basics</li>
                        <li>Complex business scenarios</li>
                        <li>Performance optimization</li>
                        <li>Admin & security</li>
                    </ul>
                </div>
            </div>
            
            <p style="margin-top: 12px; color: #6b7280; font-style: italic;">
                🎯 "The best investment you can make is in your team's skills." - Something I truly believe!
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn" data-question="contact">📞 Enroll Now</button>
                <button class="quick-question-btn" data-question="tally">🧮 All Tally Services</button>
            </div>
        `;
        
        this.addBotMessage(trainingHTML);
    }
    
    // ===== REGULAR SERVICES =====
    
    showServices() {
        const servicesData = this.companyData.services || {
            featured: { name: "Tally Solutions", items: [] },
            regular: []
        };
        
        let servicesHTML = `
            <p><strong>🛠️ Our Services - Here's what we do!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                Alright, let me walk you through everything we offer. We're basically a one-stop shop for all things tech! 🚀
            </p>
            
            <!-- Featured: Tally -->
            <div class="service-featured-card" onclick="document.querySelector('[data-question=tally]').click()">
                <div class="featured-star">⭐</div>
                <div class="service-featured-content">
                    <h4>🧮 Tally Prime Solutions</h4>
                    <p>Our specialty! Authorized Tally Partner for 12+ years</p>
                    <span class="view-more">Click to explore →</span>
                </div>
            </div>
            
            <p style="margin: 16px 0 8px; font-weight: 600; color: #374151;">Other Services:</p>
            
            <div class="services-grid">
        `;
        
        const regularServices = [
            {icon: "💻", name: "Web Development", desc: "Modern, responsive websites that look amazing"},
            {icon: "📱", name: "Mobile Apps", desc: "iOS & Android apps for your business"},
            {icon: "⚙️", name: "Custom Software", desc: "Tailored solutions for unique needs"},
            {icon: "📈", name: "Digital Marketing", desc: "SEO, ads, social media - the works!"},
            {icon: "🎨", name: "Graphic Design", desc: "Branding, UI/UX, and creative design"}
        ];
        
        regularServices.forEach(service => {
            servicesHTML += `
                <div class="service-grid-item">
                    <span class="service-icon">${service.icon}</span>
                    <div class="service-text">
                        <strong>${service.name}</strong>
                        <small>${service.desc}</small>
                    </div>
                </div>
            `;
        });
        
        servicesHTML += `
            </div>
            
            <p style="margin-top: 16px; color: #6b7280;">
                💬 Anything specific catching your eye? I'd love to tell you more about any of these!
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn tally-btn" data-question="tally">🧮 Tally Details</button>
                <button class="quick-question-btn" data-question="contact">📞 Get Quote</button>
                <button class="quick-question-btn" data-question="about">ℹ️ About Us</button>
            </div>
        `;
        
        this.addBotMessage(servicesHTML);
    }
    
    showContactInfo() {
        const contactHTML = `
            <p><strong>📞 Let's Connect!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                I'd love to get you in touch with our team! Here are all the ways you can reach us:
            </p>
            
            <div class="contact-options">
                <a href="tel:+977-1-4533234" class="contact-option-card phone">
                    <i class="fas fa-phone"></i>
                    <div>
                        <strong>Call Us</strong>
                        <p>+977-1-4533234</p>
                    </div>
                </a>
                
                <a href="https://wa.me/9779851141375" target="_blank" class="contact-option-card whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    <div>
                        <strong>WhatsApp</strong>
                        <p>Quick responses! 💬</p>
                    </div>
                </a>
                
                <a href="mailto:info@pioneersoftware.com.np" class="contact-option-card email">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <strong>Email</strong>
                        <p>info@pioneersoftware.com.np</p>
                    </div>
                </a>
                
                <a href="${this.companyData.website}" target="_blank" class="contact-option-card website">
                    <i class="fas fa-globe"></i>
                    <div>
                        <strong>Website</strong>
                        <p>pioneersoftware.com.np</p>
                    </div>
                </a>
            </div>
            
            <p style="margin-top: 12px; color: #6b7280;">
                🕐 <strong>Pro tip:</strong> For the quickest response, WhatsApp is usually the way to go!
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn" data-question="team">👥 Talk to Specific Person</button>
                <button class="quick-question-btn" data-question="location">📍 Visit Office</button>
            </div>
        `;
        
        this.addBotMessage(contactHTML);
    }
    
    showLocation() {
        const locationHTML = `
            <p><strong>📍 Come Visit Us!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                We'd love to see you in person! Here's where you can find us:
            </p>
            
            <div class="location-card">
                <div class="location-icon">🏢</div>
                <div class="location-details">
                    <h4>Pioneer Software Solutions</h4>
                    <p><strong>Naag Pokhari, Kathmandu, Nepal</strong></p>
                    <p style="color: #6b7280; font-size: 0.9rem;">
                        📌 80 meters north from Hotel Marriott<br>
                        (It's pretty easy to find!)
                    </p>
                </div>
            </div>
            
            <div class="location-map-placeholder">
                <a href="https://maps.google.com/?q=Pioneer+Software+Solutions+Kathmandu" target="_blank" class="map-link">
                    <i class="fas fa-map-marked-alt"></i>
                    Open in Google Maps
                </a>
            </div>
            
            <p style="margin-top: 12px; color: #6b7280; font-style: italic;">
                ☕ Fun fact: There's great coffee nearby, so meetings here are always nice! 
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn" data-question="hours">🕐 Opening Hours</button>
                <button class="quick-question-btn" data-question="contact">📞 Contact First</button>
            </div>
        `;
        
        this.addBotMessage(locationHTML);
    }
    
    showWorkingHours() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = Sunday
        const isOpen = (day >= 0 && day <= 5) && (hour >= 9 && hour < 18);
        
        const hoursHTML = `
            <p><strong>🕐 Our Working Hours</strong></p>
            
            <div class="status-badge ${isOpen ? 'open' : 'closed'}">
                ${isOpen ? '🟢 We\'re Open Right Now!' : '🔴 Currently Closed'}
            </div>
            
            <div class="hours-schedule">
                <div class="hours-row">
                    <span class="day">Sunday - Friday</span>
                    <span class="time">9:00 AM - 6:00 PM</span>
                </div>
                <div class="hours-row closed-day">
                    <span class="day">Saturday</span>
                    <span class="time">Closed</span>
                </div>
                <div class="hours-row closed-day">
                    <span class="day">Public Holidays</span>
                    <span class="time">Closed</span>
                </div>
            </div>
            
            ${!isOpen ? `
                <p style="margin-top: 12px; padding: 10px; background: #fef3c7; border-radius: 8px; color: #92400e;">
                    💡 No worries though! You can still drop us a message or email, and we'll get back to you first thing!
                </p>
            ` : `
                <p style="margin-top: 12px; color: #059669;">
                    ✨ Great timing! Feel free to call or visit us right now!
                </p>
            `}
            
            <div class="quick-questions">
                <button class="quick-question-btn" data-question="contact">📞 Contact Us</button>
                <button class="quick-question-btn" data-question="location">📍 Get Directions</button>
            </div>
        `;
        
        this.addBotMessage(hoursHTML);
    }
    
    showTeam() {
        const avatarImages = {
            'Anil Munakarmi': 'Team/Images/Anil.jpg',
            'Mani Maharjan': 'Team/Images/mani.jpg',
            'Suman Mool': 'Team/Images/Suman.jpg',
            'Krijan Maharjan': 'Team/Images/Krijan.png',
            'Ashish Shrestha': 'Team/Images/Ashish.png',
            'Nhuja Maharjan': 'Team/Images/Nhuja.png',
            'Om Pandey': 'Team/Images/Om.jpg'
        };
        
        let teamHTML = `
            <p><strong>👥 Meet Our Amazing Team!</strong></p>
            <p style="margin-bottom: 12px; color: #4b5563;">
                These are the wonderful humans behind Pioneer! Each one brings something special to the table. 💪
            </p>
            
            <div class="team-grid">
        `;
        
        this.companyData.employees.forEach(employee => {
            const avatarSrc = avatarImages[employee.name] || '';
            const initials = employee.name.split(' ').map(n => n[0]).join('');
            const phoneClean = employee.phone.replace(/-/g, '');
            
            teamHTML += `
                <div class="team-card" onclick="window.location.href='tel:${phoneClean}'">
                    <div class="team-avatar">
                        ${avatarSrc ? 
                            `<img src="${avatarSrc}" alt="${employee.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <span class="avatar-fallback" style="display:none;">${initials}</span>` : 
                            `<span class="avatar-fallback">${initials}</span>`
                        }
                    </div>
                    <div class="team-info">
                        <h4>${employee.name}</h4>
                        <p class="role">${employee.role}</p>
                        <p class="phone"><i class="fas fa-phone"></i> ${employee.phone}</p>
                    </div>
                </div>
            `;
        });
        
        teamHTML += `
            </div>
            
            <p style="margin-top: 12px; font-size: 0.85rem; color: #6b7280;">
                📱 Tap on any card to call directly! We're all friendly, I promise 😊
            </p>
        `;
        
        this.addBotMessage(teamHTML);
    }
    
    showAbout() {
        const aboutHTML = `
            <p><strong>ℹ️ About Pioneer Software Solutions</strong></p>
            <p style="margin: 12px 0; line-height: 1.7; color: #4b5563;">
                So, here's our story in a nutshell... 📖
            </p>
            <p style="margin-bottom: 12px; line-height: 1.7; color: #4b5563;">
                We started back in <strong>2010</strong> with a simple mission: help Nepali businesses embrace technology without the headache. Fast forward to today, and we're proud to say we've helped thousands of businesses transform the way they work!
            </p>
            
            <div class="about-stats">
                <div class="stat-item">
                    <span class="stat-number">12+</span>
                    <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">2500+</span>
                    <span class="stat-label">Happy Clients</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">8+</span>
                    <span class="stat-label">Team Members</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">100%</span>
                    <span class="stat-label">Dedication</span>
                </div>
            </div>
            
            <div class="about-highlight">
                <div class="highlight-icon">🏆</div>
                <div class="highlight-text">
                    <strong>Authorized Tally Partner</strong>
                    <p>One of Nepal's most trusted Tally partners since 2012</p>
                </div>
            </div>
            
            <p style="margin-top: 16px; font-style: italic; color: #6b7280;">
                "We don't just deliver projects - we build relationships. Every client is a partner in our journey." 💜
            </p>
            
            <div class="quick-questions">
                <button class="quick-question-btn tally-btn" data-question="tally">🧮 Our Tally Expertise</button>
                <button class="quick-question-btn" data-question="services">🛠️ All Services</button>
                <button class="quick-question-btn" data-question="team">👥 Meet Team</button>
            </div>
        `;
        
        this.addBotMessage(aboutHTML);
    }
    
    // ===== MESSAGE PROCESSING =====
    
    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.input.value = '';
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.processUserMessage(message);
        }, this.getTypingDelay());
    }
    
    processUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        this.conversationContext.push({ role: 'user', message: lowerMessage });
        
        // Check for name introduction
        const nameMatch = message.match(/(?:i'?m|my name is|this is|call me)\s+([a-zA-Z]+)/i);
        if (nameMatch) {
            this.userName = nameMatch[1];
            this.addBotMessage(`
                <p>Nice to meet you, <strong>${this.userName}</strong>! 😊 That's a lovely name!</p>
                <p>So, ${this.userName}, what can I help you with today?</p>
                <div class="quick-questions">
                    <button class="quick-question-btn tally-btn" data-question="tally">🧮 Tally Solutions</button>
                    <button class="quick-question-btn" data-question="services">🛠️ Services</button>
                    <button class="quick-question-btn" data-question="contact">📞 Contact</button>
                </div>
            `);
            return;
        }
        
        // Greetings with personality
        if (this.matchWords(lowerMessage, ['hello', 'hi', 'hey', 'namaste', 'नमस्ते', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'])) {
            const greetingResponses = [
                `Hey there! 👋 ${this.userName ? `Good to see you again, ${this.userName}!` : 'So nice to chat with you!'} How can I make your day better?`,
                `Hello hello! 😊 Welcome to Pioneer! What brings you here today?`,
                `Hi! ${this.getTimeBasedGreeting()}! I'm Ani, and I'm here to help. What's on your mind?`,
                `नमस्ते! 🙏 Great to have you here! How can I assist you today?`
            ];
            this.addBotMessage(this.getRandomItem(greetingResponses));
            this.showQuickQuestionsOnly();
            return;
        }
        
        // TALLY - Primary focus
        if (this.matchWords(lowerMessage, ['tally', 'tallyprime', 'tally prime', 'accounting software', 'टैली'])) {
            const tallyResponses = [
                "Ooh, Tally! That's our jam! 🧮 Let me tell you all about it...",
                "Ah, asking about Tally? You've come to the right place! We're basically Tally experts here 😄",
                "Tally Prime, huh? Great choice! It's honestly the best accounting software out there. Here's what we offer..."
            ];
            this.addBotMessage(`<p>${this.getRandomItem(tallyResponses)}</p>`);
            setTimeout(() => this.showTallyServices(), 500);
            return;
        }
        
        // Services
        if (this.matchWords(lowerMessage, ['service', 'services', 'offer', 'do you do', 'provide', 'what do you', 'help with'])) {
            this.showServices();
            return;
        }
        
        // Contact
        if (this.matchWords(lowerMessage, ['contact', 'call', 'phone', 'email', 'reach', 'number', 'whatsapp'])) {
            this.showContactInfo();
            return;
        }
        
        // Location
        if (this.matchWords(lowerMessage, ['location', 'address', 'where', 'office', 'visit', 'find you', 'located', 'direction'])) {
            this.showLocation();
            return;
        }
        
        // Working hours
        if (this.matchWords(lowerMessage, ['hours', 'time', 'open', 'close', 'timing', 'working', 'schedule', 'when'])) {
            this.showWorkingHours();
            return;
        }
        
        // Team
        if (this.matchWords(lowerMessage, ['team', 'staff', 'employee', 'people', 'who works', 'members', 'developer'])) {
            this.showTeam();
            return;
        }
        
        // About
        if (this.matchWords(lowerMessage, ['about', 'company', 'pioneer', 'tell me about', 'who are you', 'know more'])) {
            this.showAbout();
            return;
        }
        
        // Website/Web Development
        if (this.matchWords(lowerMessage, ['website', 'web development', 'web design', 'make website', 'build website', 'need website'])) {
            this.addBotMessage(`
                <p><strong>💻 Web Development? We'd love to help!</strong></p>
                <p style="margin: 12px 0; color: #4b5563;">
                    Creating websites is something we really enjoy! From simple landing pages to complex web applications - we've done it all. 
                </p>
                <div class="services-list">
                    <div class="service-item">
                        <span>🎨</span>
                        <span>Custom Design - Unique to YOUR brand</span>
                    </div>
                    <div class="service-item">
                        <span>📱</span>
                        <span>Mobile Responsive - Looks great everywhere</span>
                    </div>
                    <div class="service-item">
                        <span>⚡</span>
                        <span>Fast & SEO Optimized</span>
                    </div>
                    <div class="service-item">
                        <span>🛒</span>
                        <span>E-commerce Ready</span>
                    </div>
                </div>
                <p style="margin-top: 12px;">Want to discuss your project? I can connect you with our dev team! 🚀</p>
                <div class="quick-questions">
                    <button class="quick-question-btn" data-question="contact">📞 Talk to Developer</button>
                    <button class="quick-question-btn" data-question="team">👥 Meet Team</button>
                </div>
            `);
            return;
        }
        
        // Mobile App
        if (this.matchWords(lowerMessage, ['app', 'mobile app', 'android', 'ios', 'application'])) {
            this.addBotMessage(`
                <p><strong>📱 Mobile App Development!</strong></p>
                <p style="margin: 12px 0; color: #4b5563;">
                    Apps are kinda our thing too! Whether you need an Android app, iOS app, or both - we've got you covered.
                </p>
                <div class="services-list">
                    <div class="service-item"><span>🤖</span><span>Android Apps</span></div>
                    <div class="service-item"><span>🍎</span><span>iOS Apps</span></div>
                    <div class="service-item"><span>⚛️</span><span>Cross-Platform (React Native)</span></div>
                    <div class="service-item"><span>🔧</span><span>App Maintenance & Updates</span></div>
                </div>
                <p style="margin-top: 12px;">Got an app idea? Let's make it happen! 💡</p>
                <div class="quick-questions">
                    <button class="quick-question-btn" data-question="contact">📞 Discuss Project</button>
                </div>
            `);
            return;
        }
        
        // Pricing/Cost
        if (this.matchWords(lowerMessage, ['price', 'cost', 'pricing', 'quote', 'rate', 'charge', 'fee', 'how much', 'budget', 'expensive'])) {
            this.addBotMessage(`
                <p><strong>💰 Let's Talk Pricing!</strong></p>
                <p style="margin: 12px 0; color: #4b5563;">
                    Good question! Here's the thing - pricing really depends on what you need. We don't believe in one-size-fits-all pricing because every project is unique.
                </p>
                <p style="margin-bottom: 12px; color: #4b5563;">
                    But I can tell you this: we're known for being fair and transparent. No hidden costs, no surprises! 
                </p>
                <p style="padding: 12px; background: #f0fdf4; border-radius: 8px; color: #166534;">
                    💡 <strong>My suggestion:</strong> Tell us what you need, and we'll give you a clear quote. Usually same day!
                </p>
                <div class="quick-questions">
                    <button class="quick-question-btn tally-btn" data-question="tally-pricing">🧮 Tally Pricing</button>
                    <button class="quick-question-btn" data-question="contact">📞 Get Custom Quote</button>
                </div>
            `);
            return;
        }
        
        // Thank you responses
        if (this.matchWords(lowerMessage, ['thank', 'thanks', 'धन्यवाद', 'appreciated', 'helpful', 'great'])) {
            const thankResponses = [
                `You're so welcome! 😊 ${this.userName ? this.userName + ', ' : ''}It's my pleasure to help!`,
                "Aww, thank you for saying that! 💜 Is there anything else I can help with?",
                "That's really kind of you to say! 🌟 Always happy to help!",
                "धन्यवाद! 🙏 Let me know if you need anything else!"
            ];
            this.addBotMessage(this.getRandomItem(thankResponses));
            this.showQuickQuestionsOnly();
            return;
        }
        
        // Goodbye
        if (this.matchWords(lowerMessage, ['bye', 'goodbye', 'see you', 'later', 'take care', 'gotta go'])) {
            const byeResponses = [
                `Goodbye${this.userName ? ', ' + this.userName : ''}! 👋 It was great chatting with you. Come back anytime!`,
                "Take care! 🌟 Wishing you an amazing day ahead!",
                "See you later! 😊 Don't hesitate to reach out if you need anything!",
                "Bye for now! 👋 The team here is always happy to help when you're ready!"
            ];
            this.addBotMessage(this.getRandomItem(byeResponses));
            return;
        }
        
        // How are you
        if (this.matchWords(lowerMessage, ['how are you', 'how r u', 'how are u', 'whats up', "what's up", 'how do you do'])) {
            const howAreYouResponses = [
                "I'm doing great, thanks for asking! 😊 Just here helping people discover Pioneer's amazing services. How about you?",
                "Fantastic! Every conversation makes my day better. 💜 What can I do for you?",
                "I'm wonderful! Ready and excited to help you. What's on your mind today?"
            ];
            this.addBotMessage(this.getRandomItem(howAreYouResponses));
            return;
        }
        
        // Help
        if (this.matchWords(lowerMessage, ['help', 'support', 'assist', 'need help', 'confused', 'stuck'])) {
            this.addBotMessage(`
                <p><strong>🤝 I'm here to help!</strong></p>
                <p style="margin: 12px 0; color: #4b5563;">
                    No worries at all - that's exactly what I'm here for! Let me show you what I can assist with:
                </p>
                <div class="help-options">
                    <div class="help-category">
                        <h4>🧮 Tally Solutions</h4>
                        <p>Our specialty - licensing, cloud, training, customization</p>
                    </div>
                    <div class="help-category">
                        <h4>🛠️ Other Services</h4>
                        <p>Web dev, apps, design, marketing</p>
                    </div>
                    <div class="help-category">
                        <h4>📞 Connect</h4>
                        <p>Contact info, team, location, hours</p>
                    </div>
                </div>
                <p style="margin-top: 12px;">Just click any button below or type your question - I'll do my best! 💪</p>
                <div class="quick-questions">
                    <button class="quick-question-btn tally-btn" data-question="tally">🧮 Tally</button>
                    <button class="quick-question-btn" data-question="services">🛠️ Services</button>
                    <button class="quick-question-btn" data-question="contact">📞 Contact</button>
                    <button class="quick-question-btn" data-question="about">ℹ️ About</button>
                </div>
            `);
            return;
        }
        
        // Default - Friendly fallback with personality
        const defaultResponses = [
            `Hmm, that's an interesting one! 🤔 I want to make sure I give you the right info.`,
            `Great question! Let me think about that... 💭`,
            `I appreciate you asking! Though I might need a bit more context.`,
            `Ooh, I'm not 100% sure about that specific thing, but I'd love to help!`
        ];
        
        const defaultHTML = `
            <p>${this.getRandomItem(defaultResponses)}</p>
            <p style="margin: 12px 0; color: #4b5563;">
                Here's what I can definitely help you with:
            </p>
            <div class="quick-questions">
                <button class="quick-question-btn tally-btn" data-question="tally">🧮 Tally Solutions</button>
                <button class="quick-question-btn" data-question="services">🛠️ Our Services</button>
                <button class="quick-question-btn" data-question="contact">📞 Contact Team</button>
                <button class="quick-question-btn" data-question="about">ℹ️ About Us</button>
            </div>
            <p style="margin-top: 12px; font-size: 0.9rem; color: #6b7280;">
                Or feel free to call us at <strong>+977-1-4533234</strong> - our humans are even smarter than me! 😄
            </p>
        `;
        
        this.addBotMessage(defaultHTML);
    }
    
    showQuickQuestionsOnly() {
        setTimeout(() => {
            const questionsHTML = `
                <div class="quick-questions">
                    <button class="quick-question-btn tally-btn" data-question="tally">🧮 Tally</button>
                    <button class="quick-question-btn" data-question="services">🛠️ Services</button>
                    <button class="quick-question-btn" data-question="contact">📞 Contact</button>
                </div>
            `;
            this.addBotMessage(questionsHTML);
        }, 300);
    }
    
    matchWords(text, words) {
        return words.some(word => text.includes(word));
    }
    
    // ===== MESSAGE UI METHODS =====
    
    addBotMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <img src="Team/Images/Ani.png" alt="Ani" onerror="this.style.display='none'; this.parentElement.textContent='A';">
            </div>
            <div class="message-content">
                ${content}
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addUserMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-avatar">${this.userName ? this.userName[0].toUpperCase() : 'U'}</div>
            <div class="message-content">
                <p>${this.escapeHTML(content)}</p>
                <div class="message-time">${this.getCurrentTime()}</div>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        this.hideTyping();
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <img src="Team/Images/Ani.png" alt="Ani" onerror="this.style.display='none'; this.parentElement.textContent='A';">
            </div>
            <div class="message-content">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) typingIndicator.remove();
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 50);
    }
    
    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }
    
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.pioneerChatbot = new PioneerChatbot();
});
