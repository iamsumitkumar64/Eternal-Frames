import { Box } from "@mui/material";
import styles from './layout.module.css';
import GallerySideBarComp from "@/component/gallery-sidebar/gallery-sidebar";

export default function GalleryAuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <Box className={styles.container}>
            <Box className={styles.leftContainer}>
                <GallerySideBarComp />
            </Box>

            <Box className={styles.rightContainer}>
                {children}
            </Box>
        </Box>
    );
}
