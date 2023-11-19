<script>
	// @ts-nocheck
	import Head from '$lib/head.svelte';
	import Header from '$lib/header.svelte';
	import List from '$lib/list.svelte';
	import { icons } from '$lib/icons';
	import SavedLink from '$lib/saved-link.svelte';
	import CategoryNav from '$lib/category-nav.svelte';

	export let data;
	let lazyLoaded;

	lazyLoaded = lazyloader(data);

	$: data = lazyLoaded;

	$: ({ products, categories } = data);

	let showCategories = true;

	// function averageColor(imageElement) {

	//         // Create the canvas element
	//         const canvas
	//             = document.createElement('canvas'),

	//             // Get the 2D context of the canvas
	//             context
	//                 = canvas.getContext &&
	//                 canvas.getContext('2d'),
	//             imgData, width, height,
	//             length,

	//             // Define variables for storing
	//             // the individual red, blue and
	//             // green colors
	//             rgb = { r: 0, g: 0, b: 0 },

	//             // Define variable for the
	//             // total number of colors
	//             count = 0;

	//         // Set the height and width equal
	//         // to that of the canvas and the image
	//         height = canvas.height =
	//             imageElement.naturalHeight ||
	//             imageElement.offsetHeight ||
	//             imageElement.height;
	//         width = canvas.width =
	//             imageElement.naturalWidth ||
	//             imageElement.offsetWidth ||
	//             imageElement.width;

	//         // Draw the image to the canvas
	//         context.drawImage(imageElement, 0, 0);

	//         // Get the data of the image
	//         imgData = context.getImageData(
	//                     0, 0, width, height);

	//         // Get the length of image data object
	//         length = imgData.data.length;

	//         for (let i = 0; i < length; i += 4) {

	//             // Sum all values of red colour
	//             rgb.r += imgData.data[i];

	//             // Sum all values of green colour
	//             rgb.g += imgData.data[i + 1];

	//             // Sum all values of blue colour
	//             rgb.b += imgData.data[i + 2];

	//             // Increment the total number of
	//             // values of rgb colours
	//             count++;
	//         }

	//         // Find the average of red
	//         rgb.r
	//             = Math.floor(rgb.r / count);

	//         // Find the average of green
	//         rgb.g
	//             = Math.floor(rgb.g / count);

	//         // Find the average of blue
	//         rgb.b
	//             = Math.floor(rgb.b / count);

	//         return rgb;
	//     }
	function lazyloader(data) {
		return data;
	}
</script>

<Head />

<Header>
	<div>
		<a href="/" class="flex items-center gap-3">
			<span class="w-6">{@html icons('logo')}</span>
			<span class="hidden md:inline">Pardycat</span>
		</a>
	</div>
	<div
		class="absolute left-1/2 transform -translate-x-1/2 translate-y-2 bg-[#ef4644] rounded-t-lg px-4 py-2"
	>
		<button on:click={() => (showCategories = !showCategories)} class="text-white">Browse</button>
	</div>
	<div>
		<SavedLink />
	</div>
</Header>
<CategoryNav show={showCategories} {categories} />
<!-- <div class="mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
	<div
		class="h-36 w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"
	/>
</div> -->
<main>
	<List {products} />
</main>
