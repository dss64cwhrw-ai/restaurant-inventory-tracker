import { render, screen } from "@testing-library/react";
import StockStatusBadge from "@/components/inventory/StockStatusBadge";

describe("StockStatusBadge", () => {
  it("renders OK when quantity is above the threshold", () => {
    render(<StockStatusBadge quantity={10} lowStockThreshold={5} />);

    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("renders Low Stock when quantity is equal to the threshold", () => {
    render(<StockStatusBadge quantity={5} lowStockThreshold={5} />);

    expect(screen.getByText("Low Stock")).toBeInTheDocument();
  });

  it("renders Critical when quantity is zero", () => {
    render(<StockStatusBadge quantity={0} lowStockThreshold={5} />);

    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("exposes a readable status label for assistive technology", () => {
    render(<StockStatusBadge quantity={5} lowStockThreshold={5} />);

    expect(screen.getByLabelText("Stock status: Low Stock")).toBeInTheDocument();
  });
});
