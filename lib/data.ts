export interface Destination {
  id: string;
  title: string;
  country: string;
  description: string;
  longDescription: string;
  priceRange: "Budget" | "Mid-Range" | "Luxury";
  duration: string;
  region: string;
  image: string;
  highlights: string[];
  bestTime: string;
}

export const destinations: Destination[] = [
  {
    id: "hunza-valley",
    title: "Hunza Valley",
    country: "Pakistan",
    description: "Snow-capped peaks, ancient forts, and the legendary Karakoram Highway.",
    longDescription:
      "Hunza Valley in Gilgit-Baltistan is Pakistan's crown jewel. Visit Baltit and Altit Forts, watch sunrise over Rakaposhi, walk through cherry blossom lanes in Karimabad, and drive the iconic Karakoram Highway — one of the world's most scenic roads.",
    priceRange: "Mid-Range",
    duration: "5–7 Days",
    region: "Gilgit-Baltistan",
    image: "https://unsplash.com/photos/a-lake-surrounded-by-mountains-k-x1ynWO_Io",
    highlights: [
      "Baltit & Altit Forts in Karimabad",
      "Attabad Lake boat ride",
      "Eagle's Nest viewpoint at sunset",
      "Passu Cones & Hussaini Suspension Bridge",
    ],
    bestTime: "April – October",
  },
  {
    id: "lahore",
    title: "Lahore",
    country: "Pakistan",
    description: "The heart of Punjab — Mughal architecture, food streets, and vibrant culture.",
    longDescription:
      "Lahore is Pakistan's cultural capital. Marvel at the Badshahi Mosque and Lahore Fort, stroll through the Walled City, feast on street food at Gawalmandi and Fort Road, and experience the grandeur of the Wagah Border ceremony.",
    priceRange: "Budget",
    duration: "3–4 Days",
    region: "Punjab",
    image: "https://unsplash.com/photos/a-large-white-and-red-building-surrounded-by-trees-qme-nmhIZA8",
    highlights: [
      "Badshahi Mosque & Lahore Fort (UNESCO)",
      "Food Street & traditional Lahori breakfast",
      "Shalimar Gardens & Minar-e-Pakistan",
      "Walled City & Wagah Border ceremony",
    ],
    bestTime: "October – March",
  },
  {
    id: "swat-valley",
    title: "Swat Valley",
    country: "Pakistan",
    description: "The Switzerland of Pakistan — lush green valleys, rivers, and Buddhist heritage.",
    longDescription:
      "Swat Valley in Khyber Pakhtunkhwa enchants with emerald meadows, the Swat River, and Malam Jabba ski resort. Explore Mingora and Saidu Sharif, visit the Buddhist archaeological sites at Butkara Stupa, and trek to Mahodand Lake.",
    priceRange: "Budget",
    duration: "4–5 Days",
    region: "KPK",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Malam Jabba ski resort & chairlift",
      "Mahodand Lake day trip",
      "Butkara Stupa Buddhist ruins",
      "Fizagat Park & Swat River boating",
    ],
    bestTime: "May – September",
  },
  {
    id: "skardu",
    title: "Skardu",
    country: "Pakistan",
    description: "Gateway to K2 — crystal lakes, cold deserts, and the mighty Karakoram.",
    longDescription:
      "Skardu is the adventure hub of Gilgit-Baltistan. Visit the surreal Katpana Cold Desert, boat on Upper Kachura (Shangrila) Lake, explore Shigar and Khaplu Forts, and use Skardu as your base for treks toward K2 and the Deosai Plains.",
    priceRange: "Mid-Range",
    duration: "5–6 Days",
    region: "Gilgit-Baltistan",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Shangrila Resort & Upper Kachura Lake",
      "Katpana Cold Desert at sunset",
      "Shigar Fort & Khaplu Palace",
      "Deosai National Park (Land of Giants)",
    ],
    bestTime: "June – September",
  },
  {
    id: "karachi",
    title: "Karachi",
    country: "Pakistan",
    description: "Pakistan's coastal metropolis — beaches, bazaars, and diverse cuisine.",
    longDescription:
      "Karachi is the city that never sleeps. Relax at Clifton and French Beach, explore the historic Mohatta Palace and Quaid-e-Azam Mausoleum, shop at Empress Market and Zainab Market, and taste the best seafood and street food in the country.",
    priceRange: "Budget",
    duration: "2–3 Days",
    region: "Sindh",
    image: "https://unsplash.com/photos/white-and-gray-concrete-buildings-during-daytime-24W9b5WZuS4",
    highlights: [
      "Clifton Beach & Port Grand waterfront",
      "Quaid-e-Azam Mausoleum",
      "Mohatta Palace Museum",
      "Boat trip to Churna Island for snorkeling",
    ],
    bestTime: "November – February",
  },
  {
    id: "fairy-meadows",
    title: "Fairy Meadows",
    country: "Pakistan",
    description: "Camp at the base of Nanga Parbat — the Killer Mountain's lush alpine meadow.",
    longDescription:
      "Fairy Meadows offers one of Pakistan's most unforgettable experiences. Jeep to Tato Village, hike through pine forests to the meadow, camp under the shadow of Nanga Parbat (8,126 m), and trek to Beyal Camp for breathtaking glacier views.",
    priceRange: "Mid-Range",
    duration: "3–4 Days",
    region: "Gilgit-Baltistan",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Jeep ride to Tato Village",
      "Trek through pine forests to the meadow",
      "Camp with Nanga Parbat views",
      "Beyal Camp glacier viewpoint hike",
    ],
    bestTime: "June – September",
  },
];

export const regions = ["All", "Gilgit-Baltistan", "Punjab", "KPK", "Sindh"];

export const testimonials = [
  { name: "Ayesha R.", role: "Lahore Explorer", quote: "WanderVista helped me plan the perfect Hunza trip. The travel assistant knew every highlight!" },
  { name: "Hassan K.", role: "Adventure Seeker", quote: "Fairy Meadows guide was spot-on. Best university project — looks like a real Pakistan travel site." },
  { name: "Fatima L.", role: "Family Traveler", quote: "Found Swat Valley on a budget thanks to the filters. Beautiful design and genuinely useful chatbot." },
];
