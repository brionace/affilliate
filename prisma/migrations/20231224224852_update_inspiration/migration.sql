/*
  Warnings:

  - You are about to drop the column `ageGroup` on the `Inspiration` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Inspiration` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Inspiration` table. All the data in the column will be lost.
  - Added the required column `age` to the `Inspiration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Inspiration` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inspiration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "public" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Inspiration" ("content", "createdAt", "event", "gender", "id", "meta", "published", "slug", "title", "updatedAt") SELECT "content", "createdAt", "event", "gender", "id", "meta", "published", "slug", "title", "updatedAt" FROM "Inspiration";
DROP TABLE "Inspiration";
ALTER TABLE "new_Inspiration" RENAME TO "Inspiration";
CREATE UNIQUE INDEX "Inspiration_slug_key" ON "Inspiration"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
