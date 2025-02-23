import FormContainer from '@/components/FormContainer';
import Pagination from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import prisma from '@/lib/prisma';
import { getCurrentUserId, getRole } from '@/lib/utils';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Class, Prisma, Teacher } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type ClassList = Class & { supervisor: Teacher };

const ClassListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
    const role = await getRole();
    const currentUserId = await getCurrentUserId();

    const columns = [
        {
            header: 'Class Name',
            accessor: 'name',
        },
        {
            header: 'Capacity',
            accessor: 'capacity',
            className: 'hidden md:table-cell',
        },
        {
            header: 'Grade',
            accessor: 'grade',
            className: 'hidden md:table-cell',
        },
        {
            header: 'Supervisor',
            accessor: 'supervisor',
            className: 'hidden md:table-cell',
        },
        ...(role === 'admin' || role === 'teacher'
            ? [
                  {
                      header: 'Action',
                      accessor: 'action',
                  },
              ]
            : []),
    ];

    const renderRow = (item: ClassList) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-100">
            <td className="flex items-center gap-4 p-4">{item.name}</td>
            <td className="hidden md:table-cell">{item.capacity}</td>
            <td className="hidden md:table-cell">{item.gradeId}</td>
            <td className="hidden md:table-cell">{item.supervisor.name + ' ' + item.supervisor.surname}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === 'admin' && (
                        <>
                            <FormContainer table="class" type="update" data={item} />
                            <FormContainer table="class" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case 'supervisorId':
                        query.supervisorId = value;
                        break;
                    case 'search':
                        query.name = { contains: value, mode: 'insensitive' };
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                supervisor: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.class.count({ where: query }),
    ]);
    return (
        <div className="bg-white p-4 m-4 mt-0 rounded-md flex-1">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === 'admin' && <FormContainer table="class" type="create" />}
                    </div>
                </div>
            </div>
            {/* LIST */}
            <Table columns={columns} renderRow={renderRow} data={data} />
            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    );
};

export default ClassListPage;
