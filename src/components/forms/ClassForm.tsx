'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';

const schema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: 'Subject name is required!' }),
    capacity: z.coerce.number().min(1, { message: 'Capacity name is required!' }),
    gradeId: z.coerce.number().min(1, { message: 'Grade name is required!' }),
    supervisorId: z.coerce.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({ type, data }: { type: 'create' | 'update'; data?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {});
    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">{type === 'create' ? 'Create a new class' : 'Update the class'}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Class name"
                    name="name"
                    defaultValue={data?.name}
                    register={register}
                    error={errors?.name}
                />
                <InputField
                    label="Capacity"
                    name="capacity"
                    defaultValue={data?.capacity}
                    register={register}
                    error={errors?.capacity}
                />

                {data && (
                    <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} />
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Supervisor</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register('supervisorId')}
                        defaultValue={data?.teachers}
                    >
                        {/* {teachers.map((teacher: { id: string; name: string; surname: string }) => (
                            <option
                                value={teacher.id}
                                key={teacher.id}
                                selected={data && teacher.id === data.supervisorId}
                            >
                                {teacher.name + ' ' + teacher.surname}
                            </option>
                        ))} */}
                    </select>
                    {errors.supervisorId?.message && (
                        <p className="text-xs text-red-400">{errors.supervisorId.message.toString()}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Grade</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register('gradeId')}
                        defaultValue={data?.gradeId}
                    >
                        {/* {grades.map((grade: { id: number; level: number }) => (
                            <option value={grade.id} key={grade.id} selected={data && grade.id === data.gradeId}>
                                {grade.level}
                            </option>
                        ))} */}
                    </select>
                    {errors.gradeId?.message && (
                        <p className="text-xs text-red-400">{errors.gradeId.message.toString()}</p>
                    )}
                </div>
            </div>
            {/* {state.error && <span className="text-red-500">Something went wrong!</span>} */}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    );
};

export default ClassForm;
