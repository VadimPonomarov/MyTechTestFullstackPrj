import * as React from 'react';
import {memo, useEffect, useState} from "react";

import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {useNavigate} from "react-router-dom";
import {v4} from 'uuid'

import {useAppDispatch, useAppSelector} from "../../../storage";
import {setCategoryCurrentById} from '../../../storage/slices/category-slice/categorySlice';
import {ICategory} from "../../../storage/slices/category-slice/interfaces";
import {AlertDialogSlide} from "../slidInDialogAlert/slideInDialogAlert";

const _TabItemList = () => {
    const {categories, currentCategory} = useAppSelector(state => state.category)
    const {tasks} = useAppSelector(state => state.task)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [taskNumber, setTaskNumber] = useState(0)
    useEffect(() => {
        setTaskNumber(tasks.length)
    }, [tasks])

    interface ICreateData extends ICategory {
        dateD: string
    }

    const createData: (data: ICategory) => Partial<ICreateData> = (data) => ({
        ...data,
        dateD: data.dateCreated ? new Date(data.dateCreated).toLocaleDateString() : ''
    })

    const handleClickOnAction = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
                                 categoryId: number | undefined) => {
        if (categoryId)
            dispatch(setCategoryCurrentById({id: categoryId}))
    }

    const rows: Partial<ICreateData>[] = categories ? categories.map(item => createData(item)) : []

    const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>, categoryId: number | undefined) => {
        if (categoryId)
            dispatch(setCategoryCurrentById({id: categoryId}))
        navigate('/tasks')
    };

    return (
        <TableContainer component={Paper} sx={{mt: 5}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableBody>
                    {rows && rows.map((row) => (
                        <TableRow
                            key={v4()}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={(e) => handleClickOnAction(e, row.id)}
                        >
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">
                                {row._count?.tasks && `${row._count?.tasks} tasks`}
                            </TableCell>
                            <TableCell align="right">{'' + row?.dateD}</TableCell>
                            <TableCell align="right">
                                <AlertDialogSlide title={'actions'} categoryId={row.id}/>
                            </TableCell>
                            <TableCell align="right">
                                <Button size={'small'} onClick={(e) => handleMoreClick(e, row.id)}>
                                    more
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const TabItemList = memo(_TabItemList);