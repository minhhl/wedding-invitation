'use client'

import { motion, type Variants } from 'framer-motion'

interface StoryChapter {
  number: string
  title: string
  body: string
}

// Generic, editable narrative — replace with the couple's real story.
const chapters: StoryChapter[] = [
  {
    number: '01',
    title: 'Khởi Đầu',
    body: 'Một ngày rất đỗi bình thường bỗng trở nên đáng nhớ, khi hai con người tình cờ có mặt trong cùng một khoảnh khắc.',
  },
  {
    number: '02',
    title: 'Hành Trình',
    body: 'Từ những điều giản dị nhất, tình yêu lớn lên qua từng ngày sẻ chia, thấu hiểu và đồng hành.',
  },
  {
    number: '03',
    title: 'Lời Hứa',
    body: 'Một lời hứa cho tương lai — quyết định nắm tay nhau đi qua mọi buồn vui của cuộc đời.',
  },
  {
    number: '04',
    title: 'Ngày Cưới',
    body: 'Và hôm nay, câu chuyện của chúng tôi bước sang một chương mới, với sự chứng kiến và chúc phúc của những người thân yêu.',
  },
]

export function WeddingStory() {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative py-24 md:py-32 bg-wedding-ivory overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-wedding-champagne/10 rounded-full translate-x-1/2 blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-24"
        >
          <p className="subtle-text mb-4">Câu Chuyện Tình Yêu</p>
          <h2 className="heading-2 text-wedding-brown">Chuyện Của Chúng Tôi</h2>
        </motion.div>

        <ol className="space-y-16 md:space-y-24">
          {chapters.map((chapter) => (
            <motion.li
              key={chapter.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 items-start"
            >
              <span className="font-playfair text-4xl md:text-5xl text-wedding-champagne leading-none pt-1">
                {chapter.number}
              </span>
              <div>
                <h3 className="heading-4 text-wedding-brown mb-3">{chapter.title}</h3>
                <p className="text-wedding-brown/70 font-cormorant text-lg md:text-xl italic leading-relaxed">
                  {chapter.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
