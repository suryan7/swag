import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GalleryHeader({ title, subtitle, count, backLink = '/' }) {
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();
    navigate(backLink);
  };

  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-pop-black">{title}</h1>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full bg-pop-gray/20 text-sm font-medium text-pop-black/80"
            aria-live="polite"
          >
            {count ?? 0} images
          </span>
        </div>
        {subtitle && <p className="text-pop-black/70 mt-2 text-sm">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <nav aria-label="breadcrumb" className="text-sm text-pop-black/70">
          <ol className="flex items-center gap-2">
            <li>
              <button type="button" onClick={goHome} className="text-pop-purple font-semibold focus:outline-none focus:underline">
                Home
              </button>
            </li>
            <li className="text-pop-black/50">/</li>
            <li aria-current="page" className="font-medium">{title}</li>
          </ol>
        </nav>
      </div>
    </header>
  );
}
