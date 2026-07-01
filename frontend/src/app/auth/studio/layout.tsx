import AuthLayoutComp from "@/component/auth-layout/auth-layout";
import { Box } from "@mui/material";
import styles from './layout.module.css';

export default function UserAuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <Box className={styles.container}>
            <Box className={styles.leftContainer}>
                <AuthLayoutComp bgImage="/auth-layout/screen2.png" description="The architecture of a moment, preserved forever." title="Eternal Frames" />
            </Box>

            <Box className={styles.rightContainer}>
                {children}
            </Box>
        </Box>
    );
}
