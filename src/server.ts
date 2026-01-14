// import 'dotenv/config'
import app from './app.js';


const port = process.env.PORT || 3000;



app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
