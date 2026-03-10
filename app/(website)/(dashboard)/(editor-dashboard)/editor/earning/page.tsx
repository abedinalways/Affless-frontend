
import Earnings from '@/components/ClientEditor/Earning/Earning'
import React from 'react'
import { TooltipProvider } from "@/components/ui/tooltip"

export default function EarningPage() {
  return (
    <div>
      <TooltipProvider>
        <Earnings/>
      </TooltipProvider>
    </div>
  )
}
