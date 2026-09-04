const categories = [
	{ name: "Work", count: 0, color: "bg-blue-500" },
	{ name: "Personal", count: 0, color: "bg-emerald-500" },
	{ name: "Shopping", count: 0, color: "bg-amber-500" },
	{ name: "Ideas", count: 0, color: "bg-violet-500" },
];

export default function CategoriesPage() {
	return (
		<main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 sm:px-10">
			<div className="mx-auto max-w-4xl">
				<header className="mb-8 flex items-end justify-between gap-4">
					<div>
						<p className="mb-2 text-sm font-medium text-slate-500">Organize your tasks</p>
						<h1 className="text-3xl font-bold tracking-tight">Categories</h1>
					</div>
					<button
						type="button"
						className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
					>
						+ New category
					</button>
				</header>

				<section className="grid gap-4 sm:grid-cols-2">
					{categories.map((category) => (
						<article
							key={category.name}
							className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
						>
							<div className="flex items-center gap-3">
								<span className={`h-3 w-3 rounded-full ${category.color}`} />
								<h2 className="font-semibold">{category.name}</h2>
							</div>
							<span className="text-sm text-slate-500">
								{category.count} {category.count === 1 ? "task" : "tasks"}
							</span>
						</article>
					))}
				</section>
			</div>
		</main>
	);
}
