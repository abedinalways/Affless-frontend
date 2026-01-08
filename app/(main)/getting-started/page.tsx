'use client'

import { Button } from '@/components/ui/button'
import PageBanner from '@/components/reusable/Bgbanner'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { CheckCircle } from 'lucide-react'

export default function GettingStartedPage() {
    const router = useRouter()
    const { user, loading } = useUser()

    const handleClientCTA = () => {
        const isLogin = localStorage.getItem('isLogin')

        if (!isLogin) {
            // Route to signup with client selected
            router.push('/singup?type=client')
        } else if (user === 'client') {
            // Route to client dashboard
            router.push('/client')
        } else {
            // Fallback to signup
            router.push('/singup?type=client')
        }
    }

    const handleEditorCTA = () => {
        const isLogin = localStorage.getItem('isLogin')

        if (!isLogin) {
            // Route to signup with editor selected
            router.push('/singup?type=editor')
        } else if (user === 'editor') {
            // Route to editor profile page
            router.push('/editor/profile')
        } else {
            // Fallback to signup
            router.push('/singup?type=editor')
        }
    }

    return (
        <div>
            {/* Page Banner */}
            <PageBanner
                title="Getting Started"
                desc="Quick guide to help you get started on the platform"
                bgImage="/findEditor.jpg"
                links={[
                    { label: 'Home', href: '/' },
                    { label: 'Getting Started' }
                ]}
            />

            {/* Main Content */}
            <div className="containers mx-auto py-12 lg:py-20">
                {/* Page Title and Description */}
                <div className="text-center mb-12">
                    <h2 className="text-[#333] font-poppins text-[32px] md:text-[40px] lg:text-[48px] font-semibold leading-[120%]">
                        Welcome to Editor Marketplace
                    </h2>
                    <p className="text-[#4A4C56] font-poppins text-[18px] md:text-[20px] font-normal leading-[150%] mt-4 max-w-3xl mx-auto">
                        Whether you're looking to hire talented editors or offering your creative services, we've made it simple to get started.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* For Clients Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="mb-6">
                            <h3 className="text-[#333] font-poppins text-[28px] md:text-[32px] font-semibold leading-[120%] mb-2">
                                For Clients
                            </h3>
                            <p className="text-[#4A4C56] font-poppins text-[16px] font-normal leading-[150%]">
                                Find and hire the perfect editor for your project
                            </p>
                        </div>

                        {/* Steps List */}
                        <div className="space-y-4 mb-8">
                            {[
                                { step: 1, text: 'Create an account (Client)' },
                                { step: 2, text: 'Post a job (title, budget, timeline, requirements)' },
                                { step: 3, text: 'Review proposals and profiles' },
                                { step: 4, text: 'Hire an editor and manage the project' },
                                { step: 5, text: 'Pay securely through the platform and leave a review' }
                            ].map((item) => (
                                <div key={item.step} className="flex items-start gap-3">
                                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                        {item.step}
                                    </div>
                                    <p className="text-[#333] font-poppins text-[16px] font-normal leading-[150%] pt-1">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Button
                            onClick={handleClientCTA}
                            className="w-full h-12 text-[16px] font-semibold"
                            size="lg"
                        >
                            Post a Job
                        </Button>
                    </div>

                    {/* For Editors Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="mb-6">
                            <h3 className="text-[#333] font-poppins text-[28px] md:text-[32px] font-semibold leading-[120%] mb-2">
                                For Editors
                            </h3>
                            <p className="text-[#4A4C56] font-poppins text-[16px] font-normal leading-[150%]">
                                Showcase your skills and find exciting projects
                            </p>
                        </div>

                        {/* Steps List */}
                        <div className="space-y-4 mb-8">
                            {[
                                { step: 1, text: 'Create an account (Editor)' },
                                { step: 2, text: 'Create profile + add portfolio' },
                                { step: 3, text: 'Browse jobs and send proposals' },
                                { step: 4, text: 'Deliver work and communicate inside the platform' },
                                { step: 5, text: 'Get paid and build reviews' }
                            ].map((item) => (
                                <div key={item.step} className="flex items-start gap-3">
                                    <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                        {item.step}
                                    </div>
                                    <p className="text-[#333] font-poppins text-[16px] font-normal leading-[150%] pt-1">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Button
                            onClick={handleEditorCTA}
                            className="w-full h-12 text-[16px] font-semibold"
                            size="lg"
                        >
                            Create Profile
                        </Button>
                    </div>
                </div>

                {/* Additional Help Section */}
                <div className="mt-16 text-center">
                    <p className="text-[#4A4C56] font-poppins text-[16px] md:text-[18px] font-normal leading-[150%]">
                        Need more information?{' '}
                        <a href="/help-center" className="text-primary hover:underline font-medium">
                            Visit our Help Center
                        </a>
                        {' '}or{' '}
                        <a href="/contactUs" className="text-primary hover:underline font-medium">
                            Contact Us
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}