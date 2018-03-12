import express from 'express';
import initDashboardApp from './dashboard';

const app = express();

initDashboardApp(app);

app.listen(4444);
