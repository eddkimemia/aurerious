import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { generateReferralCode } from "../src/lib/utils"

const prisma = new PrismaClient()

async function ensureReferralCode(): Promise<string> {
  let code = generateReferralCode()
  while (await prisma.user.findUnique({ where: { referralCode: code } })) {
    code = generateReferralCode()
  }
  return code
}

async function main() {
  console.log("Seeding database...")

  // Ensure admin
  const adminEmail = "admin@zuriagency.co.ke"
  const adminPassword = "Admin123!"
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!admin) {
    const hash = await bcrypt.hash(adminPassword, 10)
    const code = await ensureReferralCode()
    // ensure ADMIN code available if not taken
    const adminCode = (await prisma.user.findUnique({ where: { referralCode: "ADMIN" } })) ? code : "ADMIN"
    admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        phone: "0700000000",
        password: hash,
        role: "admin",
        referralCode: adminCode,
        status: "active",
      },
    })
    console.log(`Created admin ${adminEmail} / ${adminPassword} (${admin.referralCode})`)
  } else {
    if (admin.role !== "admin" || admin.status !== "active") {
      admin = await prisma.user.update({
        where: { email: adminEmail },
        data: { role: "admin", status: "active" },
      })
    }
    console.log(`Admin exists ${adminEmail} (${admin.referralCode})`)
  }

  const usersToSeed = [
    {
      name: "Grace Wanjiku",
      email: "grace.wanjiku@example.com",
      phone: "0711223344",
      password: "Member123!",
      referredBy: admin.id,
    },
    {
      name: "James Otieno",
      email: "james.otieno@example.com",
      phone: "0722334455",
      password: "Member123!",
      referredBy: admin.id,
    },
  ]

  for (const u of usersToSeed) {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: u.email }, { phone: u.phone }] },
    })
    if (existing) {
      console.log(`Skipping ${u.email} already exists (${existing.phone})`)
      continue
    }
    const hash = await bcrypt.hash(u.password, 10)
    const referralCode = await ensureReferralCode()
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        phone: u.phone,
        password: hash,
        referralCode,
        referredBy: u.referredBy,
        status: "active",
        mpesaNumber: u.phone,
      },
    })

    // Create referral link from admin to user
    const referral = await prisma.referral.create({
      data: {
        referrerId: u.referredBy!,
        refereeId: user.id,
        status: "completed",
        level: 1,
      },
    })

    // Direct commission for admin: 350
    const commission = await prisma.commission.create({
      data: {
        userId: admin.id,
        referralId: referral.id,
        amount: 350,
        type: "direct",
        status: "pending",
        description: `Direct commission for referring ${u.name} (${u.phone})`,
      },
    })
    await prisma.transaction.create({
      data: {
        userId: admin.id,
        type: "commission",
        amount: 350,
        status: "pending",
        reference: `DIR-${commission.id}`,
        description: `Direct referral commission - KES 350.00`,
      },
    })

    // Signup bonus for new user: 500 locked
    const bonus = await prisma.commission.create({
      data: {
        userId: user.id,
        amount: 500,
        type: "signup_bonus",
        status: "locked",
        description: `Signup airtime bonus - KES 500 (unlock after 5 referrals)`,
      },
    })
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: "bonus",
        amount: 500,
        status: "locked",
        reference: `BONUS-${bonus.id}`,
        description: `Signup bonus KES 500 - locked until 5 referrals`,
      },
    })

    // Payment transaction for membership
    await prisma.transaction.create({
      data: {
        userId: user.id,
        type: "payment",
        amount: 1000,
        status: "completed",
        reference: `SEED-${user.id.slice(-6).toUpperCase()}`,
        description: `M-Pesa payment of KES 1000.00 (seeded)`,
      },
    })

    console.log(`Seeded ${u.name} ${u.phone} ${u.email} code ${referralCode} | admin earned 350, user bonus 500 locked`)
  }

  const total = await prisma.user.count()
  console.log(`Done. Total users: ${total}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
