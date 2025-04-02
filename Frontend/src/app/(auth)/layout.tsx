export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-gray-900 min-h-screen'>
			<main>{children}</main>
		</div>
	);
}
