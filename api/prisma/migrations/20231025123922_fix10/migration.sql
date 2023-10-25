-- AlterTable
ALTER TABLE "Subjects" ADD COLUMN     "color" TEXT,
ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "GptQuestions" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "alternative1" TEXT NOT NULL,
    "alternative2" TEXT NOT NULL,
    "alternative3" TEXT NOT NULL,
    "alternative4" TEXT NOT NULL,
    "correctAlternative" INTEGER NOT NULL,

    CONSTRAINT "GptQuestions_pkey" PRIMARY KEY ("id")
);
