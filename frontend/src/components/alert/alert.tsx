import React, {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import {ColorPaletteProp} from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import {v1} from 'uuid'

import {
    clearAlert,
    setAlert,
    useAppDispatch,
    useAppSelector
} from "../../storage";

const _Alert: FC = () => {
    const dispatch = useAppDispatch();
    const {alertInfo, isAlert} = useAppSelector(state => state.common);
    const [info, setInfo] = useState(alertInfo)

    interface IItem {
        title: string;
        color: ColorPaletteProp;
        icon: React.ReactElement;
    }

    const [attributes, setAttributes] = useState<IItem>({
        title: 'Info',
        color: 'info',
        icon: <InfoIcon/>
    })

    const items: IItem[] = useMemo(() => [
        {title: 'Success', color: 'success', icon: <CheckCircleIcon/>},
        {title: 'Warning', color: 'warning', icon: <WarningIcon/>},
        {title: 'Error', color: 'danger', icon: <ReportIcon/>},
        {title: 'Info', color: 'info', icon: <InfoIcon/>},
    ], []);

    const setAlertNull = useCallback(() => {
        setTimeout(() => {
            dispatch(clearAlert());
        }, 1500)
    }, [dispatch])

    const getItem: () => IItem | undefined =
        useCallback(
            () => items.find(item => item['title'] === alertInfo.type),
            [items, alertInfo]
        )

    useEffect(() => {
        setAttributes(getItem() as IItem)
        setInfo({...alertInfo})
        setAlertNull();
    }, [alertInfo, isAlert, setAlertNull, getItem])


    return (
        <Box>
            <Alert
                key={v1()}
                sx={{alignItems: 'flex-start'}}
                startDecorator={React.cloneElement(<InfoIcon/>, {
                    sx: {mt: '2px', mx: '4px'},
                    fontSize: 'xl2',
                })}
                variant="soft"
                color={attributes.color}
                endDecorator={
                    <IconButton variant="soft" size="sm" color={'danger'}>
                        <CloseRoundedIcon/>
                    </IconButton>
                }
            >
                <Typography fontWeight="lg" mt={0.25}>
                    {alertInfo.type}: {alertInfo.message}
                </Typography>
            </Alert>
        </Box>
    );
}

export const AlertInfo = memo(_Alert);