import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const shapes = ['★', '●', '▲', '■'];
const colors = ['#8B5CF6', '#FFD500', '#00E5FF', '#FF477E'];

export default function CursorTrail() {
    const containerRef = useRef(null);
    const requestRef = useRef();
    const particleIndex = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Limit creation rate
            if (Math.random() > 0.3) return;

            const particle = document.createElement('div');
            particle.innerText = shapes[Math.floor(Math.random() * shapes.length)];
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.position = 'fixed';
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            particle.style.fontSize = `${Math.random() * 10 + 10}px`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.transform = 'translate(-50%, -50%)';
            particle.style.fontWeight = 'bold';

            // Animation handled via CSS/Web Animations API for performance
            particle.animate([
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1) rotate(0deg)' },
                { opacity: 0, transform: `translate(-50%, -50%) scale(0) rotate(${Math.random() * 100 - 50}deg) translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)` }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0, .9, .57, 1)',
            }).onfinish = () => particle.remove();

            document.body.appendChild(particle);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return null; // Logic only
}
