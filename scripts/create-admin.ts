import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || "admin@aureusnetwork.co.ke"
  const password = process.argv[3] || "Admin123!"

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "admin" },
    })
    console.log(`Updated ${email} to admin role`)
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email,
      phone: "0700000000",
      password: hashedPassword,
      role: "admin",
      referralCode: "ADMIN",
      status: "active",
    },
  })

  console.log(`Admin user created:`)
  console.log(`  Email:    ${email}`)
  console.log(`  Password: ${password}`)
  console.log(`  ID:       ${user.id}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
