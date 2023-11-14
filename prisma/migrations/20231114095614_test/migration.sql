/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "_id",
ADD COLUMN     "roll_no" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("roll_no");
