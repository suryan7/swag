import { motion } from 'framer-motion';
import { PenTool, Monitor, Feather, Brush, Palette, MousePointer2, Layers } from 'lucide-react';

const skills = [
    { name: 'ILLUSTRATION', icon: <Brush size={40} />, desc: 'Digital & Traditional', color: 'bg-pop-purple', text: 'text-white' },
    { name: 'CHARACTER DESIGN', icon: <PenTool size={40} />, desc: 'Design & Concept', color: 'bg-pop-yellow', text: 'text-pop-black' },
    { name: 'STORYBOARD', icon: <Feather size={40} />, desc: 'Visual Narrative', color: 'bg-pop-cyan', text: 'text-pop-black' },
    { name: 'GRAPHIC DESIGN', icon: <Layers size={40} />, desc: 'Print & Digital', color: 'bg-pop-lime', text: 'text-pop-black' },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-pop-gray relative overflow-hidden">

            {/* Background Grid Pattern is in CSS, just adding decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <Palette size={200} />
            </div>

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="font-bold text-pop-purple tracking-widest uppercase mb-2 block">My Toolkit</span>
                        <h2 className="text-6xl md:text-7xl font-display text-pop-black">
                            WHAT I DO
                        </h2>
                    </div>
                    <div className="md:w-1/3">
                        <p className="text-lg leading-relaxed font-medium text-pop-black/70">
                            I combine traditional artistic principles with modern digital tools to create work that stands out in a crowded feed.
                        </p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
                            className={`${skill.color} ${skill.text} p-6 rounded-3xl border-[3px] border-pop-black shadow-pop h-[300px] flex flex-col justify-between group cursor-default`}
                        >
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-pop-black">
                                {skill.icon}
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-display mb-2">{skill.name}</h3>
                                <p className="font-bold opacity-80 text-sm border-t-2 border-current pt-4 inline-block">{skill.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Marquee */}
                <div className="mt-20 overflow-hidden bg-pop-black -mx-6 md:-mx-20 py-4 rotate-2">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="text-4xl font-display text-white mx-8 flex items-center gap-4">
                                PHOTOSHOP <span className="text-pop-lime">★</span> CANVA <span className="text-pop-pink">★</span>
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
