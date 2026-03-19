import { getInventoryStatusDetails } from "@/lib/inventory-status";

type StockStatusBadgeProps = {
  quantity: number;
  lowStockThreshold: number;
};

export default function StockStatusBadge({
  quantity,
  lowStockThreshold,
}: StockStatusBadgeProps) {
  const status = getInventoryStatusDetails(quantity, lowStockThreshold);

  return (
    <span
      aria-label={`Stock status: ${status.label}`}
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.toneClassName}`}
    >
      {status.label}
    </span>
  );
}
