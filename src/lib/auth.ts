import { getServerSession, type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

declare module "next-auth" {
  interface User {
    phone?: string
    role?: string
    referralCode?: string
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      phone?: string
      role?: string
      referralCode?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    phone?: string
    role?: string
    referralCode?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        login: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          throw new Error("Login and password are required")
        }

        const user = await db.user.findFirst({
          where: {
            OR: [
              { email: credentials.login },
              { phone: credentials.login },
            ],
          },
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        if (user.status === "pending") {
          throw new Error("PENDING_PAYMENT")
        }
        if (user.status !== "active") {
          throw new Error("Account is suspended")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          referralCode: user.referralCode,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.phone = user.phone
        token.role = user.role
        token.referralCode = user.referralCode
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.phone = token.phone as string
        session.user.role = token.role as string
        session.user.referralCode = token.referralCode as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const auth = () => getServerSession(authOptions)
