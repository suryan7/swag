import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import Magnetic from './Magnetic';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Work', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNav = (e, href) => {
        e && e.preventDefault();
        const anchor = href?.startsWith('#') ? href.slice(1) : href;

        // If already on home route, just scroll to the element if present
        if (location.pathname === '/') {
            const el = document.getElementById(anchor);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                // fallback: update hash
                navigate('/' + href);
            }
            setIsOpen(false);
            return;
        }

        // Navigate to home first, then scroll after a short delay
        navigate('/' + href);
        setTimeout(() => {
            const el = document.getElementById(anchor);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);

        setIsOpen(false);
    };

    return (
        <nav className="fixed top-8 left-0 right-0 z-50 px-6 pointer-events-none">
            <div className="container mx-auto max-w-4xl bg-white/80 backdrop-blur-md border-[3px] border-pop-black rounded-full px-6 py-3 flex justify-between items-center shadow-pop pointer-events-auto">

                <Magnetic>
                    <a href="#" onClick={(e) => handleNav(e, '#hero')} className="flex items-center gap-2 group">
                        <div className="bg-pop-purple text-white p-2 rounded-full border-2 border-pop-black group-hover:rotate-12 transition-transform">
                            <Zap size={20} className="fill-current" />
                        </div>
                        <span className="text-xl font-display text-pop-black group-hover:text-pop-purple transition-colors">SWAG.</span>
                    </a>
                </Magnetic>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Magnetic key={link.name}>
                            <a
                                href={link.href}
                                onClick={(e) => handleNav(e, link.href)}
                                className="text-sm font-bold bg-transparent px-4 py-2 rounded-full hover:bg-pop-black hover:text-white transition-all border border-transparent hover:border-pop-black"
                            >
                                {link.name}
                            </a>
                        </Magnetic>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-4 bg-pop-yellow border-2 border-pop-black px-5 py-2 rounded-full font-bold text-sm shadow-[2px_2px_0px_0px_#18181B] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                        onClick={(e) => handleNav(e, '#contact')}
                    >
                        HIRE ME!
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-pop-black" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="md:hidden fixed inset-0 bg-pop-purple z-40 flex flex-col items-center justify-center space-y-8 origin-top pointer-events-auto"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNav(e, link.href)}
                                className="text-5xl font-display text-white hover:text-pop-yellow transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
