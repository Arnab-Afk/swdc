-- AlterTable
ALTER TABLE "user_certifications" ADD COLUMN     "credential_id" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "expiry_date" DATE,
ADD COLUMN     "issue_date" DATE,
ADD COLUMN     "organization" VARCHAR(200) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "university_name" VARCHAR(200) NOT NULL DEFAULT '';
