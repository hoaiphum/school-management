import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await currentUser();
    const role = user?.publicMetadata.role as string;
    return (
        <div className="h-screen flex">
            {/* LEFT */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
                <Link href={`/${role}`} className="flex items-center justify-center lg:justify-start gap-2">
                    <Image src="/logo.png" alt="" width={32} height={32} />
                    <span className="hidden lg:block font-bold">NocNoc School</span>
                </Link>
                <Menu />
            </div>

            {/* RIGHT */}
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
