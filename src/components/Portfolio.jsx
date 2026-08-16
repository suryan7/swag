import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

// load user assets for thumbnails
const lineModules = import.meta.glob('../assets/line/*.{png,jpg,jpeg,svg}', { eager: true });
const finalModules = import.meta.glob('../assets/finalartwork/*.{png,jpg,jpeg,svg}', { eager: true });
const lineImages = Object.keys(lineModules).map(k => lineModules[k].default || lineModules[k]);
const finalImages = Object.keys(finalModules).map(k => finalModules[k].default || finalModules[k]);

export default function Portfolio() {
    const [selectedId, setSelectedId] = useState(null);

    const lineThumbs = lineImages.slice(0, 3);
    const finalThumbs = finalImages.slice(0, 3);

    return (
        <section id="portfolio" className="py-32 bg-pop-white relative">

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-6xl md:text-8xl font-display text-pop-black leading-none">
                        LATEST <br /> DROPS
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Line Arts Card */}
                    <motion.div whileHover={{ y: -6 }} className="group">
                        <div className="relative bg-white border-[3px] border-pop-black rounded-3xl overflow-hidden shadow-pop mb-6 p-8 h-full flex flex-col justify-between">

                            {/* badge / count */}
                            <div className="absolute top-6 right-6 bg-pop-black text-white px-3 py-1 rounded-full text-sm font-bold">{lineImages.length}</div>

                            <div>
                                <h3 className="text-3xl font-display">LINE ARTS</h3>
                                <p className="text-pop-black/70 mt-2">Delicate linework, studies, and sketches. Explore the foundations.</p>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {lineThumbs.map((src, i) => (
                                        <img key={i} src={src} alt={`line-thumb-${i}`} className="w-full h-20 object-cover rounded-md border-2 border-pop-black" />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/line-arts" className="inline-block bg-pop-black text-white px-6 py-3 rounded-xl font-bold">View Line Arts</Link>
                                <span className="text-sm font-bold text-pop-black/60">Sketches & Studies</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Final Artworks Card */}
                    <motion.div whileHover={{ y: -6 }} className="group">
                        <div className="relative bg-white border-[3px] border-pop-black rounded-3xl overflow-hidden shadow-pop mb-6 p-8 h-full flex flex-col justify-between">

                            <div className="absolute top-6 right-6 bg-pop-purple text-white px-3 py-1 rounded-full text-sm font-bold">{finalImages.length}</div>

                            <div>
                                <h3 className="text-3xl font-display">FINAL ARTWORKS</h3>
                                <p className="text-pop-black/70 mt-2">Finished pieces and polished illustrations — full color and compositions.</p>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {finalThumbs.map((src, i) => (
                                        <img key={i} src={src} alt={`final-thumb-${i}`} className="w-full h-20 object-cover rounded-md border-2 border-pop-black" />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/final-works" className="inline-block bg-pop-black text-white px-6 py-3 rounded-xl font-bold">View Final Artworks</Link>
                                <span className="text-sm font-bold text-pop-black/60">Polished Pieces</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

                <AnimatePresence>
                    {selectedId && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pop-black/80 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
                            <div className="bg-white w-full max-w-4xl border-[4px] border-pop-black rounded-[2rem] shadow-2xl overflow-hidden relative">
                                <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 z-50 bg-pop-white text-pop-black border-2 border-pop-black p-2 rounded-full hover:bg-pop-black hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                                <div className="p-10">Coming soon — open gallery preview</div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
