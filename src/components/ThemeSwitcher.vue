<template>
	<div class="flex items-center justify-center space-x-2">
		<span class="flex items-center space-x-1">
			<template v-if="showLabels">
				<span>Light</span>
			</template>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				:class="['w-5 h-5', { 'opacity-30': isDark }]"
			>
				<path
					d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"
				/>
			</svg>
		</span>

		<span
			:class="[
				'w-12 p-1 rounded-full block bg-slate-100 dark:bg-lime-900 cursor-pointer',
			]"
			@click="toggleDark()"
		>
			<span
				:class="[
					'w-5 h-5 rounded-full block bg-lime-500',
					{ 'ml-5': isDark },
				]"
			></span>
		</span>

		<span class="flex items-center space-x-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				:class="['w-5 h-5', { 'opacity-30': !isDark }]"
			>
				<path
					fill-rule="evenodd"
					d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
					clip-rule="evenodd"
				/>
			</svg>
			<template v-if="showLabels">
				<span>Dark</span>
			</template>
		</span>
	</div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
defineProps({
	showLabels: {
		type: Boolean,
		default: false,
	},
});
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
