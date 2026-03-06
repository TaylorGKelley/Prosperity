import { useEffect, useRef, useState } from 'react';

export default function useIsVisible<T extends HTMLElement>() {
	const visibleElRef = useRef<T | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsVisible(entry.isIntersecting);
		});

		if (visibleElRef.current) observer.observe(visibleElRef.current);

		return () => observer.disconnect();
	});

	return {
		isVisible,
		visibleElRef,
	};
}
