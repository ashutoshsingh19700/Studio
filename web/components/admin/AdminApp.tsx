'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  Check,
  ExternalLink,
  Film,
  FolderPlus,
  ImageIcon,
  LoaderCircle,
  LogOut,
  Pencil,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  ACCEPT_IMAGE,
  ACCEPT_VIDEO,
  LIMITS,
  formatBytes,
  type Category,
  type Gallery,
  type MediaItem,
} from '@/lib/gallery/types';
import { api, probeImage, probeVideo, uploadMedia } from './client';
import Dialog from './Dialog';

type QueueEntry = { key: string; name: string; progress: number; error?: string };
type Confirm = { title: string; body: React.ReactNode; label: string; run: () => Promise<void> };

const ALL = 'all';
let queueSeq = 0;

export default function AdminApp({ initial }: { initial: Gallery }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initial.categories);
  const [items, setItems] = useState(initial.items);
  const [active, setActive] = useState<string>(ALL);
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drag, setDrag] = useState(false);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [confirmBusy, setConfirmBusy] = useState(false);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [uploadTo, setUploadTo] = useState(initial.categories[0]?.id ?? '');
  const fileInput = useRef<HTMLInputElement>(null);

  const apply = (g: Gallery) => {
    setCategories(g.categories);
    setItems(g.items);
  };

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.categoryId, (m.get(i.categoryId) ?? 0) + 1));
    return m;
  }, [items]);

  const current = categories.find((c) => c.id === active) ?? null;
  const visible = current ? items.filter((i) => i.categoryId === current.id) : items;
  const nameOf = (id: string) => categories.find((c) => c.id === id)?.name ?? 'Uncategorised';
  const photos = items.filter((i) => i.type === 'image').length;
  const videos = items.length - photos;
  const target = current?.id ?? (categories.some((c) => c.id === uploadTo) ? uploadTo : (categories[0]?.id ?? ''));

  // ── categories ────────────────────────────────────────────────────────────

  async function addCategory(name: string) {
    const { category } = await api<{ category: Category }>('/api/admin/categories', { method: 'POST', json: { name } });
    setCategories((c) => [...c, category]);
    setActive(category.id);
    toast.success(`Added “${category.name}”`);
  }

  async function renameCategory(name: string) {
    if (!current) return;
    apply(await api<Gallery>(`/api/admin/categories/${current.id}`, { method: 'PATCH', json: { name } }));
    toast.success('Category renamed');
  }

  async function moveCategory(dir: 'earlier' | 'later') {
    if (!current) return;
    try {
      apply(await api<Gallery>(`/api/admin/categories/${current.id}`, { method: 'PATCH', json: { move: dir } }));
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  async function deleteCategory(opts: { moveTo?: string; purge?: boolean }) {
    if (!current) return;
    const qs = new URLSearchParams();
    if (opts.moveTo) qs.set('moveTo', opts.moveTo);
    if (opts.purge) qs.set('purge', '1');
    apply(await api<Gallery>(`/api/admin/categories/${current.id}?${qs}`, { method: 'DELETE' }));
    toast.success(`Removed “${current.name}”`);
    setActive(ALL);
    setSelected(new Set());
  }

  // ── media ─────────────────────────────────────────────────────────────────

  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (!target) {
        toast.error('Create a category first, then add media to it.');
        return;
      }
      const categoryName = categories.find((c) => c.id === target)?.name ?? '';
      const allowed = files.filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'));
      if (allowed.length < files.length) toast.error('Some files were skipped. Only photos and videos can be added.');

      const entries = allowed.map((f) => ({ file: f, key: `u${++queueSeq}` }));
      setQueue((q) => [...q, ...entries.map((e) => ({ key: e.key, name: e.file.name, progress: 0 }))]);

      const patch = (key: string, p: Partial<QueueEntry>) =>
        setQueue((q) => q.map((e) => (e.key === key ? { ...e, ...p } : e)));

      async function one({ file, key }: { file: File; key: string }) {
        const isVideo = file.type.startsWith('video/');
        const cap = isVideo ? LIMITS.videoBytes : LIMITS.imageBytes;
        try {
          if (file.size > cap) throw new Error(`Too large (${formatBytes(file.size)}). Limit is ${formatBytes(cap)}.`);
          const form = new FormData();
          form.set('file', file);
          form.set('categoryId', target);
          form.set('alt', `${categoryName} ${isVideo ? 'video' : 'photo'}`);
          if (isVideo) {
            const { ratio, poster } = await probeVideo(file);
            form.set('ratio', String(ratio));
            if (poster) form.set('poster', poster, 'poster.jpg');
          } else {
            form.set('ratio', String((await probeImage(file)).ratio));
          }
          const item = await uploadMedia(form, (f) => patch(key, { progress: f }));
          setItems((all) => [item, ...all]);
          setQueue((q) => q.filter((e) => e.key !== key));
        } catch (e) {
          patch(key, { error: (e as Error).message, progress: 0 });
        }
      }

      // two at a time keeps phones responsive and the server calm
      const pending = [...entries];
      await Promise.all(
        Array.from({ length: Math.min(2, pending.length) }, async () => {
          for (let next = pending.shift(); next; next = pending.shift()) await one(next);
        }),
      );
      router.refresh();
    },
    [target, categories, router],
  );

  async function saveEdit(id: string, patch: { alt: string; categoryId: string }) {
    const { item } = await api<{ item: MediaItem }>(`/api/admin/media/${id}`, { method: 'PATCH', json: patch });
    setItems((all) => all.map((i) => (i.id === id ? item : i)));
    toast.success('Saved');
  }

  async function deleteItems(ids: string[]) {
    const results = await Promise.allSettled(ids.map((id) => api(`/api/admin/media/${id}`, { method: 'DELETE' })));
    const gone = new Set(ids.filter((_, i) => results[i].status === 'fulfilled'));
    setItems((all) => all.filter((i) => !gone.has(i.id)));
    setSelected((s) => new Set([...s].filter((id) => !gone.has(id))));
    if (gone.size < ids.length) toast.error(`${ids.length - gone.size} could not be removed. Try again.`);
    else toast.success(ids.length === 1 ? 'Removed' : `Removed ${ids.length} items`);
  }

  async function moveItems(ids: string[], categoryId: string) {
    const results = await Promise.allSettled(
      ids.map((id) => api<{ item: MediaItem }>(`/api/admin/media/${id}`, { method: 'PATCH', json: { categoryId } })),
    );
    const updated = new Map<string, MediaItem>();
    results.forEach((r) => r.status === 'fulfilled' && updated.set(r.value.item.id, r.value.item));
    setItems((all) => all.map((i) => updated.get(i.id) ?? i));
    setSelected(new Set());
    toast.success(`Moved ${updated.size} to ${nameOf(categoryId)}`);
  }

  const askDelete = (list: MediaItem[]) =>
    setConfirm({
      title: list.length === 1 ? `Delete this ${list[0].type}?` : `Delete ${list.length} items?`,
      body: (
        <p>
          {list.length === 1 ? 'It' : 'They'} will disappear from the website straight away and the file will be erased.
          This cannot be undone.
        </p>
      ),
      label: 'Delete',
      run: () => deleteItems(list.map((i) => i.id)),
    });

  async function signOut() {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
    router.replace('/admin/login');
    router.refresh();
  }

  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      if (!n.delete(id)) n.add(id);
      return n;
    });

  const selectedItems = items.filter((i) => selected.has(i.id));
  const allShownSelected = visible.length > 0 && visible.every((i) => selected.has(i.id));

  return (
    <div className="a-shell">
      <header className="a-top">
        <div className="a-top__brand">
          <span className="a-top__mark">AMIT</span>
          <span className="a-top__label">Admin</span>
        </div>
        <div className="a-top__actions">
          <Link href="/portfolio" target="_blank" className="a-btn a-btn--ghost">
            <ExternalLink /> <span>View portfolio</span>
          </Link>
          <button type="button" className="a-btn a-btn--ghost" onClick={signOut}>
            <LogOut /> <span>Sign out</span>
          </button>
        </div>
      </header>

      <div className="a-page">
        <div className="a-intro">
          <h1>Portfolio gallery</h1>
          <p className="a-muted">
            Everything here appears on the website’s Portfolio page the moment you save it. Empty categories are hidden
            from visitors.
          </p>
        </div>

        <dl className="a-stats">
          <div>
            <dt>Photos</dt>
            <dd>{photos}</dd>
          </div>
          <div>
            <dt>Videos</dt>
            <dd>{videos}</dd>
          </div>
          <div>
            <dt>Categories</dt>
            <dd>{categories.length}</dd>
          </div>
        </dl>

        <div className="a-layout">
          {/* categories */}
          <aside className="a-side" aria-label="Categories">
            <h2 className="a-side__title">Categories</h2>
            <ul className="a-cats">
              <li>
                <button
                  type="button"
                  className="a-cat"
                  aria-current={active === ALL}
                  onClick={() => {
                    setActive(ALL);
                    setSelected(new Set());
                  }}
                >
                  <span>All media</span>
                  <b>{items.length}</b>
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className="a-cat"
                    aria-current={active === c.id}
                    onClick={() => {
                      setActive(c.id);
                      setSelected(new Set());
                    }}
                  >
                    <span>{c.name}</span>
                    <b>{counts.get(c.id) ?? 0}</b>
                  </button>
                </li>
              ))}
            </ul>
            <AddCategory onAdd={addCategory} disabled={categories.length >= LIMITS.maxCategories} />
          </aside>

          {/* media */}
          <section className="a-main" aria-label={current ? current.name : 'All media'}>
            <div className="a-main__head">
              <div>
                <h2>{current ? current.name : 'All media'}</h2>
                <p className="a-muted">
                  {visible.length} {visible.length === 1 ? 'item' : 'items'}
                  {current && visible.length === 0 ? ' · hidden on the website until you add something' : ''}
                </p>
              </div>
              {current && (
                <div className="a-main__tools" role="group" aria-label={`Manage ${current.name}`}>
                  <button type="button" className="a-btn a-btn--ghost" onClick={() => setRenaming(true)}>
                    <Pencil /> Rename
                  </button>
                  <button
                    type="button"
                    className="a-btn a-btn--ghost"
                    onClick={() => moveCategory('earlier')}
                    disabled={categories[0]?.id === current.id}
                    title="Show this category earlier in the website’s filter bar"
                  >
                    Earlier
                  </button>
                  <button
                    type="button"
                    className="a-btn a-btn--ghost"
                    onClick={() => moveCategory('later')}
                    disabled={categories[categories.length - 1]?.id === current.id}
                    title="Show this category later in the website’s filter bar"
                  >
                    Later
                  </button>
                  <button type="button" className="a-btn a-btn--danger" onClick={() => setRemoving(true)}>
                    <Trash2 /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* upload */}
            {categories.length === 0 ? (
              <div className="a-empty">
                <FolderPlus />
                <p>Create your first category on the left, then add photos and videos to it.</p>
              </div>
            ) : (
              <div
                className="a-drop"
                data-drag={drag}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  void uploadFiles([...e.dataTransfer.files]);
                }}
              >
                <Upload aria-hidden="true" />
                <div className="a-drop__text">
                  <strong>Drop photos or videos here</strong>
                  <span>
                    JPG, PNG, WebP, AVIF up to {formatBytes(LIMITS.imageBytes)} · MP4, WebM, MOV up to{' '}
                    {formatBytes(LIMITS.videoBytes)}
                  </span>
                </div>
                <div className="a-drop__controls">
                  {!current && (
                    <label className="a-inline">
                      <span>Add to</span>
                      <select value={target} onChange={(e) => setUploadTo(e.target.value)}>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <button type="button" className="a-btn a-btn--primary" onClick={() => fileInput.current?.click()}>
                    <Upload /> Choose files
                  </button>
                </div>
                <input
                  ref={fileInput}
                  type="file"
                  multiple
                  hidden
                  accept={`${ACCEPT_IMAGE},${ACCEPT_VIDEO}`}
                  onChange={(e) => {
                    void uploadFiles([...(e.target.files ?? [])]);
                    e.target.value = '';
                  }}
                />
              </div>
            )}

            {queue.length > 0 && (
              <ul className="a-queue" aria-live="polite">
                {queue.map((q) => (
                  <li key={q.key} data-error={!!q.error}>
                    <span className="a-queue__name">{q.name}</span>
                    {q.error ? (
                      <>
                        <span className="a-queue__msg">{q.error}</span>
                        <button
                          type="button"
                          className="a-icon-btn"
                          aria-label={`Dismiss ${q.name}`}
                          onClick={() => setQueue((all) => all.filter((e) => e.key !== q.key))}
                        >
                          <X />
                        </button>
                      </>
                    ) : (
                      <>
                        <span
                          className="a-bar"
                          role="progressbar"
                          aria-valuenow={Math.round(q.progress * 100)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Uploading ${q.name}`}
                        >
                          <i style={{ width: `${Math.max(4, q.progress * 100)}%` }} />
                        </span>
                        <LoaderCircle className="a-spin" aria-hidden="true" />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* selection bar */}
            {visible.length > 0 && (
              <div className="a-select" data-active={selected.size > 0}>
                <label className="a-check">
                  <input
                    type="checkbox"
                    checked={allShownSelected}
                    onChange={() => setSelected(allShownSelected ? new Set() : new Set(visible.map((i) => i.id)))}
                  />
                  <span>{selected.size > 0 ? `${selected.size} selected` : 'Select all'}</span>
                </label>
                {selected.size > 0 && (
                  <div className="a-select__actions">
                    <label className="a-inline">
                      <span className="sr-only">Move selected to</span>
                      <select
                        value=""
                        onChange={(e) => e.target.value && void moveItems([...selected], e.target.value)}
                        aria-label="Move selected to category"
                      >
                        <option value="">Move to…</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button type="button" className="a-btn a-btn--danger" onClick={() => askDelete(selectedItems)}>
                      <Trash2 /> Delete
                    </button>
                    <button type="button" className="a-btn a-btn--ghost" onClick={() => setSelected(new Set())}>
                      Clear
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* grid */}
            {visible.length === 0 && categories.length > 0 ? (
              <div className="a-empty">
                <ImageIcon />
                <p>{current ? `Nothing in ${current.name} yet.` : 'No media yet.'} Drop files above to add some.</p>
              </div>
            ) : (
              <ul className="a-grid">
                {visible.map((item) => (
                  <li key={item.id} className="a-card" data-selected={selected.has(item.id)}>
                    <div className="a-card__media">
                      <Thumb item={item} />
                      <label className="a-card__check">
                        <input
                          type="checkbox"
                          checked={selected.has(item.id)}
                          onChange={() => toggle(item.id)}
                          aria-label={`Select ${item.alt}`}
                        />
                        <Check aria-hidden="true" />
                      </label>
                      {item.type === 'video' && (
                        <span className="a-badge">
                          <Film /> Video
                        </span>
                      )}
                    </div>
                    <div className="a-card__body">
                      <p className="a-card__alt" title={item.alt}>
                        {item.alt}
                      </p>
                      {!current && <p className="a-card__cat">{nameOf(item.categoryId)}</p>}
                      <div className="a-card__actions">
                        <button
                          type="button"
                          className="a-icon-btn"
                          onClick={() => setEditing(item)}
                          aria-label={`Edit ${item.alt}`}
                        >
                          <Pencil />
                        </button>
                        <button
                          type="button"
                          className="a-icon-btn a-icon-btn--danger"
                          onClick={() => askDelete([item])}
                          aria-label={`Delete ${item.alt}`}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {/* rename */}
      <Dialog open={renaming} onClose={() => setRenaming(false)} title="Rename category">
        {current && (
          <NameForm
            initial={current.name}
            label="Category name"
            submit="Save"
            onSubmit={async (name) => {
              await renameCategory(name);
              setRenaming(false);
            }}
            onCancel={() => setRenaming(false)}
          />
        )}
      </Dialog>

      {/* delete category */}
      <Dialog open={removing} onClose={() => setRemoving(false)} title={`Delete “${current?.name ?? ''}”?`}>
        {current && (
          <DeleteCategory
            category={current}
            count={counts.get(current.id) ?? 0}
            others={categories.filter((c) => c.id !== current.id)}
            onCancel={() => setRemoving(false)}
            onConfirm={async (opts) => {
              await deleteCategory(opts);
              setRemoving(false);
            }}
          />
        )}
      </Dialog>

      {/* edit item */}
      <Dialog open={!!editing} onClose={() => setEditing(null)} title={editing?.type === 'video' ? 'Edit video' : 'Edit photo'}>
        {editing && (
          <EditItem
            item={editing}
            categories={categories}
            onCancel={() => setEditing(null)}
            onSave={async (patch) => {
              await saveEdit(editing.id, patch);
              setEditing(null);
            }}
          />
        )}
      </Dialog>

      {/* generic confirm */}
      <Dialog open={!!confirm} onClose={() => !confirmBusy && setConfirm(null)} title={confirm?.title ?? ''}>
        {confirm && (
          <div className="a-dialog__content">
            {confirm.body}
            <div className="a-dialog__foot">
              <button type="button" className="a-btn a-btn--ghost" disabled={confirmBusy} onClick={() => setConfirm(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="a-btn a-btn--danger-solid"
                disabled={confirmBusy}
                autoFocus
                onClick={async () => {
                  setConfirmBusy(true);
                  await confirm.run();
                  setConfirmBusy(false);
                  setConfirm(null);
                }}
              >
                {confirmBusy && <LoaderCircle className="a-spin" />} {confirm.label}
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

// ── pieces ────────────────────────────────────────────────────────────────────

function Thumb({ item }: { item: MediaItem }) {
  const still = item.type === 'video' ? item.poster : item.src;
  if (!still) {
    return item.type === 'video' ? (
      <video src={`${item.src}#t=0.1`} preload="metadata" muted playsInline className="a-card__img" />
    ) : null;
  }
  return (
    <Image
      src={still}
      alt=""
      fill
      sizes="(min-width:1280px) 20vw, (min-width:640px) 30vw, 50vw"
      className="a-card__img"
      style={item.pos ? { objectPosition: item.pos } : undefined}
    />
  );
}

function AddCategory({ onAdd, disabled }: { onAdd: (name: string) => Promise<void>; disabled: boolean }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setError('');
    try {
      await onAdd(name);
      setName('');
    } catch (err) {
      setError((err as Error).message);
    }
    setBusy(false);
  }

  return (
    <form className="a-addcat" onSubmit={submit} noValidate>
      <label className="a-field">
        <span>New category</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={LIMITS.categoryName}
          placeholder="e.g. Pre-wedding"
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? 'addcat-error' : undefined}
        />
      </label>
      <button type="submit" className="a-btn a-btn--primary" disabled={busy || disabled || !name.trim()}>
        {busy ? <LoaderCircle className="a-spin" /> : <FolderPlus />} Add
      </button>
      {error && (
        <p id="addcat-error" className="a-error" role="alert">
          {error}
        </p>
      )}
      {disabled && <p className="a-muted">Category limit reached.</p>}
    </form>
  );
}

function NameForm({
  initial,
  label,
  submit,
  onSubmit,
  onCancel,
}: {
  initial: string;
  label: string;
  submit: string;
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <form
      className="a-dialog__content"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
          await onSubmit(name);
        } catch (err) {
          setError((err as Error).message);
          setBusy(false);
        }
      }}
    >
      <label className="a-field">
        <span>{label}</span>
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={LIMITS.categoryName} autoFocus />
      </label>
      {error && (
        <p className="a-error" role="alert">
          {error}
        </p>
      )}
      <div className="a-dialog__foot">
        <button type="button" className="a-btn a-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="a-btn a-btn--primary" disabled={busy || !name.trim() || name.trim() === initial}>
          {busy && <LoaderCircle className="a-spin" />} {submit}
        </button>
      </div>
    </form>
  );
}

function DeleteCategory({
  category,
  count,
  others,
  onCancel,
  onConfirm,
}: {
  category: Category;
  count: number;
  others: Category[];
  onCancel: () => void;
  onConfirm: (opts: { moveTo?: string; purge?: boolean }) => Promise<void>;
}) {
  const canMove = others.length > 0;
  const [mode, setMode] = useState<'move' | 'purge'>(canMove ? 'move' : 'purge');
  const [moveTo, setMoveTo] = useState(others[0]?.id ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="a-dialog__content">
      {count === 0 ? (
        <p>“{category.name}” is empty, so nothing else will change.</p>
      ) : (
        <fieldset className="a-radios">
          <legend>
            It holds {count} {count === 1 ? 'item' : 'items'}. What should happen to {count === 1 ? 'it' : 'them'}?
          </legend>
          <label>
            <input type="radio" name="mode" checked={mode === 'move'} disabled={!canMove} onChange={() => setMode('move')} />
            <span>
              Move to another category
              {mode === 'move' && canMove && (
                <select value={moveTo} onChange={(e) => setMoveTo(e.target.value)} aria-label="Destination category">
                  {others.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </span>
          </label>
          <label>
            <input type="radio" name="mode" checked={mode === 'purge'} onChange={() => setMode('purge')} />
            <span>Delete them permanently as well</span>
          </label>
        </fieldset>
      )}
      {error && (
        <p className="a-error" role="alert">
          {error}
        </p>
      )}
      <div className="a-dialog__foot">
        <button type="button" className="a-btn a-btn--ghost" onClick={onCancel} disabled={busy}>
          Cancel
        </button>
        <button
          type="button"
          className="a-btn a-btn--danger-solid"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setError('');
            try {
              await onConfirm(count === 0 ? {} : mode === 'move' ? { moveTo } : { purge: true });
            } catch (e) {
              setError((e as Error).message);
              setBusy(false);
            }
          }}
        >
          {busy && <LoaderCircle className="a-spin" />} Delete category
        </button>
      </div>
    </div>
  );
}

function EditItem({
  item,
  categories,
  onSave,
  onCancel,
}: {
  item: MediaItem;
  categories: Category[];
  onSave: (patch: { alt: string; categoryId: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const [alt, setAlt] = useState(item.alt);
  const [categoryId, setCategoryId] = useState(item.categoryId);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const changed = alt.trim() !== item.alt || categoryId !== item.categoryId;

  return (
    <form
      className="a-dialog__content"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError('');
        try {
          await onSave({ alt, categoryId });
        } catch (err) {
          setError((err as Error).message);
          setBusy(false);
        }
      }}
    >
      <div className="a-preview">
        <Thumb item={item} />
      </div>
      <label className="a-field">
        <span>Description</span>
        <input value={alt} onChange={(e) => setAlt(e.target.value)} maxLength={LIMITS.alt} autoFocus />
        <small>Read aloud by screen readers and shown if the file fails to load. Describe what is in the frame.</small>
      </label>
      <label className="a-field">
        <span>Category</span>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p className="a-error" role="alert">
          {error}
        </p>
      )}
      <div className="a-dialog__foot">
        <button type="button" className="a-btn a-btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="a-btn a-btn--primary" disabled={busy || !alt.trim() || !changed}>
          {busy && <LoaderCircle className="a-spin" />} Save changes
        </button>
      </div>
    </form>
  );
}
