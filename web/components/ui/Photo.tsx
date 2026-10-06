import { findImage } from '@/lib/images';
import type { SlotId } from '@/lib/slots';
import PhotoView from './PhotoView';

type PhotoProps = {
  slot: SlotId;
  alt: string;
  /** `sizes` hint for next/image, e.g. "(min-width:1024px) 25vw, 50vw". */
  sizes?: string;
  /** Hero images: load immediately. */
  eager?: boolean;
  /** CSS object-position, e.g. "70% 30%" to keep a face in frame. */
  position?: string;
};

/**
 * Server component. Fills its nearest positioned parent (parent needs `position: relative`).
 * Renders /public/images/<slot>.* when present, otherwise an empty placeholder.
 * Client components should receive `findImage(slot)` as a prop and use <PhotoView>.
 */
export default function Photo({ slot, ...rest }: PhotoProps) {
  return <PhotoView src={findImage(slot)} label={slot} {...rest} />;
}
