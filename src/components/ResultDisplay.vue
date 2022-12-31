<template>
	<div
		:class="[
			'w-full h-28 md:h-32 lg:h-36 xl:h-40 p-4 bg-white dark:bg-slate-600 text-4xl flex items-end justify-end flex-wrap relative',
		]"
	>
		<span v-if="solve" class="absolute top-4 right-4 text-xl opacity-75">{{
			mathString
		}}</span>
		<span>{{ solve ? result : mathString }}</span>
	</div>
</template>

<script setup>
import { round } from "mathjs"
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useAppStore } from "../stores/AppStore";
const appStore = useAppStore();
const { mathString, solve } = storeToRefs(appStore);

const result = computed(() => {
	const x = solve.value ? appStore.result : null;
	if (x) {
		return round(x, 8);
	}
});
</script>
