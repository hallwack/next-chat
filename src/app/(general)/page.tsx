export default function Page() {
  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to <span className="text-orange-400">SvelteKit</span>
      </h1>
      <p className="leading-7">
        Visit{" "}
        <a
          href="https://kit.svelte.dev"
          className="underline decoration-orange-500 decoration-wavy"
        >
          kit.svelte.dev
        </a>{" "}
        to read the documentation
      </p>
    </div>
  );
}
