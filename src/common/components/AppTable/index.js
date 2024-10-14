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
import { FiArrowLeft ,FiArrowRight } from "react-icons/fi";

export default function AppTable({columns,data}) {
 
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const handleSearch = (event) => {
         setSearchQuery(event.target.value)
         setCurrentPage(1)
    };

    const filteredData = data?.filter(obj =>
        Object.values(obj).some(value => String(value).toLowerCase().includes(searchQuery.toLowerCase()))
    );

  
    const pageCount = Math.ceil(data.length / pageSize);
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
                {/* <TableCaption>A list of Customers.</TableCaption> */}
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
                <div className='flex gap-2'>
                     {/* <Button onClick={handlePrevious} disabled={currentPage === 1}>Previous</Button> */}
                    <FiArrowLeft onClick={()=>{if(currentPage!==1){handlePrevious()}}} />
                    <span className='text-sm'> Page {currentPage} of {pageCount} </span>
                    {/* <Button onClick={handleNext} disabled={currentPage === pageCount}>Next</Button> */}
                    <FiArrowRight onClick={()=>{if(currentPage!==pageCount){handleNext()}}}/>
                </div>
               
            </TableFooter>
        </>
    )
}
