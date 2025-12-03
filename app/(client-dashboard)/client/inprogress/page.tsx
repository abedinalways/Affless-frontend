import InProgressPage from '@/components/ClientDashboard/InProgressPage/InProgressPage'

export default function InProgress() {
  return (
    <div>
      <InProgressPage
        title="I will craft quality backlinks for your website's SEO."
        status="In Progress"
        days={7}
        hours={12}
        minutes={35}
        seconds={34}
        customer="Bessie Cooper"
        deliveryDate="NOV 6, 7:24 AM"
        price={743}
        orderId="#EM78373A0"
      />
    </div>
  )
}
