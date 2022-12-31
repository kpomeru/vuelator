<template>
	<span
		:class="[
			'cursor-pointer w-full h-20 flex justify-center items-center text-2xl relative',
			{
				'opacity-50 pointer-events-none': disableSolve,
				uppercase: keyButton.category !== 'operand',
				'bg-slate-200/50 dark:bg-slate-800/30':
					keyButton.category === 'modifier',
				'bg-amber-500 text-white':
					keyButton.category === 'operand' &&
					keyButton.name !== 'solve',
				'bg-lime-500 text-4xl text-white': keyButton.name === 'solve',
			},
		]"
		@click="processClick"
	>
		<span
			v-if="clicked"
			:class="['absolute inset-0 bg-black/10 dark:bg-white/10']"
		></span>
		<template v-if="keyButton.name === 'plus-minus'">
			<span>+/-</span>
		</template>

		<template v-else>
			<span class="relative">{{ keyButton.label }}</span>
		</template>
	</span>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/AppStore";
const appStore = useAppStore();
const { mathString, solve } = storeToRefs(appStore);

const { allowedButtonKeys, keyButton } = defineProps({
	allowedButtonKeys: { type: Array, default: [] },
	keyButton: { type: Object, required: true },
});

const clicked = ref(false);

const toggleClicked = () => {
	clicked.value = true;
	setTimeout(() => {
		clicked.value = false;
	}, 150);
};

const lastChar = computed(() => mathString.value[mathString.value.length - 1]);

const disableSolve = computed(() => {
	return (
		(keyButton.name === "solve" &&
			(solve.value || !mathString.value || mathString.value === "0")) ||
		(keyButton.name === "solve" &&
			["+", "-", "/", "*"].includes(lastChar.value))
	);
});

const isKey = () => {};

const processClick = () => {
	toggleClicked();

	if (keyButton.name === "clear") {
		mathString.value = 0;
		solve.value = false;
		return;
	}

	if (keyButton.value === "0" && !mathString.value) {
		return;
	}

	if (keyButton.name === "solve") {
		if (!disableSolve.value) {
			solve.value = true;
		}
		return;
	}

	if (solve.value) {
		if (
			keyButton.category === "operand" ||
			(keyButton.category === "modifier" && keyButton.name !== "clear")
		) {
			mathString.value = appStore.result.toString();
		} else {
			mathString.value = 0;
		}
		solve.value = false;
	}

	const p = mathString.value;
	let v = keyButton.value;

	switch (keyButton.name) {
		case "bracket":
			v = lastChar.value === "(" ? ")" : "(";
			if (["(", ")"].includes(lastChar.value)) {
				let y = p.split("");
				y[y.length - 1] = v;
				mathString.value = y.join("");
				return;
			}
			break;

		case "plus-minus":
			if (!p || p === "0") {
				return;
			}

			let y = p.split("");
			if (y[0] === "-") {
				y[0] = "";
				mathString.value = y.join("");
			} else {
				mathString.value = `-${p}`;
			}
			return;
			break;

		default:
	}
	mathString.value = p ? `${p}${v}` : `${v}`;
};

const processKeyPress = (e) => {
	const keyPressed = e.key;

	if ([...allowedButtonKeys, "Enter", "=", ")"].includes(keyPressed)) {
		if (["Enter", "="].includes(keyPressed) && keyButton.name === "solve") {
			return processClick();
		} else if (
			["(", ")"].includes(keyPressed) &&
			keyButton.name === "bracket"
		) {
			return processClick();
		} else if (keyPressed === keyButton.value) {
			return processClick();
		}
	}
};

onMounted(() => {
	window.addEventListener("keypress", processKeyPress);
});

onUnmounted(() => {
	window.removeEventListener("keypress", processKeyPress);
});
</script>
