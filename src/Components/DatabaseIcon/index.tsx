import { SvgIcon } from '@mui/material';
import { FC } from 'react';
import { ConnectionTypes } from '../../Context/ConnectionsContext/types';
import { ReactComponent as MySQLIcon } from '../../Icons/mysql.svg';
import { DatabaseIconProps } from './types';

const solveIcon = (connectionType: ConnectionTypes): React.ElementType<any> => {
    switch(connectionType) {
        case "MYSQL": {
            return MySQLIcon;
        }
    }
}

const DatabaseIcon: FC<DatabaseIconProps> = ({ connectionType }) => {
    return <SvgIcon component={solveIcon(connectionType)} inheritViewBox={true} />
}

export default DatabaseIcon;