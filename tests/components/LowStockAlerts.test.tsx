import { render, screen } from "@testing-library/react";
import LowStockAlerts from "@/components/inventory/LowStockAlerts";

const sampleItems = [
  {
    id: 1,
    name: "Olive Oil",
    category: "Dry Goods",
    quantity: 0,
    unit: "bottles",
    lowStockThreshold: 2,
  },
  {
    id: 2,
    name: "Mozzarella",
    category: "Dairy",
    quantity: 3,
    unit: "kg",
    lowStockThreshold: 5,
  },
];

describe("LowStockAlerts", () => {
  it("renders a friendly empty message when there are no low-stock items", () => {
    render(
      <LowStockAlerts
        emptyMessage="No items need attention."
        items={[]}
        title="Low Stock Alert"
      />,
    );

    expect(screen.getByText("Low Stock Alert")).toBeInTheDocument();
    expect(screen.getByText("No items need attention.")).toBeInTheDocument();
  });

  it("renders low-stock items and their status details", () => {
    render(
      <LowStockAlerts
        emptyMessage="No items need attention."
        items={sampleItems}
        title="Low Stock Alert"
      />,
    );

    expect(screen.getByText("Olive Oil")).toBeInTheDocument();
    expect(screen.getByText("Mozzarella")).toBeInTheDocument();
    expect(screen.getByText("Current: 0 bottles")).toBeInTheDocument();
    expect(screen.getByText("Low stock at: 5 kg")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
    expect(screen.getByText("Low Stock")).toBeInTheDocument();
  });

  it("shows the most urgent items first", () => {
    render(
      <LowStockAlerts
        emptyMessage="No items need attention."
        items={sampleItems}
        title="Low Stock Alert"
      />,
    );

    const headings = screen.getAllByText(/Olive Oil|Mozzarella/);

    expect(headings[0]).toHaveTextContent("Olive Oil");
    expect(headings[1]).toHaveTextContent("Mozzarella");
  });

  it("renders low-stock alerts as a list", () => {
    render(
      <LowStockAlerts
        emptyMessage="No items need attention."
        items={sampleItems}
        title="Low Stock Alert"
      />,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
