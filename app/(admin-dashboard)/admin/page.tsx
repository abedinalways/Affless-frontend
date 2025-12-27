'use client'

import React, { useState } from 'react'
import { Users, ShoppingBag, Package, Wallet, TrendingUp } from 'lucide-react';
import { revenueIcon, editorIcon } from '@/public/svgIcons/svgIcons';
import { Roboto } from 'next/font/google';
import { LineChart } from './_components/TotalUserGraph';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Poppins } from 'next/font/google';
import TopClientTable from './_components/TopClientTable';
import TopEditorTable from './_components/TopEditorTable';


const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

type Stat = {
  id: string
  title: string
  value: string
  percent: string
  icon: React.ComponentType<{ className?: string }>
}

function StatCard({ title, value, percent, icon: Icon }: Stat) {
  return (
    <div className="flex-1 p-5 bg-white rounded-xl shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)]  outline-Stroke-Color-B&W-White-Shade inline-flex flex-col justify-start items-start gap-6 border border-[#E9E9E9]">
      <div className="inline-flex justify-start items-center gap-3">
        <div className="w-10 h-10 p-2.5 bg-red-600/10 rounded-2xl flex justify-center items-center">
          <Icon className="w-5 h-5 text-red-600" />
        </div>
        <div className="justify-start text-[#444950] text-lg font-medium font-['Roboto'] leading-relaxed">{title}</div>
      </div>
      <div className="self-stretch inline-flex justify-between items-center">
        <div className="justify-start text-[#444950] text-[32px] font-semibold font-['Roboto'] leading-10">{value}</div>
        <div className="inline-flex flex-col justify-start items-end gap-0.5">
          <div className="self-stretch inline-flex justify-end items-center gap-1 text-[#4CAF50]">
            <TrendingUp />
            <span>{percent}</span>
          </div>
          <div className="justify-start text-[#93979A] text-base font-normal font-['Roboto'] leading-snug">Last Month</div>
        </div>
      </div>
    </div>

  )
}

export default function DashboardPage() {
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [showAllOrders, setShowAllOrders] = useState(false)
  const stats: Stat[] = [
    { id: 'users', title: 'Total Editor', value: '200', percent: '10%', icon: editorIcon },
    { id: 'sell', title: 'Total Client', value: '200', percent: '6%', icon: Users },
    { id: 'orders', title: ' Total Revenue', value: '$20K', percent: '6%', icon: revenueIcon }
  ]
  return (
    <div className="w-full max-w-full mx-auto space-y-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>
      <div className='grid grid-cols-[auto_1fr] gap-8'>
        <div className="bg-white p-5 border border-[#E9E9E9] rounded-lg shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] grid gap-6">
          <div className='flex justify-between items-center gap-6'>
            <div className='space-y-1.5'>
              <h2 className='text-[#444950]  text-sm font-medium leading-[19.6px]'>Total Signup</h2>
              <div className='flex items-center gap-2'>
                <h3 className='text-[#4A4C56] text-2xl font-bold leading-9'>200</h3>
                <div className='flex items-center text-[10px] text-[#3F9917] font-semibold leading-2.5 gap-1 bg-[#4CAF501A] px-2 py-1 border border-[#4CAF50] rounded-full'>
                  <span>10%</span>
                  <TrendingUp size={14} />
                </div>
              </div>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue className='text-[#62676C]' placeholder="Select a period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem defaultChecked value="yearly">Yearly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <LineChart selectedPeriod="Yearly" />
        </div>
        <div className='bg-white p-4.5 border border-[#E9E9E9] rounded-lg shadow-[0px_4px_33px_8px_rgba(0,0,0,0.04)] flex flex-col gap-4'>
          <div className='flex justify-between items-center gap-4 whitespace-nowrap font-["Poppins"]'>
            <h3 className='text-[#4A4C56] text-lg font-medium leading-[21.6px]'>Top Client</h3>
            <button type="button" className='text-[#4A4C56] font-["Poppins"] text-sm leading-[21px] px-3.5 py-2 border border-[#E9E9E9] rounded-md cursor-pointer'>View All</button>
          </div>
          <div className='border border-[#FAFBFC]'>
            <TopClientTable />
          </div>
        </div>
      </div>
      <div className='bg-white p-4.5 border border-[#E9E9E9] rounded-lg'>
        <TopEditorTable />
      </div>
    </div>
  )
}
