import AdditionalPlatform from '@/components/MainPage/PaymentRules/AdditionPlatFrom'
import LongFormContent from '@/components/MainPage/PaymentRules/LongFromContent'
import PlatFromWide from '@/components/MainPage/PaymentRules/PlatFromWide'
import React from 'react'

export default function PaymentRulesPage() {
    return (
        <div className='containers'>
            <div className="space-y-10 my-8">
                <div className="">
                    <PlatFromWide />
                </div>
                <div className="">
                    <LongFormContent />
                </div>
                <div className="">
                    <AdditionalPlatform />
                </div>
            </div>
        </div>
    )
}
