"use client";

import styles from "./event-image-form.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, IconButton, InputLabel, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks.ts";
import { enqueueSnackbar } from "notistack";
import { createEventImage, uploadEventImage } from "@/redux/feature/event/event.action";
import { FileUpload, MultiFileUpload } from "mui-file-upload";
import CloseIcon from "@mui/icons-material/Close";
import { createEventImageSchema, CreateEventImageSchemaType } from "@/schemas/event-image-create";

const MAX_FILES = 1;
interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    event_uuid: string
}

export default function EventImageFormModalComp({ isOpen, onClose, event_uuid }: EventFormModalProps) {
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CreateEventImageSchemaType>({
        resolver: zodResolver(createEventImageSchema),
    })

    const uploadService = async (
        file: File,
        onProgress: (progress: number) => void
    ): Promise<string> => {
        return new Promise((resolve) => {
            let progress = 0;

            const interval = setInterval(() => {
                progress += 30;
                onProgress(progress);

                if (progress >= 100) {
                    clearInterval(interval);
                    resolve("ok");
                }
            }, 150);
        });
    };

    const onSubmit = async (data: CreateEventImageSchemaType) => {
        try {
            let images: any[] = [];

            if (files.length > MAX_FILES) {
                enqueueSnackbar(`You can only upload up to ${MAX_FILES} images`, { variant: "warning" });
                return;
            }

            if (files.length > 0) {
                const image_urls = await dispatch(uploadEventImage(files)).unwrap();

                images = image_urls.image_urls.map((img: any) => ({
                    image_url: img.path,
                }));
            }

            await dispatch(createEventImage({ ...data, event_uuid: event_uuid, image_url: images[0].image_url })).unwrap();
            reset();
            setFiles([]);
            onClose();
        } catch (error) {
            enqueueSnackbar(String(error || "Something wrong"), { variant: "error" });
            console.log(error)
        }
    }

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box className={styles.modalContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor={`tag-input`} className={styles.label}>Tag Name</InputLabel>

                        <TextField
                            id={`tag-input`}
                            type="description"
                            placeholder="wedding"
                            fullWidth
                            {...register("tag_name")}
                            variant="standard"
                        />
                        {errors.tag_name && (
                            <span className={styles.error}>
                                {errors.tag_name.message}
                            </span>
                        )}
                    </Box>

                    <MultiFileUpload
                        uploadService={uploadService}
                        acceptsOnly="image/*"
                        onSuccessfulUpload={(fileUpload: FileUpload<string>) => {
                            setFiles((prev) => {
                                if (prev.length >= MAX_FILES) {
                                    enqueueSnackbar(`You can't upload more than ${MAX_FILES} images`, { variant: "warning" });
                                    return prev;
                                }
                                const exists = prev.some(f => f.name === fileUpload.file.name);

                                if (exists) return prev;

                                return [...prev, fileUpload.file];
                            });
                        }}
                    />

                    <Box className={styles.fileList}>
                        {files.map((file, i) => (
                            <Box key={i} className={styles.fileItem}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                                    className={styles.fileItem}
                                />
                                <IconButton size="small" onClick={() => removeFile(i)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>

                    <Button
                        type="submit"
                        className={styles.button}
                    >
                        Upload Event Image
                    </Button>
                </form>

            </Box>
        </Modal>
    );
}