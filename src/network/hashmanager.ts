import mqtt from "mqtt"
import { Metadata } from "../database"

// requests hash with the given filter from the hashmanager
export function request_cid(key: string, limit: number, arg1: string, arg2: string | null): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect("ws://localhost:1884")

        let request_data

        if (arg2 == null) request_data = `${key}/${arg1}`
        else request_data = `${key}/${arg1}/${arg2}`

        client.on("connect", () => {
            console.log("connected to mqtt broker")

            client.subscribe("rne/hashmanager/client/filtered_hash", e => {
                if (e) {
                    console.log("reject")
                    reject(e)
                }
            })

            client.publish("rne/client/hashmanager/retrieve_with_filter", `${request_data}/${limit}`) // TODO remove hardcoding
        })

        client.on("message", (topic, message) => {
            if (topic == "rne/hashmanager/client/filtered_hash") {
                const hashes = message.toString().split("/")
                resolve(hashes)
                client.end()
            }
        })
    })
}

export function request_metadata(hash: string): Promise<Metadata> {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect("ws://localhost:1884")

        client.on("connect", () => {
            console.log("connected to mqtt broker")

            client.subscribe("rne/hashmanager/client/hash_metadata", e => {
                if (e) {
                    console.log("reject")
                    reject(e)
                }
            })

            client.publish("rne/client/hashmanager/retrieve_metadata", `${hash}`) // TODO remove hardcoding
        })

        client.on("message", (topic, message) => {
            if (topic == "rne/hashmanager/client/hash_metadata") {
                const split_metadata = message.toString().split("/")
                resolve(new Metadata(hash, split_metadata[0], split_metadata[1], split_metadata[2]))
                client.end()
            }
        })
    })
}