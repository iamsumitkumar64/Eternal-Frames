import { Box, Button, Dialog, Divider, Typography } from '@mui/material';
import styles from './link-share-comp.module.css';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    XShareButton,
    XIcon,
} from 'react-share';
import QRCode from "react-qr-code";
import { useCallback, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

type ImageFormat = 'png' | 'jpeg' | 'svg';
interface Props {
    open: boolean;
    onClose: () => void;
    data: { shareUrl: string, title: string }
}

export default function LinkShareComp({ open, onClose, data }: Props) {
    const shareUrl = data.shareUrl;
    const title = data.title;
    const iconSize = 45;
    const qrRef = useRef<HTMLDivElement>(null);

    const handlePick = () => {
        onClose();
    }

    const handleExport = useCallback(async (format: ImageFormat) => {
        if (!qrRef.current) return;

        const element = qrRef.current;
        let dataUrl = '';

        try {
            if (format === 'png') {
                dataUrl = await htmlToImage.toPng(element);
            } else if (format === 'jpeg') {
                dataUrl = await htmlToImage.toJpeg(element, { quality: 0.95 });
            } else if (format === 'svg') {
                dataUrl = await htmlToImage.toSvg(element);
            } else { return; }

            const link = document.createElement('a');
            link.download = `exported-page.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to generate image:', error);
        }
    }, [qrRef]);

    return (
        <Dialog open={open} onClose={onClose} className={styles.container}>
            <Box className={styles.header}>
                <Typography variant="h4" className={styles.heading}>
                    Share With Friends
                </Typography>

                <Typography className={styles.subHeading}>
                    Social links
                </Typography>
            </Box>

            <Box className={styles.socialWrapper}>
                {/* Facebook */}
                <FacebookShareButton url={shareUrl} onClick={handlePick} className={styles.socialButton}>
                    <FacebookIcon size={iconSize} round={true} />
                </FacebookShareButton>

                {/* X / Twitter */}
                <TwitterShareButton url={shareUrl} title={title} onClick={handlePick} className={styles.socialButton}>
                    <TwitterIcon size={iconSize} round={true} />
                </TwitterShareButton>

                {/* LinkedIn */}
                <LinkedinShareButton url={shareUrl} title={title} onClick={handlePick} className={styles.socialButton}>
                    <LinkedinIcon size={iconSize} round={true} />
                </LinkedinShareButton>

                {/* WhatsApp */}
                <WhatsappShareButton url={shareUrl} title={title} separator=":: " onClick={handlePick} className={styles.socialButton}>
                    <WhatsappIcon size={iconSize} round={true} />
                </WhatsappShareButton>

                {/* X */}
                <XShareButton url={shareUrl} title={title} onClick={handlePick} className={styles.socialButton}>
                    <XIcon size={iconSize} round />
                </XShareButton>
            </Box>

            <Divider className={styles.divider}> OR </Divider>

            <Box className={styles.QrCodeWrapper}>
                <Box className={styles.QrCodeBox} ref={qrRef}>
                    <QRCode
                        size={200}
                        value={shareUrl}
                        viewBox={`0 0 256 256`}
                        className={styles.QrCode}
                    />

                    <Typography className={styles.boxTitle}>{title}</Typography>
                </Box>

                <Box className={styles.QrCodeButtonBox}>
                    <Button onClick={() => handleExport('png')} className={styles.qrButton}>
                        PNG
                    </Button>

                    <Button onClick={() => handleExport('jpeg')} className={styles.qrButton}>
                        Jpeg
                    </Button>

                    <Button onClick={() => handleExport('svg')} className={styles.qrButton}>
                        SVG
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};
