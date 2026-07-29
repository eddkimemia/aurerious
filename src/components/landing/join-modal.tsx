"use client"

import { useState } from "react"
import { CheckCircle, UserPlus, Phone, Smartphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export function JoinModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", mpesa: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.phone) {
      setFormSubmitted(true)
      setTimeout(() => { onOpenChange(false); setFormSubmitted(false); setFormData({ name: "", phone: "", mpesa: "" }) }, 3000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) setTimeout(() => setFormSubmitted(false), 300) }}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-lux-navy-dark via-lux-gold to-lux-navy" />
        <div className="p-6">
          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lux-gold-pale mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-lux-gold" />
              </div>
              <h3 className="font-heading font-bold text-xl text-lux-navy mb-2">Welcome to Aureus Network!</h3>
              <p className="text-lux-text-light">Your registration has been received. Check your M-Pesa for the payment prompt.</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading font-bold text-2xl text-lux-navy">Join Aureus Network</DialogTitle>
                <DialogDescription className="text-lux-text-light">Complete the form below to activate your referral link and start earning KES 350 per referral.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="join-name" className="font-medium text-lux-navy">Full Name</Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                    <Input id="join-name" placeholder="e.g. John Kamau" className="pl-10 input-glow" required value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-phone" className="font-medium text-lux-navy">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                    <Input id="join-phone" type="tel" placeholder="e.g. 0712 345 678" className="pl-10 input-glow" required pattern="0[17][0-9]{8}" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                    <p className="text-xs text-lux-text-light mt-1">Format: 07XXXXXXXX (10 digits)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-mpesa" className="font-medium text-lux-navy">M-Pesa Phone Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-lux-text-light" />
                    <Input id="join-mpesa" type="tel" placeholder="e.g. 0712 345 678" className="pl-10" value={formData.mpesa} onChange={(e) => setFormData((p) => ({ ...p, mpesa: e.target.value }))} />
                  </div>
                  <p className="text-xs text-lux-text-light">Leave blank to use the same phone number for M-Pesa.</p>
                </div>
                <div className="rounded-xl bg-lux-gold-pale/50 border border-lux-gold/10 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-semibold text-lux-navy">Membership Fee</span>
                    <span className="font-heading font-bold text-xl text-lux-gold">KES 1,000</span>
                  </div>
                  <p className="text-xs text-lux-text-light mt-1">One-time payment. No recurring charges.</p>
                </div>
                <DialogFooter className="pt-2">
                  <Button type="submit" className="w-full bg-lux-cta hover:bg-lux-cta-hover text-white font-heading font-bold text-lg h-12 rounded-full shadow-lg glow-cta">
                    Pay KES 1,000 via M-Pesa
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
