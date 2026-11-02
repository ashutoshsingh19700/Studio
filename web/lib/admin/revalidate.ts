import 'server-only';
import { revalidatePath } from 'next/cache';

/** Pages that show gallery content; call after any change so visitors see it straight away. */
export const revalidateSite = () => revalidatePath('/portfolio');
