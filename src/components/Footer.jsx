export default function Footer() {
    return (
        <footer className="bg-pop-black py-16 text-center">
            <h2 className="text-[10vw] font-display text-white leading-none opacity-20 select-none">
                SWAGATA
            </h2>
            <div className="mt-8 flex justify-center gap-6 text-white font-bold">
                <a href="https://www.instagram.com/shades_by_swaggy" target="_blank" rel="noopener noreferrer" className="hover:text-pop-yellow transition-colors">INSTAGRAM</a>
                <a href="#" className="hover:text-pop-cyan transition-colors">TWITTER</a>
                <a href="https://www.linkedin.com/in/swagatadolui/" target="_blank" rel="noopener noreferrer" className="hover:text-pop-pink transition-colors">LINKEDIN</a>
            </div>
            <p className="text-white/40 font-bold mt-8 text-sm">© 2026 ALL RIGHTS RESERVED.</p>
        </footer>
    );
}
