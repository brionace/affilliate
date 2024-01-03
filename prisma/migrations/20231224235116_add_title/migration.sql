/*
  Warnings:

  - Added the required column `title` to the `Inspiration` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inspiration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "public" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Inspiration" ("age", "createdAt", "event", "gender", "id", "public", "published", "tags", "updatedAt") SELECT "age", "createdAt", "event", "gender", "id", "public", "published", "tags", "updatedAt" FROM "Inspiration";
DROP TABLE "Inspiration";
ALTER TABLE "new_Inspiration" RENAME TO "Inspiration";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
