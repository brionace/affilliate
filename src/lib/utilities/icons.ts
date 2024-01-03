// https://www.svgrepo.com/
export function icons({
	name,
	fill,
	className
}: {
	name: string;
	fill?: boolean;
	className?: string;
}) {
	switch (name) {
		case 'amazon':
			return `<svg viewBox="163.5 163.50000000000003 285 285" xmlns="http://www.w3.org/2000/svg" fill=${
				fill ? '#000000' : '#000000'
			}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-rule="evenodd" fill-rule="evenodd"> <path d="m340.3 330.2c-16.5 12.2-40.5 18.7-61.2 18.7-29 0-55-10.7-74.8-28.5-1.5-1.4-.2-3.3 1.7-2.2 21.3 12.4 47.6 19.8 74.8 19.8 18.3 0 38.5-3.8 57.1-11.7 2.8-1.1 5.1 1.9 2.4 3.9z" fill="#f90"></path> <path d="m347.2 322.3c-2.1-2.7-14-1.3-19.3-.6-1.6.2-1.9-1.2-.4-2.2 9.5-6.7 25-4.7 26.8-2.5s-.5 17.8-9.4 25.2c-1.4 1.1-2.7.5-2.1-1 2-5 6.5-16.1 4.4-18.9z" fill="#f90"></path> <path d="m328.2 272.5v-6.5c0-1 .7-1.6 1.6-1.6h29c.9 0 1.7.7 1.7 1.6v5.5c0 .9-.8 2.1-2.2 4.1l-15 21.4c5.6-.1 11.5.7 16.5 3.5 1.1.6 1.4 1.6 1.5 2.5v6.9c0 1-1 2.1-2.1 1.5-8.9-4.7-20.8-5.2-30.6.1-1 .5-2.1-.5-2.1-1.5v-6.6c0-1 0-2.8 1.1-4.4l17.4-24.9h-15.1c-.9 0-1.7-.7-1.7-1.6zm-105.7 40.3h-8.8c-.8-.1-1.5-.7-1.6-1.5v-45.2c0-.9.8-1.6 1.7-1.6h8.2c.9 0 1.5.7 1.6 1.5v5.9h.2c2.1-5.7 6.2-8.4 11.6-8.4 5.5 0 9 2.7 11.4 8.4 2.1-5.7 7-8.4 12.2-8.4 3.7 0 7.7 1.5 10.2 5 2.8 3.8 2.2 9.3 2.2 14.2v28.6c0 .9-.8 1.6-1.7 1.6h-8.7c-.9-.1-1.6-.8-1.6-1.6v-24c0-1.9.2-6.7-.2-8.5-.7-3-2.6-3.9-5.2-3.9-2.1 0-4.4 1.4-5.3 3.7s-.8 6.1-.8 8.7v24c0 .9-.8 1.6-1.7 1.6h-8.8c-.9-.1-1.6-.8-1.6-1.6v-24c0-5 .8-12.5-5.4-12.5-6.3 0-6.1 7.2-6.1 12.5v24c-.1.8-.8 1.5-1.8 1.5zm163-49.3c13.1 0 20.2 11.2 20.2 25.5 0 13.8-7.8 24.8-20.2 24.8-12.8 0-19.8-11.2-19.8-25.2-.1-14.1 7-25.1 19.8-25.1zm0 9.3c-6.5 0-6.9 8.9-6.9 14.4s-.1 17.3 6.8 17.3c6.8 0 7.2-9.5 7.2-15.3 0-3.8-.2-8.4-1.3-12-1-3.2-3-4.4-5.8-4.4zm37.1 40h-8.8c-.9-.1-1.6-.8-1.6-1.6v-45.3c.1-.8.8-1.5 1.7-1.5h8.2c.8 0 1.4.6 1.6 1.3v6.9h.2c2.5-6.2 5.9-9.1 12-9.1 3.9 0 7.8 1.4 10.3 5.3 2.3 3.6 2.3 9.7 2.3 14.1v28.5c-.1.8-.8 1.4-1.7 1.4h-8.8c-.8-.1-1.5-.7-1.6-1.4v-24.6c0-5 .6-12.2-5.5-12.2-2.1 0-4.1 1.4-5.1 3.6-1.2 2.8-1.4 5.5-1.4 8.6v24.4c-.1.9-.9 1.6-1.8 1.6zm-117.5-21.6c0 3.4.1 6.3-1.6 9.4-1.4 2.5-3.6 4-6.1 4-3.4 0-5.4-2.6-5.4-6.4 0-7.5 6.7-8.9 13.1-8.9zm8.9 21.5c-.6.5-1.4.6-2.1.2-2.9-2.4-3.5-3.6-5.1-5.9-4.8 4.9-8.3 6.4-14.5 6.4-7.4 0-13.2-4.6-13.2-13.7 0-7.2 3.9-12 9.4-14.4 4.8-2.1 11.5-2.5 16.6-3.1v-1.1c0-2.1.2-4.6-1.1-6.4-1.1-1.6-3.1-2.3-4.9-2.3-3.4 0-6.4 1.7-7.1 5.3-.2.8-.7 1.6-1.5 1.6l-8.5-.9c-.7-.2-1.5-.7-1.3-1.8 2-10.4 11.3-13.5 19.7-13.5 4.3 0 9.9 1.1 13.3 4.4 4.3 4 3.9 9.4 3.9 15.2v13.7c0 4.1 1.7 5.9 3.3 8.2.6.8.7 1.8 0 2.3-1.9 1.5-5.1 4.3-6.9 5.8zm-124.4-21.5c0 3.4.1 6.3-1.6 9.4-1.4 2.5-3.6 4-6.1 4-3.4 0-5.4-2.6-5.4-6.4 0-7.5 6.7-8.9 13.1-8.9zm8.8 21.5c-.6.5-1.4.6-2.1.2-2.9-2.4-3.5-3.6-5.1-5.9-4.8 4.9-8.3 6.4-14.5 6.4-7.4 0-13.2-4.6-13.2-13.7 0-7.2 3.9-12 9.4-14.4 4.8-2.1 11.5-2.5 16.6-3.1v-1.1c0-2.1.2-4.6-1.1-6.4-1.1-1.6-3.1-2.3-4.9-2.3-3.4 0-6.4 1.7-7.1 5.3-.2.8-.7 1.6-1.5 1.6l-8.5-.9c-.7-.2-1.5-.7-1.3-1.8 2-10.4 11.3-13.5 19.7-13.5 4.3 0 9.9 1.1 13.3 4.4 4.3 4 3.9 9.4 3.9 15.2v13.7c0 4.1 1.7 5.9 3.3 8.2.6.8.7 1.8 0 2.3-1.9 1.5-5.1 4.3-6.9 5.8z"></path> </g> </g></svg>`;
		case 'share':
			return `<svg width="24px" height="24px" viewBox="0 -0.5 25 25" fill=${
				fill ? fill : 'none'
			} xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.734 15.8974L19.22 12.1374C19.3971 11.9927 19.4998 11.7761 19.4998 11.5474C19.4998 11.3187 19.3971 11.1022 19.22 10.9574L14.734 7.19743C14.4947 6.9929 14.1598 6.94275 13.8711 7.06826C13.5824 7.19377 13.3906 7.47295 13.377 7.78743V9.27043C7.079 8.17943 5.5 13.8154 5.5 16.9974C6.961 14.5734 10.747 10.1794 13.377 13.8154V15.3024C13.3888 15.6178 13.5799 15.8987 13.8689 16.0254C14.158 16.1521 14.494 16.1024 14.734 15.8974Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
		case 'heart':
			return `<svg viewBox="0 0 24 24" fill=${
				fill ? '#000000' : 'none'
			} xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" /><gid="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
		case 'logo':
			return `<svg fill=${
				fill ? '#000000' : '#000000'
			} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 537.99 537.99" xml:space="preserve" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0" /><gid="SVGRepo_tracerCarrier" stroke-linecap="round"stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"><g><path d="M535.892,69.273c-1.147-7.46-7.924-12.77-15.396-12.135c-18.883,1.568-36.254,5.171-53.12,11.036 c-26.556,9.215-50.526,22.663-71.3,39.987l-0.308-0.086c-14.421-3.867-29.328-7.866-44.305-11.164 c-22.579-4.957-45.793-7.843-68.993-8.569c-21.208-0.665-43.206,0.343-67.381,3.097c-24.638,2.791-49.336,8.058-73.413,15.628 c-0.21,0.065-0.397,0.119-0.567,0.166c-1.97-1.857-3.953-3.192-5.603-4.301c-0.621-0.429-1.265-0.84-1.849-1.304 c-21.19-16.97-46.129-29.802-74.134-38.137c-13.444-4.004-26.71-6.356-40.545-7.206C11.8,55.825,5.42,60.755,4.011,67.791 c-0.182,0.913-0.383,1.801-0.574,2.681c-0.497,2.28-1.013,4.632-1.363,7.236c-3.068,22.953-2.728,46.419,0.99,69.745 c4.587,28.742,13.229,55.232,25.692,78.808c-6.198,14.209-10.097,30.103-11.889,48.472c-3.624,37.075,3.206,72.854,20.302,106.335 c13.562,26.546,33.085,49.106,58.047,67.047c22.906,16.461,44.463,24.021,70.319,31.83c25.86,7.812,52.794-18.394,103.458-18.053 c47.781,0.304,59.902,19.845,93.234,19.845c0,0,1.218-0.275,1.204-0.275c18.337-5.021,34.737-11.397,50.143-19.49 c27.872-14.626,51.054-34.909,68.896-60.294c19.695-28.012,31.298-59.897,34.504-94.77c2.525-27.56-1.115-54.252-10.889-79.539 l1.956-4.331c5.596-12.405,11.383-25.219,16.186-38.447c7.761-21.406,12.134-44.354,13.366-70.146 C538.166,102.325,538.497,86.233,535.892,69.273z M228.288,339.606c0,0-55.298,5.619-85.933-25.015 c-30.635-30.645-25.013-85.936-25.013-85.936s55.293-5.612,85.928,25.022C233.909,284.311,228.288,339.606,228.288,339.606z M401.251,314.591c-30.635,30.634-85.93,25.015-85.93,25.015s-5.614-55.295,25.02-85.928 c30.631-30.635,85.926-25.022,85.926-25.022S431.891,283.957,401.251,314.591z"/></g></g></svg>`;
		case 'arrow':
			return `<svg
				fill="#ffffff"
				height="14px"
				width="14px"
				version="1.1"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 512.00 512.00"
				xml:space="preserve"
				stroke="#ffffff"
				class="${className}"
				><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><g id="SVGRepo_iconCarrier">
					<g>
						<g>
							<path
								d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M377.749,313.749 c-4.16,4.16-9.621,6.251-15.083,6.251c-5.462,0-10.923-2.091-15.083-6.251L256,222.165l-91.584,91.584 c-8.341,8.341-21.824,8.341-30.165,0c-8.341-8.341-8.341-21.824,0-30.165l106.667-106.667c8.341-8.341,21.824-8.341,30.165,0 L377.75,283.584C386.091,291.925,386.091,305.408,377.749,313.749z"
							/>
						</g>
					</g>
				</g>
			</svg>`;
		case 'home':
			return `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2796 3.71579C12.097 3.66261 11.903 3.66261 11.7203 3.71579C11.6678 3.7311 11.5754 3.7694 11.3789 3.91817C11.1723 4.07463 10.9193 4.29855 10.5251 4.64896L5.28544 9.3064C4.64309 9.87739 4.46099 10.0496 4.33439 10.24C4.21261 10.4232 4.12189 10.6252 4.06588 10.8379C4.00765 11.0591 3.99995 11.3095 3.99995 12.169V16C3.99995 16.9456 4.0005 17.6047 4.03569 18.1205C4.07028 18.6275 4.13496 18.9227 4.22832 19.148C4.5328 19.8831 5.11682 20.4672 5.8519 20.7716C6.07729 20.865 6.37249 20.9297 6.8794 20.9643C7.3953 20.9995 8.05439 21 8.99995 21H15C15.9455 21 16.6046 20.9995 17.1205 20.9643C17.6274 20.9297 17.9226 20.865 18.148 20.7716C18.8831 20.4672 19.4671 19.8831 19.7716 19.148C19.8649 18.9227 19.9296 18.6275 19.9642 18.1205C19.9994 17.6047 20 16.9456 20 16V12.169C20 11.3095 19.9923 11.0591 19.934 10.8379C19.878 10.6252 19.7873 10.4232 19.6655 10.24C19.5389 10.0496 19.3568 9.87739 18.7145 9.3064L13.4748 4.64896C13.0806 4.29855 12.8276 4.07463 12.621 3.91817C12.4245 3.7694 12.3321 3.7311 12.2796 3.71579ZM11.1611 1.79556C11.709 1.63602 12.2909 1.63602 12.8388 1.79556C13.2189 1.90627 13.5341 2.10095 13.8282 2.32363C14.1052 2.53335 14.4172 2.81064 14.7764 3.12995L20.0432 7.81159C20.0716 7.83679 20.0995 7.86165 20.1272 7.88619C20.6489 8.34941 21.0429 8.69935 21.3311 9.13277C21.5746 9.49916 21.7561 9.90321 21.8681 10.3287C22.0006 10.832 22.0004 11.359 22 12.0566C22 12.0936 22 12.131 22 12.169V16.0355C22 16.9373 22 17.6647 21.9596 18.2567C21.918 18.8654 21.8305 19.4037 21.6194 19.9134C21.1119 21.1386 20.1385 22.1119 18.9134 22.6194C18.4037 22.8305 17.8654 22.9181 17.2566 22.9596C16.6646 23 15.9372 23 15.0355 23H8.96443C8.06267 23 7.33527 23 6.74326 22.9596C6.13452 22.9181 5.59624 22.8305 5.08654 22.6194C3.8614 22.1119 2.88803 21.1385 2.38056 19.9134C2.16943 19.4037 2.08187 18.8654 2.04033 18.2567C1.99994 17.6647 1.99995 16.9373 1.99995 16.0355L1.99995 12.169C1.99995 12.131 1.99993 12.0936 1.99992 12.0566C1.99955 11.359 1.99928 10.832 2.1318 10.3287C2.24383 9.90321 2.42528 9.49916 2.66884 9.13277C2.95696 8.69935 3.35105 8.34941 3.87272 7.8862C3.90036 7.86165 3.92835 7.83679 3.95671 7.81159L9.22354 3.12996C9.58274 2.81064 9.89467 2.53335 10.1717 2.32363C10.4658 2.10095 10.781 1.90627 11.1611 1.79556Z" fill="#000000"></path> </g></svg>`;
		case 'menu':
			return `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;

		case 'halloween':
			return `<svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#000000;} </style> <g> <path class="st0" d="M366.313,58.34c-32.779-4.382-64.158,2.121-86.979,6.297V35.006c0-5.948-4.825-10.766-10.774-10.766h-25.13 c-5.94,0-10.765,4.817-10.765,10.766v29.631c-22.821-4.176-54.2-10.679-86.987-6.297C32.612,73.464,0,152.872,0,246.401 c0,115.273,76.197,203.035,180.989,231.503c23.722,6.439,48.916,9.856,75.01,9.856c26.095,0,51.289-3.417,75.003-9.856 C435.803,449.436,512,361.674,512,246.401C512,152.872,479.387,73.464,366.313,58.34z M366.479,146.703l49.216,68.477 l-104.08,10.868L366.479,146.703z M254.695,218.091l33.016,41.717c-3.915,0-66.982,0-66.982,0L254.695,218.091z M140.063,146.703 l54.856,79.346L90.846,215.18L140.063,146.703z M355.113,408.857v-22.488h-44.929v38.933c-30.667,8.329-54.302,9.572-54.302,9.572 s-22.251,0.719-51.62-5.664v-42.84h-44.937v28.144c-44.494-20.218-88.972-60.417-95.553-140.292c0,0,24.932,11.058,85.966,18.003 v42.524h57.427v-38.094c14.365,0.68,31.443,1.076,49.122,1.076c20.012,0,37.042-0.506,54.991-1.36v38.379h55.639v-43.236 c57.434-6.96,80.635-17.291,80.635-17.291C445.667,347.072,400.896,387.018,355.113,408.857z"></path> </g> </g></svg>`;
		case 'christmas':
			return `<svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#000000;} </style> <g> <polygon class="st0" points="222.033,104.558 256.005,86.698 289.976,104.558 283.481,66.728 310.973,39.93 272.991,34.418 256.005,0 239.02,34.418 201.027,39.93 228.52,66.728 "></polygon> <polygon class="st0" points="369.49,367.983 166.6,313.059 137.141,380.234 406.874,453.26 "></polygon> <polygon class="st0" points="315.968,245.904 208.764,216.882 179.306,284.056 353.353,331.189 "></polygon> <polygon class="st0" points="221.471,187.887 299.832,209.099 256.005,109.124 "></polygon> <polygon class="st0" points="423.012,490.064 124.435,409.228 79.375,512 256.005,512 432.625,512 "></polygon> </g> </g></svg>`;
		case 'user':
			return `<svg viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M4 21C4 17.4735 6.60771 14.5561 10 14.0709M16.4976 16.2119C15.7978 15.4328 14.6309 15.2232 13.7541 15.9367C12.8774 16.6501 12.7539 17.843 13.4425 18.6868C13.8312 19.1632 14.7548 19.9983 15.4854 20.6353C15.8319 20.9374 16.0051 21.0885 16.2147 21.1503C16.3934 21.203 16.6018 21.203 16.7805 21.1503C16.9901 21.0885 17.1633 20.9374 17.5098 20.6353C18.2404 19.9983 19.164 19.1632 19.5527 18.6868C20.2413 17.843 20.1329 16.6426 19.2411 15.9367C18.3492 15.2307 17.1974 15.4328 16.4976 16.2119ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`;
		case 'create':
			return `<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .isometric_twee{fill:#F5DF89;} .isometric_tien{fill:#7BD6C4;} .isometric_elf{fill:#72C0AB;} .isometric_dertien{fill:#225B49;} .st0{fill:#FF7344;} .st1{fill:#F05A28;} .st2{fill:#569080;} .st3{fill:#F29227;} .st4{fill:#225B49;} .st5{fill:#BE1E2D;} .st6{fill:#F28103;} .st7{fill:#F8F7C5;} .st8{fill:#AD9A74;} .st9{fill:#F2D76C;} .st10{fill:#F5DF89;} .st11{fill:#7BD6C4;} .st12{fill:#80CCBE;} </style> <g> <path class="isometric_elf" d="M8.587,25.955c0.77-0.778-1.348-2.903-2.117-2.125l3.066-3.06c0.728-0.816,2.884,1.238,2.137,2.075 L8.587,25.955z"></path> <path class="isometric_tien" d="M8.588,25.955L8.588,25.955c0.766-0.776-1.351-2.9-2.117-2.125 C5.685,24.625,7.809,26.744,8.588,25.955z"></path> <path class="isometric_twee" d="M13.042,24.196l0.241-1.028l-1.613-0.318l-3.082,3.105c-0.779,0.788-2.903-1.33-2.117-2.125 l1.702-1.699l-0.746-0.157l-1.216,0.829l-1.764,0.296l-0.208,1.028L3,24.945l0.88,0.834l-0.241,1.028l1.632,0.321l0.85,0.846 l1.759-0.314L9.495,28l1.216-0.829l1.764-0.296l0.208-1.028l1.238-0.818L13.042,24.196z"></path> <path class="st10" d="M8.588,25.955C8.588,25.955,8.588,25.955,8.588,25.955C8.88,25.66,8.879,25.66,8.588,25.955z"></path> <path class="st4" d="M8.777,25.763L8.777,25.763C8.798,25.742,8.798,25.742,8.777,25.763z"></path> <path class="isometric_dertien" d="M24.504,5.803L9.536,20.77c0.728-0.816,2.884,1.238,2.137,2.075L26.622,7.921 C27.452,7.147,25.256,4.959,24.504,5.803z"></path> </g> </g></svg>`;
		default:
			return `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.5766 8.70419C11.2099 7.56806 11.5266 7 12 7C12.4734 7 12.7901 7.56806 13.4234 8.70419L13.5873 8.99812C13.7672 9.32097 13.8572 9.48239 13.9975 9.5889C14.1378 9.69541 14.3126 9.73495 14.6621 9.81402L14.9802 9.88601C16.2101 10.1643 16.825 10.3034 16.9713 10.7739C17.1176 11.2443 16.6984 11.7345 15.86 12.715L15.643 12.9686C15.4048 13.2472 15.2857 13.3865 15.2321 13.5589C15.1785 13.7312 15.1965 13.9171 15.2325 14.2888L15.2653 14.6272C15.3921 15.9353 15.4554 16.5894 15.0724 16.8801C14.6894 17.1709 14.1137 16.9058 12.9622 16.3756L12.6643 16.2384C12.337 16.0878 12.1734 16.0124 12 16.0124C11.8266 16.0124 11.663 16.0878 11.3357 16.2384L11.0378 16.3756C9.88634 16.9058 9.31059 17.1709 8.92757 16.8801C8.54456 16.5894 8.60794 15.9353 8.7347 14.6272L8.76749 14.2888C8.80351 13.9171 8.82152 13.7312 8.76793 13.5589C8.71434 13.3865 8.59521 13.2472 8.35696 12.9686L8.14005 12.715C7.30162 11.7345 6.88241 11.2443 7.02871 10.7739C7.17501 10.3034 7.78993 10.1643 9.01977 9.88601L9.33794 9.81402C9.68743 9.73495 9.86217 9.69541 10.0025 9.5889C10.1428 9.48239 10.2328 9.32097 10.4127 8.99812L10.5766 8.70419Z" fill="#1C274C"></path> <path opacity="0.8" fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" fill="#1C274C"></path> <g opacity="0.5"> <path d="M18.5304 5.46967C18.8233 5.76256 18.8233 6.23744 18.5304 6.53033L18.1872 6.87359C17.8943 7.16648 17.4194 7.16648 17.1265 6.87359C16.8336 6.5807 16.8336 6.10583 17.1265 5.81293L17.4698 5.46967C17.7627 5.17678 18.2376 5.17678 18.5304 5.46967Z" fill="#1C274C"></path> <path d="M5.46967 5.46979C5.76256 5.17689 6.23744 5.17689 6.53033 5.46979L6.87359 5.81305C7.16648 6.10594 7.16648 6.58081 6.87359 6.87371C6.5807 7.1666 6.10583 7.1666 5.81293 6.87371L5.46967 6.53045C5.17678 6.23755 5.17678 5.76268 5.46967 5.46979Z" fill="#1C274C"></path> <path d="M6.87348 17.1266C7.16637 17.4195 7.16637 17.8944 6.87348 18.1873L6.53043 18.5303C6.23754 18.8232 5.76266 18.8232 5.46977 18.5303C5.17688 18.2375 5.17688 17.7626 5.46977 17.4697L5.81282 17.1266C6.10571 16.8337 6.58058 16.8337 6.87348 17.1266Z" fill="#1C274C"></path> <path d="M17.1265 17.1269C17.4194 16.834 17.8943 16.834 18.1872 17.1269L18.5302 17.4699C18.8231 17.7628 18.8231 18.2377 18.5302 18.5306C18.2373 18.8235 17.7624 18.8235 17.4695 18.5306L17.1265 18.1875C16.8336 17.8946 16.8336 17.4198 17.1265 17.1269Z" fill="#1C274C"></path> </g> </g></svg>`;
	}
}
