import AuthLayoutComp from "@/component/auth-layout/auth-layout";
import { Box } from "@mui/material";
import styles from './layout.module.css';

export default function CustomerAuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <Box className={styles.container}>
            <Box className={styles.leftContainer}>
                <AuthLayoutComp />
            </Box>

            <Box className={styles.rightContainer}>
                {children}
            </Box>
        </Box>
    );
}
