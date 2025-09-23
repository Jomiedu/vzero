"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"
import { formatPrice, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    dispatch({ type: "ADD_ITEM", payload: product })
    setIsLoading(false)
  }

  const productDetailUrl = `/products/${product.id}`

  const getProductImage = () => {
    const productImageMap: { [key: string]: string } = {
      "BLACK JUBOL BOTTLE BOOT":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%20BOTTLE%20BOOT.PNG-FUGSW5eM4olsfFrzdLprQsX72LH7t7.jpeg",
      "BLACK JUBOL BAG FOR 1.9L JUG":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%20BAG%20FOR%201.9L%20JUG.png-NngDrg6XB9yIgf8NAocVAJwBshldWx.jpeg",
      "BLACK JUBOL COOL BLAST FAN":
        "https://blobs.vusercontent.net/blob/BLACK%20JUBOL%20COOL%20BLAST%20FAN.png-RhrjV5I56WgMYnpR5BgVdl7vesglhB.jpeg",
      "Ash Jubol Silicone Full Body Boot for Stanley Cup 40 oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ash%20Jubol%20Silicone%20Full%20Body%20Boot%20for%20Stanley%20Cup%2040%20oz.png-xuoN9Lv1oWLBIvwQf30gFq80xcLGRl.jpeg",
      "BLACK JUBOL 3QTR QUENCHER BOOT WITH HANDLE":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%203QTR%20QUENCHER%20BOOT%20WITH%20HANDLE.PNG-LI3ogbN8Bt3arx37LJ4P0qWa6oRncj.jpeg",
      "Ash Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ash%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-ZiidgejZIe6gb4XCu3I3BXuO0flL6x.jpeg",
      "BLACK JUBOL EXECUTIVE LUNCH BAG":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%20EXECUTIVE%20LUNCH%20BAG.png-xAErKEcHS73JC7tsepaafz197ABDBX.jpeg",
      "BLACK JUBOL JUG BOOT":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BLACK%20JUBOL%20JUG%20BOOT.png-ClkR5xhXipTt7khZZJ8sXUBm58oSwE.jpeg",
      "Black Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-A2eKCuPRmWlodK7B16LriVEvvXmC2u.jpeg",
      "Blue Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20Jubol%20Executive%20Lunch%20Bag.png-CrBpARUD7H7AKRSNTdUNceHBqRfr3i.jpeg",
      "Blue Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20Jubol%20Silicone%20Bottle%20Carrier.PNG-yr1CXdTxVdtVGPnPyMBnGhpbjTKtci.png",
      "Black Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Silicone%20Bottle%20Carrier.PNG-RD8G5icFpdtgx4Pln0db9VxN3Zp61b.png",
      "Black Jubol Silicone Snack Bowl for Stanley 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Silicone%20Snack%20Bowl%20for%20Stanley%2040oz.png-AYNIwYyUIbqEhIy7XF3j2tNz7J4Fs7.jpeg",
      "Black Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-5bVI1qxFUEQEovImb0L3gAlz0qksxO.jpeg",
      "Blue Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-CG7u4oVV1jwZ3ClkJ0miQxb0OMHP5A.jpeg",
      "Blue Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-jGk2FfDI24nTUlbiYn2NbuV7C5Noh2.jpeg",
      "Cream Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cream%20Jubol%20Silicone%20Bottle%20Carrier.PNG-MA3X2avbxjemwnO93yxQgYjinzZ1nm.jpeg",
      "Green Jubol Cool Blast Fan":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Green%20Jubol%20Cool%20Blast%20Fan.png-wLIjAPkpPcAtebeGwK2stxYMiHbyXT.jpeg",
      "Cream Jubol Silicone Snack Bowl for Stanley 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cream%20Jubol%20Silicone%20Snack%20Bowl%20for%20Stanley%2040oz.png-aRwprGiZ8m8l0UZElN8HlJKIVf5Mz3.jpeg",
      "Green Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Green%20Jubol%20Executive%20Lunch%20Bag.png-c4ytfd59n6bVM5QtDJ177KY0n1oHwf.jpeg",
      "Black Jubol 3qtr Quencher Boot With Handle":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%203qtr%20Quencher%20Boot%20With%20Handle.PNG-eQavAnV4cWwzVeuRPKKeQ7Njokg06E.jpeg",
      "Cream Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cream%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-6qG5uuSGqiZ6tgMaSp7w5dqG6JdmcH.jpeg",
      "Black Jubol Bag for 1.9L Jug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Bag%20for%201.9L%20Jug.png-sGrhiIkn9uUtZJ3vOTr9Y8cKP3RdQi.jpeg",
      "Cream Jubol Silicone Quencher Divider":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CREAM%20JUBOL%20SILICONE%20QUENCHER%20DIVIDER.PNG-zzanMsbX7beVtRVAxQvgihcc5QftAL.jpeg", // Updated cream divider image URL
      "Pink Jubol Silicone Quencher Divider":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PINK%20JUBOL%20SILICONE%20QUENCHER%20DIVIDER.PNG-pdNSJ3jJs6drpfDz9xNaI0lc5JYDVh.jpeg",
      "Lilac Jubol Silicone Quencher Divider":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LILAC%20JUBOL%20SILICONE%20QUENCHER%20DIVIDER.PNG-CKJUyirKcb5NfNej0YC8uHpQ4TlaUt.jpeg",
      "Shale Jubol Silicone Quencher Divider":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SHALE%20JUBOL%20SILICONE%20QUENCHER%20DIVIDER.PNG-IwG0UrPpqxbT8b0OHlw4tclakbF0DK.jpeg",
      "Brown Jubol Bag for 1.9L Jug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brown%20Jubol%20Bag%20for%201.9L%20Jug.png-U5ihx0fhnPwyA6CW3EWFCL0ZA800iU.jpeg",
      "Brown Jubol Silicone Ice Tray":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brown%20Jubol%20Silicone%20Ice%20Tray.PNG-fHys1ZXdUK4DrI6FYlyVthQIKIsXHN.jpeg",
      "Grey Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grey%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-AhQRc8NReDgJGhBnMmV0zfgDnafprg.jpeg",
      "Jubol 3pcs Long Brush":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jubol%203pcs%20Long%20Brush.png-hEI0ZqdxafswccUSs8q93kzDsKoANH.jpeg",
      "Grey Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grey%20Jubol%20Executive%20Lunch%20Bag.png-6Pg5FDyszVW2KrRspcllK2CR9o1okI.jpeg",
      "Grey Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Grey%20Jubol%20Bottle%20Boot.PNG-xkJw0Mb1KwSiyTwqYfTVRqg1hUD6n5.jpeg",
      "Black Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Executive%20Lunch%20Bag.png-Two63tZ2DqtRO0vc4YX9iM5WFRAC2x.jpeg",
      "Green Jubol Silicone Ice Tray":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Green%20Jubol%20Silicone%20Ice%20Tray.PNG-BDsNw9zwDFcR3RftBGvFZChiDpMkI8.jpeg",
      "Black Jubol Cool Blast Fan":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Cool%20Blast%20Fan.png-Oa1IgNjPOkjfeaXfQaFqGG9SwQwsbg.jpeg",
      "Black Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Bottle%20Boot.PNG-YRZx6DnupvVdYqkFvTzb0QnOQuhTyA.jpeg",
      "Black Jubol Jug Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black%20Jubol%20Jug%20Boot.png-DivHJAZP43lVMeh2TFlgiYYm72kmpf.jpeg",
      "LightBlue Jubol Silicone Full Body Boot for Stanley Cup 40 oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightBlue%20Jubol%20Silicone%20Full%20Body%20Boot%20for%20Stanley%20Cup%2040%20oz.png-IwmjJtk6TNs1bpuhi5pmqImvxRnyUk.jpeg",
      "LightPink Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightPink%20Jubol%20Bottle%20Boot.PNG-lOHMzgZSSAxgJIyHSu3FQDjQHdv5mq.jpeg",
      "Jubol Replacement Brush Head":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jubol%20Replacement%20Brush%20Head.png-Cjmjr2J5tx3paHGSa5Zv1tBSqKozON.webp",
      "Large Jubol Stainless Steel Chopping Board":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Large%20Jubol%20Stainless%20Steel%20Chopping%20Board.PNG-k9nw3OggetNx1vlvZtM7oJZLkUwcFp.jpeg",
      "Lemon Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lemon%20Jubol%20Bottle%20Boot.PNG-PGGJsvlseEuqO3BF1BuR8zeJPklWq9.jpeg",
      "LightGreen Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightGreen%20Jubol%20Bottle%20Boot.PNG-1AXCvbI6IegPRTrH1fCUXKhfzxiozA.jpeg",
      "LightPink Jubol 3qtr Quencher Boot With Handle":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightPink%20Jubol%203qtr%20Quencher%20Boot%20With%20Handle.PNG-31hBCIHZ7PmuJ3dHMOFoyZhHOR938L.jpeg",
      "Jubol 4pcs Fruit Storage Box":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jubol%204pcs%20Fruit%20Storage%20Box.PNG-u5RSRYkA2Pi8KN9qYZuCEWEPKJnyii.jpeg",
      "Jubol Glass Straw":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jubol%20Glass%20Straw.png-LnblhlJPfyyOWGBquQjF1GuVUpxher.jpeg",
      "Jubol Glass Straws and Extra":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Jubol%20Glass%20Straws%20and%20Extra.PNG-svWgf7PbstIMKQGKfwJzPPjpcmnIB7.jpeg",
      "LightPink Jubol Silicone Full Body Boot for Stanley Cup 40 oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightPink%20Jubol%20Silicone%20Full%20Body%20Boot%20for%20Stanley%20Cup%2040%20oz.png-cBRLNMvzSJJYm6SXv8kZDfp0vEoH8C.jpeg",
      "Lilac Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lilac%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-m5uoEyeiqmVpJbfKHp5VyUY1WqILaK.jpeg",
      "MultiGreen Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MultiGreen%20Jubol%20Executive%20Lunch%20Bag.png-6xJKdEV0lpwrPMPr1Tw6L23kgSgNzE.jpeg",
      "LightPink Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightPink%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-yUlJNTBr70lB1XnEjBUuVvvKrSEbT6.jpeg",
      "Lilac Jubol 3qtr Quencher Boot With Handle":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Lilac%20Jubol%203qtr%20Quencher%20Boot%20With%20Handle.PNG-B9mtWVFh7aCjLBIO5DPxko3dWXkhCU.jpeg",
      "NavyBlue Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NavyBlue%20Jubol%20Bottle%20Boot.PNG-5QZC8TWGqxH7Ta5Lxhbc4KExd1dOHX.jpeg",
      "LightPurple Jubol Silicone Full Body Boot for Stanley Cup 40 oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightPurple%20Jubol%20Silicone%20Full%20Body%20Boot%20for%20Stanley%20Cup%2040%20oz.png-ckeumBQGdPPIgjYK4ALnCeP8i81wtn.jpeg",
      "MultiYellow Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MultiYellow%20Jubol%20Executive%20Lunch%20Bag.png-MUoX9qr5g5T6h0Q95dQQ8upiuwavUR.jpeg",
      "Yellow Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-kE49wS75XUublUOjtYziurYOxItFnR.jpeg",
      "White Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/White%20Jubol%20Bottle%20Boot.png-2vCjLrBZP5XLRou28LncfdIlsEvH4k.jpeg",
      "Yellow Jubol Silicone Ice Tray":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Jubol%20Silicone%20Ice%20Tray.PNG-PWoImZP7S0NAaZcBIbn2ZYkFxMcFXR.jpeg",
      "Wine Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wine%20Jubol%20Executive%20Lunch%20Bag.png-KxfQ3qsN24zCmWtboRmmu30jx7XDWs.jpeg",
      "White Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/White%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-LohaTF1fRk32vwLJPnE2wIAr1wDom2.jpeg",
      "Teal Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teal%20Jubol%20Executive%20Lunch%20Bag.png-Tr4MDh5xhPPCbAXxchf1cfj20eE07i.jpeg",
      "Yellow Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yellow%20Jubol%20Bottle%20Boot.PNG-kmHKVMNY57n04nluyev2QDrB4PyKMC.jpeg",
      "LightPink Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LightPink%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-AOKP0VnsH4ZPR92Pz9QV2zmmKwx5kF.jpeg",
      "Nude Jubol 3qtr Quencher Boot With Handle":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nude%20Jubol%203qtr%20Quencher%20Boot%20With%20Handle.PNG-0PpzfOqJ9lt15U8Xxk6dLtLXpBt7rz.jpeg",
      "Pink Jubol Jug Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Jug%20Boot.png-Rc26WiR2fUNhpak7opASRXjOLLUptp.jpeg",
      "Orange Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Orange%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-2m9wRVaGeCLNvOrgAAFEXEjrlbvax4.jpeg",
      "Orange Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Orange%20Jubol%20Bottle%20Boot.PNG-f99aZ8xwUraMgMRAMF0QhjzIueaGPo.jpeg",
      "Peach Jubol Silicone Snack Bowl for Stanley 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Peach%20Jubol%20Silicone%20Snack%20Bowl%20for%20Stanley%2040oz.png-QapjECxMCFmOpkX7jXmjPOmuRNr0BX.jpeg",
      "Pink Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-Ce12Xp8JbyODFI1JIn5WP056prZzJD.jpeg",
      "Pink Jubol Executive Lunch Bag":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Executive%20Lunch%20Bag.png-9JrIAp1pGDS2kBAqN0zQtr3eT1OuuX.jpeg",
      "Orange Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Orange%20Jubol%20Silicone%20Bottle%20Carrier.PNG-r4pzQrZwVZbZtNhn9Z2cR5FDoFoojv.png",
      "Purple Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Purple%20Jubol%20Silicone%20Bottle%20Carrier.PNG-zzLz0QNv16hU7KJBdirQXbFOsVaZZr.png",
      "Red Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Red%20Jubol%20Bottle%20Boot.PNG-tAONwOucFmcXiP2Vpin8gM5tOJS8xi.jpeg",
      "Purple Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Purple%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-FdSoqjotmGwqqWPcm0gfSua6Q1rKUw.jpeg",
      "Pink Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Silicone%20Bottle%20Carrier.PNG-izHS1yYTKt3bzm8gSwBcImheeVrFgZ.png",
      "Pink Jubol Silicone Ice Tray":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Silicone%20Ice%20Tray.PNG-PBXBSmEqmxjzncwhwXBYxHJYTAYnrw.jpeg",
      "Purple Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Purple%20Jubol%20Bottle%20Boot.PNG-tfHcTNYRvo8bE54eZaQ8f22l9iQyMc.jpeg",
      "Red Jubol Mini Boot For Aerolight Mug":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Red%20Jubol%20Mini%20Boot%20For%20Aerolight%20Mug.PNG-ZDUjen7Ic6bmO4axoC2VQFqFhG07Kj.jpeg",
      "Pink Jubol Silicone Half Boot for Stanley Cup 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Silicone%20Half%20Boot%20for%20Stanley%20Cup%2040oz.png-rWiuP5LV6M12BwYl3kh2nk4DMe6SZN.jpeg",
      "Pink Jubol Silicone Snack Bowl for Stanley 40oz":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pink%20Jubol%20Silicone%20Snack%20Bowl%20for%20Stanley%2040oz.png-mIDb2ActQVypJHKoZr99UQXKba09xG.jpeg",
      "Small Jubol Stainless Steel Chopping Board":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Small%20Jubol%20Stainless%20Steel%20Chopping%20Board.PNG-0bGpUR75GKqi1OlwtwOMFDgjY9rowe.jpeg",
      "RosePink Jubol Cool Blast Fan":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RosePink%20Jubol%20Cool%20Blast%20Fan.png-9tTnthaYD6Tl4oAk8b65C03CDRZzXu.jpeg",
      "Shale Jubol Silicone Bottle Carrier":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Shale%20Jubol%20Silicone%20Bottle%20Carrier.PNG-hQxNrqINqQhU0xJn4eFsG91IWOaMqP.png",
      "Teal Jubol Bottle Boot":
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Teal%20Jubol%20Bottle%20Boot.PNG-LBioWbwg1u30YoX3qtTZdeSKm8ZhOD.jpeg",
    }

    // Check if product name matches any of our specific images
    const specificImage = productImageMap[product.name]
    if (specificImage) {
      return specificImage
    }

    // Fallback to placeholder for products without specific images
    const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]/g, "-")
    return `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white border-2 border-transparent hover:border-jubol-pink/20">
      <Link href={productDetailUrl} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={getProductImage() || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-jubol-pink text-white font-semibold">Featured</Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <Button
        variant="ghost"
        size="sm"
        className={`absolute top-3 right-3 h-8 w-8 p-0 bg-white/90 backdrop-blur-sm hover:bg-white z-10 ${
          isLiked ? "text-red-500" : "text-gray-600"
        }`}
        onClick={() => setIsLiked(!isLiked)}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
      </Button>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <Link href={productDetailUrl} className="block">
            <h3 className="font-semibold text-lg leading-tight text-gray-900 group-hover:text-jubol-blue transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xl font-bold text-jubol-blue">{formatPrice(product.price)}</div>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            size="sm"
            className="gap-2 bg-jubol-pink hover:bg-jubol-pink/90 text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
