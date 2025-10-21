-- CreateTable
CREATE TABLE "Abastecimento" (
    "id" SERIAL NOT NULL,
    "tanqueId" INTEGER NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Abastecimento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Abastecimento" ADD CONSTRAINT "Abastecimento_tanqueId_fkey" FOREIGN KEY ("tanqueId") REFERENCES "Tanque"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Abastecimento" ADD CONSTRAINT "Abastecimento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
