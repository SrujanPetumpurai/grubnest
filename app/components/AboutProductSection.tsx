export default function AboutProduct() {
  const items = [
    {
      title: "Healthy Cruciferous",
      content:
        "Cruciferous vegetables belong to the Brassicaceae family and include vegetables like broccoli, cauliflower, cabbage, Brussels sprouts, kale, and others.",
      open: true,
    },
    { title: "Fresh Root Vegetables", content: "Carrots, beets, potatoes, radishes, and more." },
    { title: "Dry Fruits & Nuts", content: "Almonds, cashews, raisins, walnuts, and dates." },
    { title: "Organic Vegetables", content: "Grown without synthetic fertilizers or pesticides." },
    { title: "Natural Citrus Fruits", content: "Oranges, lemons, limes, and grapefruits packed with vitamin C." },
    { title: "Healthy Leafy Green", content: "Spinach, kale, lettuce, and arugula." },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-lime-900 md:text-4xl">
        Fresh & Flavorful organic goods
      </h2>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-lime-50/60 p-4">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/AboutFood.png"
              alt="Smiling farmer holding a fresh cabbage in a field"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-lime-50/60 p-4">
          <div className="rounded-2xl border border-lime-200/70 bg-white p-3 ">
            <ul className="space-y-3">
              {items.map((item, idx) => (
                <li key={item.title}>
                  <details
                    className="group rounded-xl border border-lime-100 bg-lime-50/30 p-4 open:bg-lime-50"
                    {...(item.open ? { open: true } : {})}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="font-semibold text-lime-900">{item.title}</span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-lime-200 bg-white text-lime-700 transition group-open:rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-lime-800/80">{item.content}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
