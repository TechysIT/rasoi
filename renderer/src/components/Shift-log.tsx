// Local Imports
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    date: "2024-09-25",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    startingCashDrawer: "$500",
    endCashDrawer: "$1500",
    breakTime: "30 mins",
  },
  {
    date: "2024-09-26",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    startingCashDrawer: "$600",
    endCashDrawer: "$1600",
    breakTime: "45 mins",
  },
  {
    date: "2024-09-27",
    startTime: "08:30 AM",
    endTime: "04:30 PM",
    startingCashDrawer: "$550",
    endCashDrawer: "$1400",
    breakTime: "1 hour",
  },
  {
    date: "2024-09-28",
    startTime: "09:15 AM",
    endTime: "05:15 PM",
    startingCashDrawer: "$580",
    endCashDrawer: "$1520",
    breakTime: "20 mins",
  },
  {
    date: "2024-09-29",
    startTime: "11:00 AM",
    endTime: "07:00 PM",
    startingCashDrawer: "$520",
    endCashDrawer: "$1580",
    breakTime: "1 hour 15 mins",
  },
];

export default function ShiftLog() {
  return (
    <ScrollArea className="h-80 rounded-md">
      <Table>
        <TableHead className="text-customPrimary-600">Date</TableHead>
        <TableHead className="text-customPrimary-600">Start Time</TableHead>
        <TableHead className="text-customPrimary-600">End Time</TableHead>
        <TableHead className="text-customPrimary-600">
          Starting Cash Drawer
        </TableHead>
        <TableHead className="text-customPrimary-600">
          End Cash Drawer
        </TableHead>
        <TableHead className="text-right text-customPrimary-600">
          Break Time
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.startTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell>{row.startingCashDrawer}</TableCell>
              <TableCell>{row.endCashDrawer}</TableCell>
              <TableCell className="text-right">{row.breakTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
