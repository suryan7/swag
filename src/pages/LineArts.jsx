import React from 'react';
import GalleryHeader from '../components/GalleryHeader';

// Load images from both the original and new line-art collections.
const modules = {
    ...import.meta.glob('../assets/line/*.{png,jpg,jpeg,svg}', { eager: true }),
    ...import.meta.glob('../assets/linea/*.{png,jpg,jpeg,svg}', { eager: true })
};
const items = Object.keys(modules).map((key, i) => ({ id: i + 1, src: modules[key].default || modules[key], name: key.split('/').pop() }));

export default function LineArts() {
    React.useEffect(() => { 
        // Ensure page opens at top and clear any lingering hash fragment
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }, []);
    const [selectedIdx, setSelectedIdx] = React.useState(null);

    React.useEffect(() => {
        function onKey(e) {
            if (selectedIdx === null) return;
            if (e.key === 'Escape') setSelectedIdx(null);
            if (e.key === 'ArrowLeft' && selectedIdx > 0) setSelectedIdx(selectedIdx - 1);
            if (e.key === 'ArrowRight' && selectedIdx < items.length - 1) setSelectedIdx(selectedIdx + 1);
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedIdx]);

    const open = (idx) => setSelectedIdx(idx);
    const close = () => setSelectedIdx(null);
    const prev = (e) => { e.stopPropagation(); if (selectedIdx > 0) setSelectedIdx(selectedIdx - 1); };
    const next = (e) => { e.stopPropagation(); if (selectedIdx < items.length - 1) setSelectedIdx(selectedIdx + 1); };

    return (
        <section className="pt-36 pb-12 bg-gray-200">
            <div className="container mx-auto px-6 text-pop-black/90">
                <GalleryHeader title="Line Arts" count={items.length} />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((it, idx) => (
                        <button key={it.id} onClick={() => open(idx)} className="overflow-hidden rounded-lg p-1 bg-transparent hover:shadow-lg transform hover:scale-[1.02] transition-all">
                            <div className="bg-gray-50 p-4 rounded w-full h-full flex items-center justify-center shadow-md" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                                <img src={it.src} alt={it.name} className="max-h-72 w-auto object-contain" loading="lazy" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Modal / Lightbox */}
                {selectedIdx !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.22)' }} onClick={close} role="dialog" aria-modal="true">
                        <div className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col" style={{ backgroundColor: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }} onClick={(e) => e.stopPropagation()}>
                            <button onClick={close} className="absolute top-4 right-4 z-50 bg-pop-white border-2 border-pop-black p-2 rounded-full hover:bg-pop-black hover:text-white transition-colors">✕</button>

                            <div className="flex items-center gap-4 flex-1 overflow-hidden">
                                <button onClick={prev} className="p-4 text-2xl disabled:opacity-30" disabled={selectedIdx === 0}>‹</button>

                                <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
                                    <img src={items[selectedIdx].src} alt={items[selectedIdx].name} className="max-h-[80vh] w-auto max-w-full object-contain" />
                                </div>

                                <button onClick={next} className="p-4 text-2xl disabled:opacity-30" disabled={selectedIdx === items.length - 1}>›</button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
