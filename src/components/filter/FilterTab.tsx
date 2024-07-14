import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { request_cid, request_metadata } from "../../network/hashmanager";
import { download_from_ipfs } from "../../network/ipfs";
import DateFilterInput from "./DateFilterInput";
import TextFilterInput from "./TextFilterInput";
import styles from "../../styles/FilterTab.module.css"
import { Metadata } from "../../database";
import { ImagesContext } from "../Home";

const filterByDate = async (setImages: (images: (string|Metadata)[][]) => void, startDate: string, endDate: string) => {
    let images_map = []
    const hashes = await request_cid("date", 4, startDate, endDate)
    
    for (let hash of hashes) {
        const base64_image_url = `data:image/png;base64,${ await download_from_ipfs(hash) }`
        const metadata = await request_metadata(hash)
    
        images_map.push([base64_image_url, metadata])
    }
    
    setImages(images_map)
}

const filterByText = async (setImages: (images: (string|Metadata)[][]) => void, key: string, value: string) => {
    let images_map = []
    const hashes = await request_cid(key, 4, value, null)
    
    for (let hash of hashes) {
        const base64_image_url = `data:image/png;base64,${ await download_from_ipfs(hash) }`
        const metadata = await request_metadata(hash)
    
        images_map.push([base64_image_url, metadata])
    }

    setImages(images_map)
}

export default function FilterTab() {
    const context = useContext(ImagesContext)

    const [activeTabIndex, setActiveTabIndex] = useState(0)

    return (
        <>
            <Box>
                <Tabs value={activeTabIndex} onChange={(e, newIndex) => setActiveTabIndex(newIndex)} aria-label="basic tabs example">
                    <Tab label="Date" id="filterkey-tab-0" aria-controls="filterkey-tabpanel-0" />
                    <Tab label="Action" id="filterkey-tab-1" aria-controls="filterkey-tabpanel-1" />
                    <Tab label="Status" id="filterkey-tab-2" aria-controls="filterkey-tabpanel-2" />
                </Tabs>
            </Box>
            <div hidden={activeTabIndex !== 0} className={styles.tab_panel}>
                <DateFilterInput handleInput={(sd, ed) => filterByDate(context.setImages, sd, ed)} />
            </div>
            <div hidden={activeTabIndex !== 1} className={styles.tab_panel}>
                <TextFilterInput placeholder="action" handleInput={value => filterByText(context.setImages, "action", value)} />
            </div>
            <div hidden={activeTabIndex !== 2} className={styles.tab_panel}>
                <TextFilterInput placeholder="status" handleInput={value => filterByText(context.setImages, "status", value)} />
            </div>
        </>
    )
}