'use client';
import React, { useRef, useState } from 'react';
import s from './FooterComponent.module.scss'; // Adjust the path as necessary
import LazyImage from '../LazyImage';
import { PortableText } from '@portabletext/react';
import { portableBlockComponents } from '@/utils/portableText';
import Link from 'next/link';
import { motion } from 'framer-motion'

export default function FooterComponent({ data }: { data: any }) {
    const footerRef = useRef<HTMLElement>(null)

    return (
        <motion.footer
            className={`${s.footer}`}
            ref={footerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
        >
            <h4>Carlos Salvador's footer</h4>
        </motion.footer>
    )

}
