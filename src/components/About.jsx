import { motion } from 'framer-motion';
import me from '../assets/Me.jpg';

export default function About() {
    return (
        <section id="about" className="py-32 bg-pop-white relative overflow-hidden">
            <div className="container mx-auto px-6">

                <div className="grid md:grid-cols-12 gap-16 items-center">

                    <motion.div
                        initial={{ rotate: -5 }}
                        whileInView={{ rotate: 0 }}
                        className="md:col-span-6 relative"
                    >
                        {/* Background Blob */}
                        <div className="absolute top-0 right-0 w-full h-full bg-pop-yellow rounded-[3rem] border-[3px] border-pop-black translate-x-4 translate-y-4" />

                        <div className="relative rounded-[3rem] border-[3px] border-pop-black overflow-hidden bg-white">
                            <img
                                src={me}
                                alt="Swagata"
                                className="w-full grayscale hover:grayscale-0 transition-all duration-500 scale-105"
                            />
                        </div>

                        {/* Floating Tag */}
                        <div className="absolute -bottom-8 -right-4 bg-pop-purple text-white px-6 py-3 rounded-full border-[3px] border-pop-black font-display text-lg shadow-pop rotate-[-5deg]">
                            ARTIST AT WORK
                        </div>
                    </motion.div>

                    <div className="md:col-span-6 space-y-8">
                        <h2 className="text-5xl md:text-6xl font-display text-[#cf5151] leading-tight">
                            What I Love to Create
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-pop-black/80 font-medium leading-relaxed">
                            <p>
                                I’m drawn to the little moments that make a story feel real — a quiet conversation, a fleeting expression, a beautiful landscape, or two characters simply sharing a moment.
                            </p>
                            <p>
                                Through illustration, I like to turn these moments into visuals that feel alive, expressive, and easy to connect with. From character-focused pieces to narrative illustrations and environments, I’m always looking for new ways to tell a story without relying only on words.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="bg-white p-6 border-[3px] border-pop-black rounded-2xl shadow-pop hover:-translate-y-1 transition-transform">
                                <h3 className="text-4xl font-display text-pop-purple">2</h3>
                                <p className="font-bold text-sm">YEAR EXP.</p>
                            </div>
                            <div className="bg-white p-6 border-[3px] border-pop-black rounded-2xl shadow-pop hover:-translate-y-1 transition-transform">
                                <h3 className="text-4xl font-display text-pop-pink">50+</h3>
                                <p className="font-bold text-sm">PROJECTS</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
