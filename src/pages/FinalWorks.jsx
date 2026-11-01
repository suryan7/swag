import React from 'react';
import GalleryHeader from '../components/GalleryHeader';

// Load images from both the original and new final-art collections.
const modules = {
  ...import.meta.glob('../assets/finalartwork/*.{png,jpg,jpeg,svg}', { eager: true }),
  ...import.meta.glob('../assets/artf/*.{png,jpg,jpeg,svg}', { eager: true })
};

import metadata from '../data/finalworks.json';

const orderList = [
  "Copy of Knight.jpg",               // Fallen Knight
  "4.jpg",                            // Witch's Brew
  "Spidey.jpg",                        // Rooftop Romance
  "Copy of Text 1.jpg",                // The Red Thread Theory
  "Copy of Text 2.jpg",
  "Copy of Text 3.jpg",
  "Copy of Text 4.jpg",
  "Copy of Text 5.jpg",
  "Copy of Text 6.jpg",
  "5.jpg",                            // Alina
  "6.jpg",                            // Sunflower Garden
  "Copy of The Girl copy.jpg",         // Train Journey — Animation Clip
  "Copy of BG copy.jpg",               // Mountain Landscape
  "2.jpg",                            // Little Krishna
  "3.jpg",
  "1.jpg",                            // Mahalaya
  "Copy of Untitled-1 copy (1).jpg",   // Warrior Character Design
  "Copy of Untitled-3 copy 1.jpg",     // Sunset by the River
  "Copy of Coffee Date copy.jpg",      // Coffee Date
  "Copy of Untitled-1.jpg",            // Football Fan Illustration
  "Copy of Untitled-1 copy.jpg",       // Little Red Riding Hood
  "Copy of Final.jpg"                  // Human Portrait Study
];

const rawItems = Object.keys(modules).map((key) => ({
  src: modules[key].default || modules[key],
  name: key.split('/').pop(),
  collection: key.includes('/artf/') ? 'artf' : 'finalartwork'
}));

const sortedRawItems = rawItems.sort((a, b) => {
  const idxA = orderList.indexOf(a.name);
  const idxB = orderList.indexOf(b.name);
  if (idxA !== -1 && idxB !== -1) return idxA - idxB;
  if (idxA !== -1) return -1;
  if (idxB !== -1) return 1;
  return a.name.localeCompare(b.name);
});

const items = sortedRawItems.map((item, i) => ({
  ...item,
  id: i + 1
}));

export default function FinalWorks() {
    React.useEffect(() => { 
        // Ensure page opens at top and clear any lingering hash fragment
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }, []);
    const [selected, setSelected] = React.useState(null);
    const [gallery, setGallery] = React.useState(items);
    const scrollerRef = React.useRef(null);

    // Build gallery groups (text series and default all)
    const textPattern = /^Copy of Text/i;
    const textGroup = items.filter(i => textPattern.test(i.name));
    const artfSeriesPattern = /^[23]\.jpg$/i;
    const artfSeries = items.filter(i => i.collection === 'artf' && artfSeriesPattern.test(i.name));
    const galleries = {
        text: textGroup,
        artfSeries,
        all: items
    };

    // shown items: show only the first of the text series in the grid
    const firstTextId = textGroup.length ? textGroup[0].id : null;
    const firstArtfSeriesId = artfSeries.length ? artfSeries[0].id : null;

    React.useEffect(() => {
        function onKey(e) {
            if (!selected) return;
            if (e.key === 'Escape') setSelected(null);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const idx = gallery.findIndex(i => i.id === selected.id);
                if (e.key === 'ArrowLeft' && idx > 0) setSelected(gallery[idx - 1]);
                if (e.key === 'ArrowRight' && idx < gallery.length - 1) setSelected(gallery[idx + 1]);
            }
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selected, gallery]);

    const open = (it, groupKey = 'all') => {
        const grp = galleries[groupKey] || galleries.all;
        setGallery(grp);
        setSelected(it);
        // scroll will be handled by effect
    };
    const close = () => setSelected(null);
    const prev = (e) => { e.stopPropagation(); const idx = gallery.findIndex(i => i.id === selected.id); if (idx > 0) setSelected(gallery[idx - 1]); };
    const next = (e) => { e.stopPropagation(); const idx = gallery.findIndex(i => i.id === selected.id); if (idx < gallery.length - 1) setSelected(gallery[idx + 1]); };

    // when selected changes, scroll the scroller to the selected image (if scroller exists)
    React.useEffect(() => {
        if (!selected || !scrollerRef.current) return;
        const idx = gallery.findIndex(i => i.id === selected.id);
        const node = scrollerRef.current.children[idx];
        if (node) node.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }, [selected, gallery]);

    return (
        <section className="pt-36 pb-24 bg-pop-white">
            <div className="container mx-auto px-6">
                <GalleryHeader title="Final Artworks" subtitle="A curated selection of finished pieces. Click any image to view larger." count={items.length} />

                <div className="grid md:grid-cols-3 gap-6">
                    {items
                        .filter(it => {
                            const isTextSeriesItem = textPattern.test(it.name) && it.id !== firstTextId;
                            const isArtfSeriesItem = it.collection === 'artf' && artfSeriesPattern.test(it.name) && it.id !== firstArtfSeriesId;
                            return !isTextSeriesItem && !isArtfSeriesItem;
                        })
                        .map(it => (
                            <figure key={it.id} className="bg-white border-[3px] border-pop-black rounded-2xl overflow-hidden cursor-pointer" onClick={() => open(it, textPattern.test(it.name) ? 'text' : (it.id === firstArtfSeriesId ? 'artfSeries' : 'all'))}>
                                <img src={it.src} alt={it.name} className="w-full h-64 object-cover" />
                                <figcaption className="p-4">
                                    <div className="flex items-center justify-between">
                                    <h3 className="text-lg md:text-xl font-bold truncate">{metadata[it.name]?.title || it.name}</h3>
                                        {it.id === firstTextId && textGroup.length > 1 && (
                                            <span className="text-sm font-bold text-pop-black/60">Series · {textGroup.length}p</span>
                                        )}
                                        {it.id === firstArtfSeriesId && artfSeries.length > 1 && (
                                            <span className="text-sm font-bold text-pop-black/60">Series · {artfSeries.length}p</span>
                                        )}
                                    </div>
                                <p className="text-pop-black/60 text-sm mt-2">{metadata[it.name]?.caption || 'Short description goes here (edit later).'}</p>
                                </figcaption>
                            </figure>
                        ))}
                </div>

                {/* Modal Lightbox */}
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-pop-black/80" role="dialog" aria-modal="true" onClick={close}>
                        <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                            <button onClick={close} className="absolute top-4 right-4 z-50 bg-pop-white border-2 border-pop-black p-2 rounded-full hover:bg-pop-black hover:text-white transition-colors">✕</button>

                                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                                <button onClick={prev} className="p-4 text-2xl disabled:opacity-30" disabled={items.findIndex(i => i.id === selected.id) === 0}>‹</button>

                                    <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
                                            {/* Scrollable comic/manga style viewer - reduced height so caption is visible */}
                                            <div ref={scrollerRef} className="w-full h-[60vh] flex items-center overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4">
                                            {gallery.map(g => (
                                                <div key={g.id} className="min-w-full flex items-center justify-center snap-center">
                                                        <img src={g.src} alt={g.name} className="max-h-[60vh] w-auto max-w-full object-contain" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button onClick={next} className="p-4 text-2xl disabled:opacity-30" disabled={gallery.findIndex(i => i.id === selected.id) === gallery.length - 1}>›</button>
                                </div>

                                    <div className="p-6 border-t-2 border-pop-gray bg-white flex-shrink-0">
                                        <h3 className="text-xl font-bold">
                                            {metadata[selected.name]?.title || (textPattern.test(selected.name) ? metadata["Copy of Text 1.jpg"]?.title : selected.name)}
                                        </h3>
                                        <p className="text-pop-black/70 mt-2">
                                            {metadata[selected.name]?.caption || (textPattern.test(selected.name) ? metadata["Copy of Text 1.jpg"]?.caption : 'Short description goes here (edit later).')}
                                        </p>
                                    </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
