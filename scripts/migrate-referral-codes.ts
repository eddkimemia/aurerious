import { PrismaClient } from "@prisma/client"
import { generateReferralCode } from "../src/lib/utils"

const db = new PrismaClient()

async function main() {
  console.log("Scanning for users with long referral codes...")

  const users = await db.user.findMany({
    where: {
      referralCode: { contains: "c" },
    },
  })

  console.log(`Found ${users.length} users with CUID-style codes`)

  let updated = 0
  for (const user of users) {
    let code = generateReferralCode()
    while (await db.user.findUnique({ where: { referralCode: code } })) {
      code = generateReferralCode()
    }

    await db.user.update({
      where: { id: user.id },
      data: { referralCode: code },
    })

    updated++
    if (updated % 10 === 0) {
      console.log(`  ${updated}/${users.length} updated...`)
    }
  }

  console.log(`Done! ${updated} users updated to short codes.`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
