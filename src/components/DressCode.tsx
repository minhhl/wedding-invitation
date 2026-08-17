'use client'

import { motion, type Variants } from 'framer-motion'

interface DressCodeColor {
  name: string
  hex: string
  description: string
}

const dressCodeColors: DressCodeColor[] = [
  {
    name: 'Vàng Champagne',
    hex: '#B89A68',
    description: 'Sang trọng và lịch lãm',
  },
  {
    name: 'Ngà Voi',
    hex: '#F7F4EF',
    description: 'Tinh khôi và thanh lịch',
  },
  {
    name: 'Be Ấm',
    hex: '#EAE1D6',
    description: 'Nhẹ nhàng và mềm mại',
  },
  {
    name: 'Hồng Phấn',
    hex: '#D7999C',
    description: 'Lãng mạn và nữ tính',
  },
  {
    name: 'Nâu Trầm',
    hex: '#3D3024',
    description: 'Sang trọng và ổn định',
  },
  {
    name: 'Xanh Navy',
    hex: '#001F3F',
    description: 'Cổ điển và thanh nhã',
  },
]

export function DressCode() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="relative py-20 bg-wedding-beige/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-wedding-champagne/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subtle-text mb-4">Trang Phục</p>
          <h2 className="heading-2 text-wedding-brown mb-4">Bảng Màu Trang Phục</h2>
          <p className="text-wedding-brown/70 font-sans max-w-2xl mx-auto">
            Chúng tôi đề xuất các màu sắc thanh lịch để tạo nên một không gian hòa hợp và sang trọng
          </p>
        </motion.div>

        {/* Color grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {dressCodeColors.map((color, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ translateY: -10 }}
              className="text-center group cursor-pointer"
            >
              {/* Color box */}
              <motion.div
                className="relative h-32 md:h-40 rounded-lg shadow-md overflow-hidden mb-4 group-hover:shadow-xl transition-shadow duration-300 border-4 border-white/50"
                style={{ backgroundColor: color.hex }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
                />
              </motion.div>

              {/* Color info */}
              <h3 className="heading-4 text-wedding-brown mb-2">{color.name}</h3>
              <p className="text-wedding-brown/60 text-sm font-sans mb-2">
                {color.description}
              </p>
              <p className="text-wedding-gold text-xs font-sans tracking-widest uppercase font-semibold">
                {color.hex}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 p-8 paper-card text-center"
        >
          <p className="text-wedding-brown/70 font-sans text-sm">
            Các màu sắc trên chỉ là gợi ý. Bạn vui lòng chọn trang phục theo ý thích cá nhân miễn là thể hiện phong cách thanh lịch.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
