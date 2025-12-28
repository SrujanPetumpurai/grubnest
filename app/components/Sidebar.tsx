export default function Sidebar({ onClick }: { onClick: (category: string) => void }) {
  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="category"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        Choose category
      </label>
      <select
        id="category"
        onChange={(e) => onClick(e.target.value)}
        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
        defaultValue="all"
      >
        <option value="all">All</option>
        <option value="meat">Meat</option>
        <option value="seafood">Sea-food</option>
        <option value="vegetable">Vegetables</option>
        <option value="milk">Milk</option>
        <option value="eggs">Eggs</option>
      </select>
    </form>
  );
}
