import { useEffect } from 'react';

function useLockBodyScroll(locked) {
    useEffect(() => {
        const original = document.body.style.overflow;
        document.body.style.overflow = locked ? 'hidden' : original;
        return () => {
            document.body.style.overflow = original;
        };
    }, [locked]);
}

export default useLockBodyScroll;
