'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';

const schema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: 'Title name is required!' }),
    startTime: z.coerce.date({ message: 'Start time is required!' }),
    endTime: z.coerce.date({ message: 'End time is required!' }),
    lessonId: z.coerce.number({ message: 'Lesson is required!' }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({ type, data }: { type: 'create' | 'update'; data?: any }) => {
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
            <h1 className="text-xl font-semibold">{type === 'create' ? 'Create a new exam' : 'Update the exam'}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Exam title"
                    name="title"
                    defaultValue={data?.title}
                    register={register}
                    error={errors?.title}
                />
                <InputField
                    label="Start Date"
                    name="startTime"
                    defaultValue={data?.startTime}
                    register={register}
                    error={errors?.startTime}
                    type="datetime-local"
                />
                <InputField
                    label="End Date"
                    name="endTime"
                    defaultValue={data?.endTime}
                    register={register}
                    error={errors?.endTime}
                    type="datetime-local"
                />

                {data && (
                    <InputField label="Id" name="id" defaultValue={data?.id} register={register} error={errors?.id} />
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Lesson</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register('lessonId')}
                        defaultValue={data?.teachers}
                    >
                        {/* {lessons.map((lesson: { id: number; name: string }) => (
                            <option value={lesson.id} key={lesson.id}>
                                {lesson.name}
                            </option>
                        ))} */}
                    </select>
                    {errors.lessonId?.message && (
                        <p className="text-xs text-red-400">{errors.lessonId.message.toString()}</p>
                    )}
                </div>
            </div>
            {/* {state.error && <span className="text-red-500">Something went wrong!</span>} */}
            <button className="bg-blue-400 text-white p-2 rounded-md">{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    );
};

export default ExamForm;
