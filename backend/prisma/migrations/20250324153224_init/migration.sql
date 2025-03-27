-- CreateTable
CREATE TABLE "applications" (
    "application_id" SERIAL NOT NULL,
    "student_id" VARCHAR(100) NOT NULL,
    "job_id" VARCHAR(100) NOT NULL,
    "resume_id" VARCHAR(100) NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_applied" BOOLEAN NOT NULL DEFAULT false,
    "status_shortlisted" BOOLEAN NOT NULL DEFAULT false,
    "status_interview_scheduled" BOOLEAN NOT NULL DEFAULT false,
    "status_technical_round" BOOLEAN NOT NULL DEFAULT false,
    "status_offer_made" BOOLEAN NOT NULL DEFAULT false,
    "status_offer_accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "drive_process_completion" (
    "completion_id" SERIAL NOT NULL,
    "application_id" INTEGER NOT NULL,
    "step_id" VARCHAR(100) NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL DEFAULT false,
    "completion_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drive_process_completion_pkey" PRIMARY KEY ("completion_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "marked_out" BOOLEAN NOT NULL DEFAULT false,
    "first_name" VARCHAR(100) NOT NULL DEFAULT '',
    "middle_name" VARCHAR(100) NOT NULL DEFAULT '',
    "last_name" VARCHAR(100) NOT NULL DEFAULT '',
    "phone" VARCHAR(20) NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "mother_name" VARCHAR(100) NOT NULL DEFAULT '',
    "gimg" VARCHAR(255) NOT NULL DEFAULT '',
    "degree" VARCHAR(100) NOT NULL DEFAULT '',
    "branch" VARCHAR(100) NOT NULL DEFAULT '',
    "year_of_graduation" INTEGER NOT NULL DEFAULT 0,
    "cgpa" DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    "rollno" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_skills" (
    "user_skill_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skill_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("user_skill_id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "experience_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company" VARCHAR(100) NOT NULL DEFAULT '',
    "profile" VARCHAR(100) NOT NULL DEFAULT '',
    "from_date" DATE,
    "to_date" DATE,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "user_projects" (
    "user_project_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "user_projects_pkey" PRIMARY KEY ("user_project_id")
);

-- CreateTable
CREATE TABLE "user_certifications" (
    "user_certification_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "certification_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "user_certifications_pkey" PRIMARY KEY ("user_certification_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "user_role_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_role_id")
);

-- CreateTable
CREATE TABLE "user_companies" (
    "user_company_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_companies_pkey" PRIMARY KEY ("user_company_id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "resume_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "resume_name" VARCHAR(255) NOT NULL DEFAULT '',
    "file_data" BYTEA,
    "upload_date" TIMESTAMP(3),
    "content_type" VARCHAR(100) NOT NULL DEFAULT '',
    "resumelink" VARCHAR(255) NOT NULL DEFAULT '',

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("resume_id")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "job_id" SERIAL NOT NULL,
    "company_id" VARCHAR(100) NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "imgurl" VARCHAR(255),
    "description" TEXT,
    "location" VARCHAR(255),
    "salary" DECIMAL(15,2),
    "posted_date" TIMESTAMP(3),
    "application_deadline" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "degree" VARCHAR(100),
    "min_cgpa" DECIMAL(3,2),
    "min_experience_months" INTEGER,

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "job_branches" (
    "job_branch_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "branch_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "job_branches_pkey" PRIMARY KEY ("job_branch_id")
);

-- CreateTable
CREATE TABLE "job_skills" (
    "job_skill_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "skill_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "job_skills_pkey" PRIMARY KEY ("job_skill_id")
);

-- CreateTable
CREATE TABLE "drive_process_steps" (
    "step_id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "step_number" INTEGER NOT NULL,
    "step_name" VARCHAR(100),
    "description" TEXT,
    "from_date" TIMESTAMP(3),
    "till_date" TIMESTAMP(3),
    "location" VARCHAR(255),
    "duration_minutes" INTEGER,

    CONSTRAINT "drive_process_steps_pkey" PRIMARY KEY ("step_id")
);

-- CreateTable
CREATE TABLE "companies" (
    "company_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "email" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "tpos" (
    "tpo_id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" BIGINT,
    "position" VARCHAR(255),
    "permissions" TEXT,

    CONSTRAINT "tpos_pkey" PRIMARY KEY ("tpo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "drive_process_completion" ADD CONSTRAINT "drive_process_completion_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("application_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_certifications" ADD CONSTRAINT "user_certifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_companies" ADD CONSTRAINT "user_companies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_branches" ADD CONSTRAINT "job_branches_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_skills" ADD CONSTRAINT "job_skills_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drive_process_steps" ADD CONSTRAINT "drive_process_steps_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;
