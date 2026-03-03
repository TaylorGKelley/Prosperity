// 'use client';

// import React, { useEffect, useState } from 'react';

// export default function withPermission<P>(
// 	Component: React.ComponentType<P>,
// 	requiredPermissions: string[]
// ) {
// 	return function Wrapped(props: P) {
// 		const [allowed, setAllowed] = useState(false);

// 		useEffect(() => {
// 			const perms = JSON.parse(localStorage.getItem('permissions') || '[]');
// 			setAllowed(requiredPermissions.some((p) => perms.includes(p)));
// 		}, []);

// 		if (!allowed) return null;
// 		return <Component {...props} />;
// 	};
// }
