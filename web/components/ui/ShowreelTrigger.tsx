'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Play, X } from 'lucide-react';

type Props = {
  /** Local video file from public/videos (takes priority when present). */
  videoSrc?: string | null;
  /** Embed URL (YouTube/Vimeo "embed" link). Empty → shows a "coming soon" panel. */
  embedUrl: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
};

/** A button that opens the showreel in a native <dialog>. */
export default function ShowreelTrigger({ videoSrc, embedUrl, className, children, ariaLabel }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" className={className} onClick={open} aria-label={ariaLabel}>
        {children}
      </button>
      <dialog
        ref={ref}
        className="dialog"
        aria-label="Showreel"
        onClick={(e) => e.target === ref.current && close()}
        onClose={() => setIsOpen(false)}
      >
        <div className="dialog__frame">
          <button type="button" className="dialog__close" onClick={close} aria-label="Close showreel">
            <X />
          </button>
          {videoSrc ? (
            isOpen && <video src={videoSrc} controls autoPlay playsInline preload="metadata" />
          ) : embedUrl ? (
            isOpen && (
              <iframe
                src={embedUrl}
                title="KPDS showreel"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <div className="dialog__soon">
              <Play />
              <p>Our showreel is coming soon.</p>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
