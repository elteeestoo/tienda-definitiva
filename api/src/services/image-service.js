const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')

module.exports = class ImageService {
  uploadImage = async images => {
    const result = []

    for (const image of images.file) {
      try {
        const filename = image.originalname.replace(/[\s_]/g, '-')

        const newFilename = await fs.access(path.join(__dirname, `../storage/images/gallery/original/${path.parse(filename).name}.webp`)).then(async () => {
          // TODO Dar al usuario la opción de sobreescribir la imagen
          return `${path.parse(filename).name}-${new Date().getTime()}.webp`
        }).catch(async () => {
          return `${path.parse(filename).name}.webp`
        })

        await sharp(image.buffer)
          .webp({ lossless: true })
          .toFile(path.join(__dirname, `../storage/images/gallery/original/${newFilename}`))

        await sharp(image.buffer)
          .resize(135, 135)
          .webp({ quality: 80 })
          .toFile(path.join(__dirname, `../storage/images/gallery/thumbnail/${newFilename}`))

        result.push(newFilename)
      } catch (error) {
        console.log(error)
      }
    }

    return result
  }
}
