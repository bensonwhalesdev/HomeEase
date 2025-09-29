import HeroSection from "./components/HeroSection"
import HomeHeader from "./components/HomeHeader"
import PhoneDeals from "./components/PhoneDeals"
import TopSellrs from "./components/TopSellrs"
import WomenDeals from "./components/WomenDeals"
import KitchenDeals from "./components/kitchenDeals"

const page = () => {
  return (
    <main>
      <HomeHeader />
      <HeroSection />
      <TopSellrs />
      <PhoneDeals />
      <KitchenDeals />
      <WomenDeals />
    </main>
  )
}

export default page