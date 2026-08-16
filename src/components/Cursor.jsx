import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] text-rich-black"
            animate={{
                x: mousePosition.x - 10, // Offset to center the character roughly
                y: mousePosition.y - 12,
                scale: isClicked ? 0.8 : isHovered ? 1.5 : 1,
                rotate: isHovered ? 180 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 1000,
                damping: 50,
                mass: 0.1 // Very light mass for instant following
            }}
        >
            {/* Using an SVG for a crisp Star shape instead of text */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-md"
            >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
        </motion.div>
    );
}
