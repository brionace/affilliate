import { localStorageStore } from '@skeletonlabs/skeleton';
import type { Writable } from 'svelte/store';

export const product: Writable<object | null | ''> = localStorageStore('product', '');
export const saved: Writable<[] | null | ''> = localStorageStore('saved', '');

export const products: Writable<[] | null | ''> = localStorageStore('products', '');
