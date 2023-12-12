export interface Product {
	id?: number;
	name?: string;
	price?: string | number;
	images?: string[];
	url?: string;
	category?: string[];
	published?: boolean;
}

export interface ProductsResponse {
	list: Product[];
	meta?: {
		cursor?: number;
		count?: number;
	};
}
