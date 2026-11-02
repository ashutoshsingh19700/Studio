'use client';

import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/** Modal built on the native <dialog>: focus trap, Esc to close and inert background come for free. */
export default function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="a-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onMouseDown={(e) => e.target === ref.current && onClose()}
    >
      {open && (
        <div className="a-dialog__box">
          <header className="a-dialog__head">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="a-icon-btn" onClick={onClose} aria-label="Close">
              <X />
            </button>
          </header>
          {children}
        </div>
      )}
    </dialog>
  );
}
