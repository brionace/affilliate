import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const product: Writable<object | null> = localStorageStore('product', null);
export const saved: Writable<[] | null> = localStorageStore('saved', null);
