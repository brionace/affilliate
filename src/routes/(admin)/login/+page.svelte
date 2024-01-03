<script>
	import { appwrite } from '$lib/appwrite';
	import { invalidateAll } from '$app/navigation';

	/** @type {string|null} */
	let formError = null;
	let showPassword = false;
	let loading = false;

	/**
	 * @param {Event} event
	 */

	async function handleSubmit(event) {
		event.preventDefault();
		loading = true;
		formError = null;

		const form = /** @type {HTMLFormElement} */ (event.target);
		const formData = /** @type Record<string, string | undefined> */ (
			Object.fromEntries(new FormData(form).entries())
		);

		const { email, password } = formData;
		if (!email || !password) {
			formError = 'Please fill out all fields';
			loading = false;
			return;
		}

		try {
			await appwrite.account.createEmailSession(email, password);
			await invalidateAll();
		} catch (e) {
			formError = /** @type {import('appwrite').AppwriteException} */ (e).message;
		}
		loading = false;
	}
</script>

<div class="flex flex-col justify-center items-center gap-8">
	<div class="flex justify-between items-center mt-8">
		<h6 class="h6">Login</h6>
	</div>
	<form class="form" method="post" on:submit={handleSubmit}>
		<ul class="form-list">
			<li class="form-item">
				<label class="label" for="email">Email</label>
				<div class="input-text-wrapper">
					<input
						type="email"
						class="input-text u-padding-inline-end-56"
						placeholder="brian@pardycat.com"
						name="email"
						id="email"
						required
					/>
				</div>
			</li>
			<li class="form-item">
				<label class="label" for="password">Password</label>
				<div class="input-text-wrapper" style="--amount-of-buttons: 1;">
					<input
						type={showPassword ? 'text' : 'password'}
						name="password"
						id="password"
						class="input-text"
						placeholder="SuperSecretPassword"
						required
						minlength="8"
					/>
					<button
						class="show-password-button"
						aria-label="show password"
						type="button"
						on:click={() => (showPassword = !showPassword)}
					>
						<span
							class:icon-eye={!showPassword}
							class:icon-eye-off={showPassword}
							aria-hidden="true">SHOW</span
						>
					</button>
				</div>
			</li>
		</ul>
		<div class="grid gap-4 mt-4">
			<!-- Should we use alerts? -->
			{#if formError}
				<p class=" text-center text-danger">{formError}</p>
			{/if}
			<div class="flex flex-end gap-4">
				<!-- <a href="/" class="button is-secondary" type="button">Go back</a> -->
				<button class="button" type="submit" disabled={loading}>Submit</button>
			</div>
		</div>
	</form>
</div>
