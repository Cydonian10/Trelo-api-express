-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_list_id_fkey";

-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_board_id_fkey";

-- DropForeignKey
ALTER TABLE "user_board" DROP CONSTRAINT "user_board_board_id_fkey";

-- DropForeignKey
ALTER TABLE "user_board" DROP CONSTRAINT "user_board_member_id_fkey";

-- AddForeignKey
ALTER TABLE "user_board" ADD CONSTRAINT "user_board_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_board" ADD CONSTRAINT "user_board_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
