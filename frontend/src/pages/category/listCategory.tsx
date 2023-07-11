import React, {memo} from 'react';

import Box from "@mui/material/Box";
import {useEffectOnce} from "usehooks-ts";

import {CategoryEditForm} from "./editForm/categoryEditForm";
import css from './index.module.scss'
import {TabItemList} from "./tabItemList/tabItemList";
import {IProps} from './yesNoDialog/interfaces'
import {YesNoDialog} from "./yesNoDialog/yesNoDialog";
import {useAppDispatch, useAppSelector} from "../../storage";
import {getAll} from "../../storage/slices/category-slice/categorySlice";

const _ListCategory = () => {
    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.auth)
    const {currentCategory: {id}} = useAppSelector(state => state.category)
    const yesNoDialogProps: IProps = {
        openButtonId: 'openButtonFormEditCategory',
        dialogTitle: id ? 'Category edit form' : 'Category add form',
        openButtonTitle: 'Add category',
        form: <CategoryEditForm/>,
        formSelector: '#categoryForm',
        contentText: undefined
    }
    useEffectOnce(() => {
        try {
            if (isAuth)
                dispatch(getAll())
        } catch (e) {

        }
    })

    return (
        <Box className={css.main_box}>
            <Box className={css.create_edit_box}>
                <YesNoDialog data={yesNoDialogProps}/>
            </Box>
            <Box>
                <TabItemList/>
            </Box>
        </Box>
    );
};

export const ListCategory = memo(_ListCategory);