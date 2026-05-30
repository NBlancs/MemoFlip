-- AlterEnum
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'NORMAL', 'HARD');
ALTER TABLE "MatchSession" ALTER COLUMN "difficulty" TYPE "Difficulty" USING ("difficulty"::text::"Difficulty");
DROP TYPE "Difficulty_old";
