// Centralized font export so components and layout can import the same
// font instance and make it explicit where the global font is coming from.
// This file is defensive: in test environments `next/font/google` may behave
// differently, so we fallback to a no-op className when it isn't available.
let inter = { className: "" } as { className: string };
try {
	// Try to require the next font module. Using require keeps this safe for
	// environments where ESM static import may throw or behave differently.
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const nf = require("next/font/google");
	const Inter = nf?.Inter ?? nf?.default?.Inter ?? nf?.default ?? nf;
	if (typeof Inter === "function") {
		inter = Inter({ subsets: ["latin"] });
	}
} catch (err) {
	// ignore: tests or non-next runtimes may not provide the same API
}

export { inter };
export default inter;
