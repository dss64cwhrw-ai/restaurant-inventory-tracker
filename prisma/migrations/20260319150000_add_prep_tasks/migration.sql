-- CreateTable
CREATE TABLE "PrepTask" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "dueTime" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrepTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PrepTask_userId_idx" ON "PrepTask"("userId");
