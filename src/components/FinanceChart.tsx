'use client';
import Constants from '@/lib/constants';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2800, expense: 2000 },
    { name: 'Apr', income: 3500, expense: 1500 },
    { name: 'May', income: 4200, expense: 2100 },
    { name: 'Jun', income: 3700, expense: 1800 },
    { name: 'Jul', income: 4500, expense: 2500 },
    { name: 'Aug', income: 3200, expense: 1700 },
    { name: 'Sep', income: 3900, expense: 2200 },
    { name: 'Oct', income: 3100, expense: 1600 },
    { name: 'Nov', income: 4800, expense: 2400 },
    { name: 'Dec', income: 5000, expense: 2600 },
];

const FinanceChart = () => {
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Finance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tick={{ fill: '#d1d5db' }}
                        tickLine={false}
                        tickMargin={10}
                    />
                    <YAxis axisLine={false} tick={{ fill: '#d1d5db' }} tickLine={false} tickMargin={20} />
                    <Tooltip />
                    <Legend
                        align="center"
                        verticalAlign="top"
                        wrapperStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
                    />
                    <Line type="monotone" dataKey="income" stroke={Constants.COLOR.schoolSky} strokeWidth={4} />
                    <Line type="monotone" dataKey="expense" stroke={Constants.COLOR.schoolPurple} strokeWidth={4} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FinanceChart;
