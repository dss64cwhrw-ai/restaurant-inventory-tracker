import { prisma } from "@/lib/prisma";
import { inventorySeedItems } from "@/data/inventory-items";

async function main() {
  await prisma.inventoryItem.deleteMany();

  await prisma.inventoryItem.createMany({
    data: inventorySeedItems,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
