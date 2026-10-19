// Sample identity, copy, and rates: replace these before publishing.
export const profile = {
  name: "Alex Morgan",
  email: "hello@example.com",
  location: "Portland, Oregon",
  introduction:
    "I’m Alex, a photographer drawn to open landscapes, honest portraits, and the small things we tend to pass by.",
  about:
    "My approach is simple: slow down, pay attention, and leave room for the unexpected. Whether I’m walking a coastline or making a portrait, I’m looking for something that feels like being there.",
}

export const categories = ["All work", "Places", "People", "Everyday"] as const
export type Category = (typeof categories)[number]
export const photographs = [
  {
    id: "coast",
    title: "Where the land ends",
    category: "Places",
    location: "The coast",
    src: "/images/coast.jpg",
    alt: "Gentle waves washing onto a sandy beach at sunset",
    year: "2025",
    shape: "landscape",
  },
  {
    id: "portrait",
    title: "In a quiet moment",
    category: "People",
    location: "Portrait study",
    src: "/images/portrait.jpg",
    alt: "A close portrait of a woman in soft blue and violet light",
    year: "2025",
    shape: "portrait",
  },
  {
    id: "forest",
    title: "A little further in",
    category: "Places",
    location: "The forest",
    src: "/images/forest.jpg",
    alt: "Sunlight filtering through a dense green forest",
    year: "2024",
    shape: "portrait",
  },
  {
    id: "architecture",
    title: "Lines of the city",
    category: "Everyday",
    location: "Architecture study",
    src: "/images/architecture.jpg",
    alt: "Glass office buildings rising into a cloudy sky, photographed from below",
    year: "2025",
    shape: "landscape",
  },
  {
    id: "hills",
    title: "Before the world wakes",
    category: "Places",
    location: "Morning light",
    src: "/images/hills.jpg",
    alt: "Low mist moving across green hills at sunrise",
    year: "2024",
    shape: "landscape",
  },
  {
    id: "field",
    title: "Nothing in a hurry",
    category: "Everyday",
    location: "On the road",
    src: "/images/field.jpg",
    alt: "An open road winding between red desert rocks toward distant mountains",
    year: "2025",
    shape: "portrait",
  },
] as const
export type Photograph = (typeof photographs)[number]

export const sessions = [
  {
    number: "01",
    name: "Portraits",
    description: "A little time to be yourself.",
    price: "$350",
    details: [
      "Up to 1 hour together",
      "One location, natural light",
      "20 edited photographs",
      "Private online gallery",
    ],
  },
  {
    number: "02",
    name: "Stories",
    description: "For the moments that unfold.",
    price: "$750",
    details: [
      "Up to 3 hours of coverage",
      "Couples, families & small gatherings",
      "60 edited photographs",
      "Private online gallery",
    ],
  },
  {
    number: "03",
    name: "Collaborations",
    description: "Thoughtful images for your vision.",
    price: "Let’s talk",
    details: [
      "Editorial & brand commissions",
      "A plan shaped around your project",
      "Usage & deliverables agreed together",
      "A personal, considered approach",
    ],
  },
]

export function enquiry(subject = "Photography enquiry") {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`
}
