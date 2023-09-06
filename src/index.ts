const image_input = document.getElementById('image-input')
const width_input = document.getElementById('input-image-width')
const height_input = document.getElementById('input-image-height')
document.getElementById("form").onsubmit = formSubmitF
image_input.addEventListener('change', imageLoadF)

let width: number = 0
let height: number = 0
let result_url: string
let image_file: File = null

width_input.onchange = (event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    width = parseInt(target.value)
  }
  image_input.dispatchEvent(new Event('change'))
}
height_input.onchange = (event) => {
  const target = event.target as HTMLInputElement
  if (target.value) {
    height = parseInt(target.value)
  }
  image_input.dispatchEvent(new Event('change'))
}

function imageLoadF(event: Event) {
  const target: HTMLInputElement = event.target as HTMLInputElement
  if (!target.files[0]) return;
  image_file = target.files[0]
  const reader: FileReader = new FileReader()
  reader.readAsDataURL(image_file)
  reader.addEventListener('load', (event) => {
    let image_url = event.target.result
    let img: HTMLImageElement = document.createElement('img')
    img.src = image_url as string
    img.onload = (event) => {
      const target = event.target as HTMLImageElement
      const canvas = document.createElement('canvas')
      const ratio = width / target.width > 0 ? width / target.width : 1
      canvas.width = width > 0 ? width : target.width
      canvas.height = target.height * ratio

      console.log(width, target.width, width / target.width)

      const context = canvas.getContext('2d')
      context.drawImage(img, 0, 0, canvas.width, canvas.height)

      result_url = context.canvas.toDataURL('image/webp', 70)
    }
  })
  document.getElementById('img-name').innerText = image_file.name
}

async function formSubmitF(event: SubmitEvent) {
  event.preventDefault()
  if (!result_url || !image_file) return

  const download_link: HTMLAnchorElement = document.createElement('a')
  download_link.href = result_url
  download_link.setAttribute('download', '')
  download_link.click()
}
