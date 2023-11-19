import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const product: Writable<string> = localStorageStore('product', '');
export const saved: Writable<string> = localStorageStore('saved', '');
