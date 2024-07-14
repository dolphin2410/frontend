import { Collapse, ListItemButton, ListItemText } from "@mui/material";
import FilterTab from "./filter/FilterTab";
import { createContext, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Metadata } from "../database";

type ImagesContextType = {
    images: (string|Metadata)[][],
    setImages: (images: (string|Metadata)[][]) => void
}

export const ImagesContext = createContext<ImagesContextType>({
    images: [],
    setImages: (images: (string|Metadata)[][]) => {}
})

export default function Home() {
    const [expand, setExpand] = useState(true)
    const [expandIm, setExpandIm] = useState(true)

    const [images, setImages] = useState<(string|Metadata)[][]>([])

    return (
        <ImagesContext.Provider value={{ images, setImages }}>
            <h1>Client</h1>
            <ListItemButton>
                <ListItemText onClick={() => expand ? setExpand(false) : setExpand(true)}>{expand ? <ExpandLess /> : <ExpandMore />} Filter</ListItemText>
            </ListItemButton>
            <Collapse in={expand}>
                <FilterTab />
            </Collapse>
            <ListItemButton>
                <ListItemText onClick={() => expandIm ? setExpandIm(false) : setExpandIm(true)}>{expandIm ? <ExpandLess /> : <ExpandMore />} IPFS Images</ListItemText>
            </ListItemButton>
            <Collapse in={expandIm}>
                {images.map((e, i) => {
                    return <img src={e[0] as string} key={i} /> 
                })}
            </Collapse>
        </ImagesContext.Provider>
    )
}