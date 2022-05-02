-- CreateTable
CREATE TABLE "Users_Rules" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "rule_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_Rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users_Rules" ADD CONSTRAINT "Users_Rules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Users_Rules" ADD CONSTRAINT "Users_Rules_rule_id_fkey" FOREIGN KEY ("rule_id") REFERENCES "Rules"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
