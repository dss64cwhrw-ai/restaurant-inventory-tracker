type StockStatusBadgeProps = {
  quantity: number;
  lowStockThreshold: number;
};

export default function StockStatusBadge({
  quantity,
  lowStockThreshold,
}: StockStatusBadgeProps) {
  const isLowStock = quantity <= lowStockThreshold;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isLowStock
          ? "bg-red-100 text-red-700"
          : "bg-emerald-100 text-emerald-700"
      }`}
    >
      {isLowStock ? "Low Stock" : "OK"}
    </span>
  );
}
