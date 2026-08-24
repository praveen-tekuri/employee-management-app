
interface DepartmentTypes{
    department: string;
    count: number;
    totalSalary: number;
    highestSalary: number;
}

interface DepartmentGrid{
    title: string;
    data: DepartmentTypes[];
    valueKey: keyof DepartmentTypes;
    format?: (value: number | string) => string;
}

const DepartmentGrid = ({title, data, valueKey, format}: DepartmentGrid) => (
    <>
        <h3 className='mt-10 font-semibold'>{title}</h3>
        <div className="grid grid-cols-4 gap-6 mt-5">
            {data.map(el => (
                <p key={el.department} className='border rounded p-2 text-center'>
                    {el.department} - {format ? format(el[valueKey]): el[valueKey]}
                </p>
            ))}
        </div>
    </>
)

export default DepartmentGrid;