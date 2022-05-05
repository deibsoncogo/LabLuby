-- CreateTable
CREATE TABLE "Users_Rules" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_Rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Rules_user_id_rule_id_key" ON "Users_Rules"("user_id", "rule_id");

-- AddForeignKey
ALTER TABLE "Users_Rules" ADD CONSTRAINT "Users_Rules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Rules" ADD CONSTRAINT "Users_Rules_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "Rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
