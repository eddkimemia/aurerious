"use client"

import { useEffect, useState } from "react"
import { Users, TrendingUp, DollarSign, ChevronRight, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface MemberNode {
  id: string
  name: string
  phone: string
  dateJoined: string
  referrals: number
  earnings: number
  downline: MemberNode[]
}

interface TeamData {
  teamTree: MemberNode[]
  stats: { totalMembers: number; activeThisMonth: number; teamEarnings: number }
}

function MemberNode({ member }: { member: MemberNode }) {
  const initials = member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || member.phone.slice(-2)

  const level = member.referrals >= 5 ? "Gold" : member.referrals >= 2 ? "Silver" : "Bronze"

  const levelBadge = (lvl: string) => {
    const styles: Record<string, string> = {
      Gold: "bg-lux-gold/15 text-lux-gold-dark border-lux-gold/20",
      Silver: "bg-gray-200 text-gray-700 border-gray-300",
      Bronze: "bg-orange-100 text-orange-700 border-orange-200",
    }
    return <Badge variant="outline" className={cn("font-medium text-xs", styles[lvl])}>{lvl}</Badge>
  }

  if (!member.downline || member.downline.length === 0) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-lux-gold/5 transition-colors ml-8 border-l-2 border-lux-gold/20">
        <Avatar className="h-8 w-8 ring-2 ring-lux-gold/10">
          <AvatarFallback className="bg-lux-navy text-white text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-lux-text">{member.name}</p>
            {levelBadge(level)}
          </div>
          <p className="text-xs text-lux-text-light">Joined {member.dateJoined} &middot; {member.referrals} referrals</p>
        </div>
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value={member.name} className="border-0">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-lux-gold/5 transition-colors">
          <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]>svg]:rotate-0">
            <ChevronRight className="h-4 w-4 text-lux-gold transition-transform" />
          </AccordionTrigger>
          <Avatar className="h-8 w-8 ring-2 ring-lux-gold/10">
            <AvatarFallback className="bg-lux-navy text-white text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-lux-text">{member.name}</p>
              {levelBadge(level)}
            </div>
            <p className="text-xs text-lux-text-light">Joined {member.dateJoined} &middot; {member.referrals} referrals</p>
          </div>
        </div>
        <AccordionContent className="pb-2 pl-0">
          <div className="space-y-1">
            {member.downline.map((sub) => (
              <MemberNode key={sub.id} member={sub} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default function TeamPage() {
  const [data, setData] = useState<TeamData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/team")
      .then(async (r) => { const d = await r.json(); if (!r.ok) throw new Error(d.error); setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-lux-gold" /></div>
  }

  const teamStats = [
    { label: "Total Members", value: String(data?.stats?.totalMembers || 0), icon: Users, color: "text-lux-gold", bg: "bg-lux-gold/10" },
    { label: "Active This Month", value: String(data?.stats?.activeThisMonth || 0), icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { label: "Team Earnings", value: `KES ${(data?.stats?.teamEarnings || 0).toLocaleString()}`, icon: DollarSign, color: "text-lux-gold-dark", bg: "bg-lux-gold/10" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-lux-navy">My Team</h1>
        <p className="text-lux-text-light mt-1">View your downline members and team performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {teamStats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-lux-gold/10 shadow-sm card-lift">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", s.bg)}>
                    <Icon className={cn("h-5 w-5", s.color)} />
                  </div>
                </div>
                <p className="text-2xl font-heading font-bold text-lux-text">{s.value}</p>
                <p className="text-xs text-lux-text-light mt-1">{s.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-lux-gold/10 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-lg text-lux-navy">Team Tree</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {!data?.teamTree?.length ? (
            <div className="text-center text-lux-text-light py-10">No team members yet. Share your referral link to build your team!</div>
          ) : (
            <div className="space-y-1">
              {data.teamTree.map((member) => (
                <MemberNode key={member.id} member={member} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
