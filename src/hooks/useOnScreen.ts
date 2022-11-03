import { useEffect, useState} from "react";

export default function useOnScreen(ref: { current: HTMLElement | null; }) {

    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    );

    useEffect(() => {
        ref.current && observer.observe(ref.current);
        return () => { observer.disconnect(); };
    }, []);

    return isIntersecting;
}