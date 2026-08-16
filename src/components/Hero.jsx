import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Sparkles, Smile } from 'lucide-react';
import photo2 from '../assets/photo2.jpg';
import Magnetic from './Magnetic';

const stompVariants = {
    hidden: { y: -50, opacity: 0, rotate: -5 },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        rotate: 0,
        transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 12
        }
    })
};

const wordVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-32 px-6 relative overflow-hidden bg-pop-white">

            {/* Background Abstract Shapes */}
            <motion.div
                style={{ y: y1 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-pop-cyan/20 blur-[100px] rounded-full pointer-events-none"
            />
            <motion.div
                style={{ y: y2 }}
                animate={{ y: [0, 50, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-pop-pink/20 blur-[100px] rounded-full pointer-events-none"
            />

            <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Text Content */}
                <div className="space-y-8 relative">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-pop-lime border-2 border-pop-black px-4 py-1 rounded-full shadow-[4px_4px_0px_0px_#18181B]"
                    >
                        <Sparkles size={16} />
                        <span className="font-bold text-sm">DIGITAL ILLUSTRATOR</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-display leading-[0.9] text-red-700">
                        MEET THE ARTIST
                    </h1>

                    <div className="text-lg md:text-xl text-pop-black/80 font-normal max-w-lg leading-relaxed space-y-3">
                        <p className="m-0">Hi, I’m <span className="font-semibold">Swagata</span>, an illustrator who loves turning stories, emotions, and little moments into visuals.</p>
                        <p className="m-0 text-base md:text-lg">My work focuses on character-driven 2D illustration, storytelling, and expressive worlds.</p>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <Magnetic>
                            <a href="#portfolio" className="bg-pop-black text-white px-8 py-4 rounded-xl font-display text-xl border-2 border-pop-black hover:bg-pop-purple hover:text-white transition-all shadow-pop hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2">
                                SEE WORKS <ArrowDownRight />
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* Image / Sticker Composition */}
                <div className="relative flex justify-center md:justify-end h-[550px] w-full">
                    <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[550px]">

                        {/* Backing Card */}
                        <div className="absolute inset-0 bg-pop-purple rounded-3xl border-[3px] border-pop-black shadow-pop-lg rotate-3" />

                        {/* Image Card */}
                        <motion.div
                            className="absolute inset-0 bg-white rounded-3xl border-[3px] border-pop-black overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-300"
                        >
                            <img
                                src={photo2}
                                alt="Swagata"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </motion.div>

                        {/* Floating Stickers - DRAGGABLE NOW! */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                            dragElastic={0.2}
                            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                            whileHover={{ scale: 1.1, cursor: "grab" }}
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -top-8 -right-8 bg-pop-yellow text-pop-black w-24 h-24 rounded-full border-[3px] border-pop-black flex items-center justify-center font-display text-4xl shadow-pop z-20"
                        >
                            <Smile size={48} />
                        </motion.div>

                        <motion.div
                            drag
                            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                            dragElastic={0.2}
                            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                            whileHover={{ scale: 1.1, cursor: "grab" }}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.0, type: "spring" }}
                            className="absolute -bottom-6 -left-6 bg-pop-cyan text-pop-black px-6 py-3 rounded-xl border-[3px] border-pop-black font-bold shadow-pop rotate-[-5deg] z-20 select-none"
                        >
                            HI THERE! 👋
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
}
