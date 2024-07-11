import ky from "ky"

export async function download_from_ipfs(hash: string): Promise<string> {
    const result = await ky.get(`${process.env.REACT_APP_IMAGE_SERVER}/get_image?hash=${hash}`, {
        timeout: 60 * 1000
    })
    return await result.text()
}