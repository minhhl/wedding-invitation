// Curated wedding-appropriate stock photography (Unsplash).
// Replace with the couple's real photos when available.

const unsplash = (id: string, params: string) =>
  `https://images.unsplash.com/photo-${id}?${params}`

export const coverImage = unsplash(
  '1519741497674-611481863552',
  'w=1600&q=80&fit=crop'
)

export const heroImage = unsplash(
  '1546032996-6dfacbacbf3f',
  'w=2000&q=80&fit=crop'
)

export const ogImage = unsplash(
  '1546032996-6dfacbacbf3f',
  'w=1200&h=630&q=80&fit=crop'
)

export interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: unsplash('1546032996-6dfacbacbf3f', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Cô dâu chú rể ôm nhau dưới voan cưới lúc hoàng hôn',
    title: 'Khoảnh Khắc Vàng',
  },
  {
    id: 2,
    src: unsplash('1519741497674-611481863552', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Bó hoa cưới trong ánh nắng chiều',
    title: 'Bó Hoa Cưới',
  },
  {
    id: 3,
    src: unsplash('1583939003579-730e3918a45a', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Nụ hôn cô dâu chú rể giữa rừng hoa giấy tung bay',
    title: 'Nụ Hôn Ngọt Ngào',
  },
  {
    id: 4,
    src: unsplash('1465495976277-4387d4b0b4c6', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Tay cô dâu chú rể đeo nhẫn cưới trên bó hoa',
    title: 'Lời Thề Nguyện',
  },
  {
    id: 5,
    src: unsplash('1520854221256-17451cc331bf', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Cô dâu chú rể nắm tay nhau',
    title: 'Nắm Tay Nhau',
  },
  {
    id: 6,
    src: unsplash('1550005809-91ad75fb315f', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Cô dâu chú rể ôm nhau cùng bó hoa cưới',
    title: 'Yêu Thương',
  },
  {
    id: 7,
    src: unsplash('1519167758481-83f550bb49b3', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Sảnh tiệc cưới sang trọng ánh vàng champagne',
    title: 'Đại Tiệc Sang Trọng',
  },
  {
    id: 8,
    src: unsplash('1522673607200-164d1b6ce486', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Ghế cô dâu chú rể trang trí hoa bên hồ nước',
    title: 'Góc Nhỏ Bình Yên',
  },
  {
    id: 9,
    src: unsplash('1515934751635-c81c6bc9a2d8', 'w=900&h=1100&fit=crop&q=80'),
    alt: 'Nhẫn cưới đặt trên hoa hồng',
    title: 'Nhẫn Cưới',
  },
]
