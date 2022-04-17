
// 将读取的二进制图片，转为base64 URl可直接赋值给src
export const blobToDataURL = (blob, callback) => {
    const reader = new FileReader()
    reader.onload = (event) => {
        // console.log('event', event)
        let base64Url = event.target.result
        // const base64Url = event.currentTarget.result
        // const base64Url = event.srcElement.result
        callback(base64Url)
    }
    reader.readAsDataURL(blob)
}
