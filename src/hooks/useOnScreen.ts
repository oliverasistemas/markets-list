import { useEffect, useState} from "react";

type UseOnScreenParams = { current: HTMLElement | null; };

export default function useOnScreen(ref: UseOnScreenParams) {

    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        );
        ref.current && observer.observe(ref.current);
        return () => { observer.disconnect(); };
    }, [ref]);

    return isIntersecting;
}
