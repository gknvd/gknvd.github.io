import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// NavLink Component
// Reusable navigation link component with active state handling
const NavLink = ({ href, children }) => {
    return (
        <a
            href={href}
            className="text-white hover:text-accent-500 transition-colors duration-300
                px-3 py-2 rounded-md text-sm font-medium"
        >
            {children}
        </a>
    );
};

// MobileNavLink Component
// Mobile-optimized navigation link with enhanced touch targets
const MobileNavLink = ({ href, children }) => {
    return (
        <a
            href={href}
            className="text-white hover:bg-primary-600 block px-3 py-4
                rounded-md text-base font-medium transition-colors duration-300"
        >
            {children}
        </a>
    );
};

// NavigationBar Component
const NavigationBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 
            ${isScrolled ? 'bg-primary-600 shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img 
                            src="/api/placeholder/40/40" 
                            alt="Virtualize LLC"
                            className="h-10 w-10"
                        />
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink href="#services">Services</NavLink>
                        <NavLink href="#about">About</NavLink>
                        <NavLink href="#contact">Contact</NavLink>
                        <button className="bg-accent-500 text-primary-700 px-4 py-2 
                            rounded-md hover:bg-accent-600 transition-colors duration-300">
                            Get Started
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white p-2"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-primary-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <MobileNavLink href="#services">Services</MobileNavLink>
                        <MobileNavLink href="#about">About</MobileNavLink>
                        <MobileNavLink href="#contact">Contact</MobileNavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

// [Rest of the components remain the same...]
// ServiceCard Component
const ServiceCard = ({ title, description, icon }) => {
    return (
        <div className="group relative bg-white p-6 rounded-lg shadow-md 
            transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 
                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
            
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    {icon && React.cloneElement(icon, {
                        className: "w-6 h-6 text-primary-500"
                    })}
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

// TestimonialSlider Component
const TestimonialSlider = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const handleNext = () => {
        setCurrentIndex((prev) => 
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => 
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    return (
        <div className="relative max-w-4xl mx-auto px-4 py-12">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="px-8 py-12 text-center">
                    <blockquote className="text-xl text-gray-900 mb-4">
                        {testimonials[currentIndex].quote}
                    </blockquote>
                    <cite className="text-gray-600 not-italic">
                        {testimonials[currentIndex].author}
                        <span className="block text-sm mt-1">
                            {testimonials[currentIndex].position}
                        </span>
                    </cite>
                </div>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button 
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-primary-500 text-white"
                    aria-label="Previous testimonial"
                >
                    <ChevronDown className="w-6 h-6 rotate-90" />
                </button>
                <button 
                    onClick={handleNext}
                    className="p-2 rounded-full bg-primary-500 text-white"
                    aria-label="Next testimonial"
                >
                    <ChevronDown className="w-6 h-6 -rotate-90" />
                </button>
            </div>
        </div>
    );
};

// ContactForm Component
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('success');
        
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setStatus('idle');
        }, 3000);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
            <div>
                <label 
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        name: e.target.value
                    }))}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 
                        focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div>
                <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        email: e.target.value
                    }))}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 
                        focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div>
                <label 
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        message: e.target.value
                    }))}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 
                        focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3 px-4 bg-primary-500 text-white rounded-md
                    hover:bg-primary-600 focus:outline-none focus:ring-2 
                    focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 
                 status === 'success' ? 'Sent!' : 'Send Message'}
            </button>
        </form>
    );
};

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationBar />
            
            <main className="pt-16">
                <section id="services" className="py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Our Services
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ServiceCard
                                title="Enterprise Software"
                                description="Custom solutions built for scalability and performance."
                                icon={<Menu />}
                            />
                            <ServiceCard
                                title="Cloud Infrastructure"
                                description="Secure and scalable cloud solutions for your business."
                                icon={<Menu />}
                            />
                            <ServiceCard
                                title="Cybersecurity"
                                description="Advanced security measures to protect your assets."
                                icon={<Menu />}
                            />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-20">
                    <TestimonialSlider testimonials={[
                        {
                            quote: "Virtualize LLC transformed our digital infrastructure.",
                            author: "John Smith",
                            position: "CTO, Tech Corp"
                        },
                        {
                            quote: "Outstanding service and technical expertise.",
                            author: "Jane Doe",
                            position: "CEO, Innovation Inc"
                        }
                    ]} />
                </section>

                <section id="contact" className="py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Contact Us
                        </h2>
                        <ContactForm />
                    </div>
                </section>
            </main>
        </div>
    );
}
