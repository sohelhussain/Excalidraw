-- CreateTable
CREATE TABLE "Shape" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "width" TEXT,
    "height" TEXT,
    "startX" TEXT NOT NULL,
    "startY" TEXT NOT NULL,
    "radius" TEXT,
    "image" TEXT,
    "text" TEXT,
    "strokeColor" TEXT,
    "fillColor" TEXT,
    "round" TEXT,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
