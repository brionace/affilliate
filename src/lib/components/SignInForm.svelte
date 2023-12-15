<script>
	let email = '';
	let password = '';
</script>

<form method="POST" class="space-y-5 {$$props.class}">
	<div>
		<label for="email">Email</label>
		<input id="email" name="email" type="email" bind:value={email} required />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" bind:value={password} required />
	</div>
	<button type="submit">Sign In</button>
</form>
