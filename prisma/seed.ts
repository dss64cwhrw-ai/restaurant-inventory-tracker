import { prisma } from "@/lib/prisma";
import { inventorySeedItems } from "@/data/inventory-items";

async function main() {
  const seedUserId = process.env.SEED_USER_ID;

  if (!seedUserId) {
    throw new Error("SEED_USER_ID is not set.");
  }

  await prisma.inventoryItem.deleteMany({
    where: {
      userId: seedUserId,
    },
  });

  await prisma.prepTask.deleteMany({
    where: {
      userId: seedUserId,
    },
  });

  await prisma.inventoryItem.createMany({
    data: inventorySeedItems.map((item) => ({
      ...item,
      userId: seedUserId,
    })),
  });

  await prisma.prepTask.createMany({
    data: [
      {
        userId: seedUserId,
        title: "Slice tomatoes",
        station: "Cold Station",
        dueTime: new Date("2026-03-19T09:00:00.000Z"),
        completed: false,
      },
      {
        userId: seedUserId,
        title: "Portion chicken breast",
        station: "Grill Station",
        dueTime: new Date("2026-03-19T10:30:00.000Z"),
        completed: false,
      },
      {
        userId: seedUserId,
        title: "Shred mozzarella",
        station: "Pizza Station",
        dueTime: new Date("2026-03-19T08:30:00.000Z"),
        completed: true,
      },
    ],
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
