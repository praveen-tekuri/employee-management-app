import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from "recharts"

// interface Data{
//     department: string,
//     count: number
// }

// interface CustomBarChartProps {
//     data: Data[],
//     xKey: string,
//     yKey: string
// }

interface CustomChartProps<T>{
    data: T[];
    xKey: keyof T;
    yKey: keyof T;
}

const CustomBarChart = <T extends object>({data, xKey, yKey}:CustomChartProps<T>) => {
  return (
    <>
        <BarChart width="100%" height={300} data={data}>
            <XAxis dataKey={xKey as string} stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend 
                width={100}
                wrapperStyle={{top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px',}}
                />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey={yKey as string} fill="#8884d8" barSize={30} />
        </BarChart>
    </>
  )
}

export default CustomBarChart