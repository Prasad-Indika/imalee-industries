import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableFooter,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AppTable({columns,data}) {
  
    const [tableData, setTableData] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase();
        const filteredArr = data?.filter(obj =>
            Object.values(obj).some(value => String(value).toLowerCase().includes(search))
        );
        setTableData(filteredArr);
        setCurrentPage(1);
    };

  
    const pageCount = Math.ceil(tableData.length / pageSize);
    const paginatedData = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <Input placeholder="Search" onChange={handleSearch} />
            <Table>
                <TableCaption>A list of Customers.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (<TableHead key={col}>{col.label}</TableHead>))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.map((invoice) => (
                        <TableRow key={invoice.id}>
                            {columns.map((col)=>(<TableCell>{invoice[col.field]}</TableCell>))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TableFooter>
                <Button onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button>
                <span> Page {currentPage} of {pageCount} </span>
                <Button onClick={handleNext} disabled={currentPage === pageCount}>Next</Button>
            </TableFooter>
        </>
    )
}
