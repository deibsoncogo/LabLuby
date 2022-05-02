-- CreateTable
CREATE TABLE "Bets" (
    "id" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bets" ADD CONSTRAINT "Bets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "Bets" ADD CONSTRAINT "Bets_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
