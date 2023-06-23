/*import {Box, useTheme} from "@mui/material";
import Header from "../../../components/Header";
import {tokens} from "../../../theme";*/

import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

const GridCard = ({xs, title, content, icon}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid xs={xs ?? '12'}>
            <Card sx={{backgroundColor: colors.blueAccent[700]}}>
                <CardContent>
                    <Typography variant="h4" color="common.white" fontWeight="bold">
                        {title ?? 'Loading...'}
                    </Typography>
                    <Typography sx={{ mb: 1.5, margin: "20px 0" }} variant="h4" color="common.white">
                        {content ?? 'Loading...'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default GridCard;